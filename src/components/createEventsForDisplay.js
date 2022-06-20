import dayjs from "dayjs";
import { getWeek } from "../util";

export function createEventObj(obj) {
  const { start, end, description, colorId, id, summary } = obj;
  const isAllDay = start.date ? true : false;
  const startDate = start.date
    ? dayjs(start.date, "YYYY-MM-DD")
    : dayjs(start.dateTime);
  const endDate = end.date
    ? dayjs(end.date, "YYYY-MM-DD")
    : dayjs(end.dateTime);

  const startDay = startDate.day();
  const endDay = endDate.day();
  const startTime = startDate.format("h:mma");
  const endTime = endDate.format("h:mma");
  const week = getWeek(startDate);
  const dateString = startDate.format("YYYY-MM-DD");
  const duration = endDate.diff(startDate, "d");

  const eventObj = {
    summary,
    description,
    colorId,
    id,
    isAllDay,
    startDate,
    endDate,
    startDay,
    endDay,
    startTime,
    endTime,
    week,
    dateString,
    duration,
  };
  console.log(eventObj);
  return eventObj;
}

export const createEventsForDisplay = (arr) => {
  const monthEvent = {};
  arr.forEach((event) => {
    if (monthEvent.hasOwnProperty(event.dateString)) {
      monthEvent[event.dateString]["events"].push(event);
    } else {
      monthEvent[event.dateString] = {
        date: event.dateString,
        events: [event],
        startPos: event.startDate.day() + 1,
        endPos: event.endDate.day()
          ? event.endDate.day() + 1
          : event.endDate.day() + 8,
        week: event.week,
        duration: event.duration,
        sort: () => {
          this.events
            .sort((eventA, eventB) => eventB.duration - eventA.duration)
            .sort((eventA, eventB) => eventA.startTime - eventB.startTIme);
        },
      };
    }
  });
  //   console.log(monthEvent);
  return monthEvent;
};
