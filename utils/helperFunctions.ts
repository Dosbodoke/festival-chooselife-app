import { ReadonlyURLSearchParams } from "next/navigation";

import type { Point } from "./supabase/database.types";

export function transformTimeStringToSeconds(timeString: string): number {
  const [minutes, seconds] = timeString.split(":").map(Number);
  const totalSeconds = minutes * 60 + seconds;
  return totalSeconds;
}

export function transformSecondsToTimeString(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeString = `${padZero(minutes)}:${padZero(seconds)}`;
  return timeString;
}

function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const postgisPointFromLatLng = (lat: number, lng: number): Point => {
  return `POINT(${lng} ${lat})`;
};
