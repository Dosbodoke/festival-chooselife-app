import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CrownIcon, UserIcon } from "lucide-react";
import React from "react";

interface PodiumProps {
  name: string;
  value: string;
  position: 1 | 2 | 3;
}

const gradientVariants = cva(
  "flex w-[96%] flex-col items-center gap-3 bg-gradient-to-t to-80% py-4",
  {
    variants: {
      gradient: {
        gold: "from-yellow-500/5 dark:from-yellow-500/10",
        silver: "from-neutral-300/20 dark:from-neutral-300/10",
        bronze: "from-amber-700/5 dark:from-amber-700/10",
      },
    },
    defaultVariants: {
      gradient: "gold",
    },
  }
);

const podiumVariants = cva(
  "xs:rounded-b-md flex w-full items-start justify-center bg-neutral-100 dark:bg-neutral-900/75",
  {
    variants: {
      size: {
        small: "p-4 md:p-6",
        large: "md:p-6 md:py-12 p-4 py-8",
      },
    },
  }
);

const Podium = ({ name, value, position }: PodiumProps) => {
  const variant =
    position === 1 ? "gold" : position === 2 ? "silver" : "bronze";

  return (
    <div className="w-1/3">
      <div className="flex flex-col items-center md:min-w-[12rem]">
        <div className="flex w-full items-center justify-center border-4 border-b-4 border-t-0 border-transparent border-b-neutral-200 dark:border-b-neutral-600">
          <div
            className={gradientVariants({
              gradient: variant,
            })}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-8 w-8 items-center justify-center md:h-12 md:w-12">
                <CrownIcon
                  className={cn(
                    "text-2xl md:text-4xl",
                    position === 1 ? "text-yellow-500" : "text-neutral-300"
                  )}
                />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200/40 dark:bg-neutral-800/60 md:h-16 md:w-16">
                <i
                  className="fa-regular fa-user text-lg text-neutral-600 dark:text-neutral-50 md:text-2xl"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-0.5 md:gap-0">
              <span className="xs:text-sm max-w-[calc(100%-1rem)] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-800 dark:text-neutral-50 md:text-lg">
                {name}
              </span>
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`text-xs ${
                    position === 1 ? "text-yellow-500" : "text-neutral-500"
                  } dark:text-neutral-300 md:text-base`}
                >
                  <span className="whitespace-nowrap">
                    <i
                      className="fas fa-dice-d8"
                      aria-hidden="true"
                      style={{ scale: "0.6" }}
                    />{" "}
                    {value}
                  </span>
                </span>
                <a
                  className="flex shrink-0 items-center justify-center gap-2 rounded p-2 hover:bg-black/5 hover:dark:bg-white/5"
                  aria-label={`View ${name}'s Transactions`}
                  title={`View ${name}'s Transactions`}
                  href={`/transactions?userId=${position}`} // O link real provavelmente precisaria ser ajustado para usar um ID real, não a posição.
                >
                  <i
                    className="fa-solid fa-rectangle-history text-xs text-neutral-900 dark:text-neutral-50"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={podiumVariants({
            size: variant === "gold" ? "large" : "small",
          })}
        >
          <div className="flex items-center justify-center gap-1">
            <span className="xs:text-sm text-xs text-neutral-400 dark:text-neutral-600 md:text-lg">
              #
            </span>
            <span className="xs:text-base text-sm font-semibold text-neutral-800 dark:text-neutral-50 md:text-2xl">
              {position}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Leaderboard = () => {
  return (
    <div className="xs:gap-2 bg-light-theme-dotted-pattern dark:bg-dark-theme-dotted-pattern bg-dotted-pattern-size flex items-end justify-center gap-0 border-t border-t-neutral-100 bg-center bg-repeat dark:border-t-neutral-700/75 md:gap-4">
      <Podium name="Matheus Rocha" value="01:15" position={2} />
      <Podium name="Juan Andrade" value="01:10" position={1} />
      <Podium name="Diego" value="01:20" position={3} />
    </div>
  );
};
