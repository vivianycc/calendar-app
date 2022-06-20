import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getWeek(d = dayjs()) {
  // https://thewebdev.info/2022/01/17/how-to-get-the-week-of-the-month-with-javascript/
  const date = d.date();
  const day = d.day();
  const weekOfMonth = Math.ceil((date - 1 - day) / 7);
  return weekOfMonth;
}
