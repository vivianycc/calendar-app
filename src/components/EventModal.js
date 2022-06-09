import React, { useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const labelClass = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { daySelected, setShowEventModal, dispatchEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClass.find((lbl) => lbl === selectedEvent.label)
      : labelClass[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center">
      <form action="" className="bg-white rounded-lg shadow-2xl  w-1/4 ">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400 ">
            drag_handle
          </span>
          {selectedEvent && (
            <button
              onClick={() => {
                dispatchEvent({ type: "delete", payload: selectedEvent });
                setShowEventModal(false);
              }}
            >
              <span className="material-icons-outlined text-gray-400"></span>
            </button>
          )}
          <button
            onClick={() => {
              setShowEventModal(false);
            }}
          >
            <span className="material-icons-outlined text-gray-400  ">
              close
            </span>
          </button>
        </header>

        <div className="p-3">
          <div className="bg-blue-500 bg-red-500 bg-purple-500 bg-gray-500 bg-indigo-500 bg-green-500 display-none"></div>
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title and time"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <div className="">{daySelected.format("dddd, MMMM DD")}</div>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>

            <div className="flex gap-x-2">
              {labelClass.map((label, i) => (
                <span
                  key={i}
                  className={`bg-${label}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  onClick={() => setSelectedLabel(label)}
                >
                  {selectedLabel === label && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t mt-5 p-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
