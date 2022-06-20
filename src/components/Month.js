import React, { useContext } from "react";
import Day from "./Day";
import EventChip from "./EventChip";
import GlobalContext from "../context/GlobalContext";
import {
  createEventsForDisplay,
  createEventObj,
} from "./createEventsForDisplay";

export default function Month({ month }) {
  const { googleEvents } = useContext(GlobalContext);

  const array = googleEvents.map(createEventObj);
  const obj = createEventsForDisplay(array);

  function displayEvents() {
    return Object.keys(obj).map((key) => {
      const { startPos, endPos, week, events } = obj[key];
      return (
        <div
          className={`col-start-${startPos} col-end-${endPos} row-start-${
            week + 1
          } row-end-${week + 1} mt-8 pr-2`}
        >
          {events.map((event) => (
            <EventChip event={event} />
          ))}
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between border-t ">
        {month[0].map((day, i) => (
          <div
            key={i}
            className="text-sm pt-2 pb-px text-center flex-1  border-r"
          >
            {day.format("ddd").toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 relative">
        <div className="grid grid-cols-7 grid-rows-5  w-100 absolute inset-0 items-start">
          {/* {googleEvents &&
            googleEvents.map((obj) => (
              <EventChip event={createAppEvent(obj)} />
            ))} */}

          {googleEvents && displayEvents()}
        </div>
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
