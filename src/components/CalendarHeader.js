import React, { useContext, useEffect } from "react";
import { TextButton, IconButton } from "./Button";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
export default function CalendarHeader() {
  const {
    monthIndex,
    setMonthIndex,
    signedIn,
    setSignedIn,
    apiCalendar,
    setGoogleEvents,
  } = useContext(GlobalContext);

  const signIn = () => {
    apiCalendar.handleAuthClick();

    apiCalendar.onLoadCallback(() => setSignedIn(true));
  };

  useEffect(() => {
    if (signedIn) {
      console.log("is signed in, get events");
      apiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log(result.items);
        setGoogleEvents(result.items);
      });
    }
  }, [signedIn]);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <IconButton className="mr-2" name="menu" size="48" onClick={() => {}} />
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-2xl text-gray-500 font-light">Calendar</h1>
      <TextButton className="mr-3" label="Today" onClickk={handleReset} />
      <IconButton
        name="chevron_left"
        size="32"
        onClick={() => handlePrevMonth()}
      />
      <IconButton
        name="chevron_right"
        size="32"
        onClick={() => handleNextMonth()}
      />
      <h2 className="ml-4 text-2xl text-gray-600 font-light mr-auto">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      {console.log(apiCalendar)}
      <TextButton
        label={signedIn ? "Sign Out" : "Sign In"}
        onClick={() => signIn()}
      />
    </header>
  );
}
