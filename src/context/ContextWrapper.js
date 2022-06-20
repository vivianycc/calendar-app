import React, { useEffect, useState, useReducer, useMemo } from "react";
import dayjs from "dayjs";
import GlobalContext from "./GlobalContext";
import ApiCalendar from "react-google-calendar-api";
import { config } from "../ApiCalendar.config";

const apiCalendar = new ApiCalendar(config);

apiCalendar.onLoadCallback = (callback) => {
  console.log(111);
  apiCalendar.tokenClient.callback = () => {
    console.log(222);
    callback();
  };
};

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}
function initGoogleEvents() {
  const storageEvents = localStorage.getItem("googleEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [signedIn, setSignedIn] = useState(false);
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  const [googleEvents, setGoogleEvents] = useState(initGoogleEvents());

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    // localStorage.setItem("googleEvents", JSON.stringify(googleEvents));
  }, [savedEvents, googleEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }
  return (
    <GlobalContext.Provider
      value={{
        signedIn,
        setSignedIn,
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
        apiCalendar,
        googleEvents,
        setGoogleEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
