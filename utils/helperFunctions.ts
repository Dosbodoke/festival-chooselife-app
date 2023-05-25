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

export function convertISODateToTimeFormat(ISODate: string) {
  const newDateObj = new Date(ISODate);
  const toMonth = newDateObj.getMonth() + 1;
  const toDate = newDateObj.getDate();
  const toHours = newDateObj.getHours();
  const toHoursProcessed = (toHours < 10 ? "0" : "") + toHours;
  const toMin = newDateObj.getMinutes();
  const toMinProcessed = (toMin < 10 ? "0" : "") + toMin;
  const dateTemplate = `${toDate}/${toMonth} - ${toHoursProcessed}:${toMinProcessed}`;
  return dateTemplate;
}
