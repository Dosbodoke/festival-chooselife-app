import { useFormatter } from "next-intl";
import * as React from "react";

import { cn } from "@/lib/utils";

const chartTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#2d333b", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

// MOVE TO UTILS?
function zellersCongruence(date: Date): number {
  const dateDay = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  // in algorithm friendly version, January and February are counted as
  //month 13 and 14 respectively of previous year
  if (month < 2) {
    year--;
    month = month + 13; // January is index "0", so add 13
  } else {
    month++; // since getMonth index starts at 0 must add one to get correct month
  }

  const monthAdjustment = Math.floor((13 * (month + 1)) / 5);

  const leapYearAdjustment = Math.floor(year / 4); //use floor so equals zero except in leap year for +1 day
  const centuryAdjustment = year / 100; // Math.floor on zellersNumber adjusts this one
  const fourHundredYearFudgeFactor = Math.floor(year / 400); // use floor again so adds one day every 400 years
  const zellersNumber = Math.floor(
    dateDay +
      monthAdjustment +
      year +
      leapYearAdjustment -
      centuryAdjustment +
      fourHundredYearFudgeFactor
  );

  // 0 for sunday, 6 for saturday
  const dayOfWeek = zellersNumber % 7;
  return dayOfWeek;
}

function getDayFromCell(coordinates: [x: number, y: number], offset: number) {
  const [x, y] = coordinates;

  // y is the one columns before the current
  // multiplied by 7 since each column has 7 days
  // minus the offset of zeelers congruence, if it's 7 starts on the first day of the year
  // plus ( x + 1 ) that is the number of days on the current columns
  const currentDay = 7 * y - (offset === 7 ? 0 : offset) + (x + 1);
  return currentDay;
}

function getColSpan(year: number) {
  const yearStartedAt = zellersCongruence(new Date(`${year}-01-01`));

  const isLeapYear = leapYear(year);

  const daysInMonth = [
    31,
    28 + (isLeapYear ? 1 : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currentMonthIdx = 0;
  let daysGone = 0;
  let weeksGone = 0;
  const monthColSpan: Array<{ month: number; colSpan: number }> = [];

  for (let y = 0; y < 53; y++) {
    for (let x = 0; x < 7; x++) {
      let currentDay = getDayFromCell([x, y], yearStartedAt + 1);
      if (currentDay === daysInMonth[currentMonthIdx] + daysGone) {
        monthColSpan.push({
          month: currentMonthIdx,
          colSpan: y + 1 - weeksGone,
        });
        weeksGone = y + 1;
        daysGone += daysInMonth[currentMonthIdx];
        currentMonthIdx += 1;
      }
    }
  }

  return monthColSpan;
}

function leapYear(year: number) {
  // Every year that is exactly divisible by four is a leap year,
  // except for years that are exactly divisible by 100,
  // but these centurial years are leap years, if they are exactly divisible by 400
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getSunday(increment: number) {
  const d = new Date();
  d.setHours(15, 0, 0, 0); /* normalise */
  d.setDate(d.getDate() - d.getDay() + increment); /* Sunday + increment */
  console.log(d);
  return d;
}

interface HeatmapProps extends React.HTMLAttributes<HTMLTableElement> {
  year: number;
}
const Heatmap = React.forwardRef<HTMLTableElement, HeatmapProps>(
  ({ className, ...props }, ref) => (
    <div className="scrollbar relative max-w-full overflow-x-auto overflow-y-hidden">
      <table
        ref={ref}
        className={cn(
          "relative w-max caption-bottom border-separate border-spacing-[3px] overflow-hidden text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
);
Heatmap.displayName = "Heatmap";

interface HeatmapLabelProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  year: number;
}
const HeatmapLabel = React.forwardRef<
  HTMLTableSectionElement,
  HeatmapLabelProps
>(({ year, className, ...props }, ref) => {
  const format = useFormatter();

  return (
    <thead ref={ref} className={cn(className)} {...props}>
      <tr className="h-[13px]">
        {/* WEEKDAY LABEL COLUMN */}
        <td className="w-7"></td>
        {getColSpan(year).map(({ month, colSpan }) => (
          <td
            key={`month-${month}`}
            colSpan={colSpan}
            className="relative py-[0.125rem] pr-2 text-left"
          >
            <span className="sr-only">
              {format.dateTime(new Date(year, month), { month: "long" })}
            </span>
            <span className="absolute top-0">
              {format.dateTime(new Date(year, month), { month: "short" })}
            </span>
          </td>
        ))}
      </tr>
    </thead>
  );
});
HeatmapLabel.displayName = "HeatmapLabel";

interface HeatmapCellsProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  classname?: string;
  data: {
    [date: string]: number;
  };
  year: number;
}
const HeatmapCells = React.forwardRef<
  HTMLTableSectionElement,
  HeatmapCellsProps
>(({ data, year, className, ...props }, ref) => {
  const format = useFormatter();
  const isLeapYear = leapYear(year);
  const yearStartedAt = zellersCongruence(new Date(`${year}-01-01`));
  const yearTotalDays = isLeapYear ? 366 : 365;

  function getLevel(value: number) {
    if (!value || value === 0) return 0;
    if (value < 3) return 1;
    if (value < 5) return 2;
    if (value < 8) return 3;
    return 4;
  }

  return (
    <tbody ref={ref} className={cn("", className)} {...props}>
      {new Array(7).fill(null).map((_, week) => (
        <tr key={`week=${week}`}>
          {/* WEEKDAY LABEL */}
          {week % 2 !== 0 ? (
            <td className="relative py-[0.125rem] pr-2 text-left">
              <span className="sr-only">
                {format.dateTime(getSunday(week), {
                  weekday: "short",
                })}
              </span>
              <span aria-hidden={true} className="absolute -bottom-[3px]">
                {format.dateTime(getSunday(week), {
                  weekday: "short",
                })}
              </span>
            </td>
          ) : (
            <td className="relative py-[0.125rem] pr-2 text-left"></td>
          )}

          {new Array(53).fill(null).map((_, i) => {
            const coordinates = [week, i] as [x: number, y: number];
            const dayOfTheYear = getDayFromCell(
              coordinates,
              // TODO: Understant why I need to +1
              yearStartedAt + 1
            );
            const isValidDay =
              dayOfTheYear > 0 && dayOfTheYear <= yearTotalDays;
            const dateStr = new Date(year, 0, dayOfTheYear)
              .toISOString()
              .split("T")[0];

            return (
              <td
                key={`heatmap-day-${coordinates[0]}-${coordinates[1]}`}
                id={`heatmap-day-${coordinates[0]}-${coordinates[1]}`}
                data-date={dateStr}
                data-ix={coordinates[1]}
                aria-hidden={!isValidDay}
                className="h-3 w-3 rounded-sm bg-gray-800 outline-1 -outline-offset-1 outline-gray-600 aria-hidden:opacity-0"
                style={{
                  backgroundColor: chartTheme.dark[getLevel(data[dateStr])],
                }}
              />
            );
          })}
        </tr>
      ))}
    </tbody>
  );
});
HeatmapCells.displayName = "HeatmapCells";

export { Heatmap, HeatmapCells, HeatmapLabel };
