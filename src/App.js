import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util.js";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
// import { createEventsForDisplay } from "./components/createEventsForDisplay";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
    monthIndex,
    showEventModal,
    apiCalendar,
    signedIn,
    setSignedIn,
    googleEvents,
    setGoogleEvents,
  } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    console.log(currentMonth);
  }, [monthIndex]);

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
  // createEventsForDisplay();
  return (
    <React.Fragment>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <button onClick={() => signIn()}>signIn</button>

        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
      {showEventModal && <EventModal />}
    </React.Fragment>
  );
}

export default App;
