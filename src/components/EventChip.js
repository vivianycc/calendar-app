import React from "react";

export default function EventChip(props) {
  const {
    summary = "no title",
    week,
    startDay,
    endDay,
    isAllDay,
    startTime,
  } = props.event;
  //   const [week, startDay, endDay] = [1, 1, 2];
  //   console.log(props);
  function eventTypeStyle() {
    if (isAllDay) {
      return "bg-red-200 hover:bg-red-300";
    } else {
      return "text-gray-800 hover:bg-gray-200 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-red-200 before:mr-1";
    }
  }
  return (
    <button
      className={`first:w-full h-6 rounded flex justify-start items-center py-0.5 px-2 mr-3 mb-0.5 truncate ${eventTypeStyle()}`}
    >
      <span className="text-left text-sm">
        {isAllDay ? summary : `${startTime} ${summary}`}
      </span>
    </button>
  );
}
// function event(props){

//     if(props.isAllDay){
//         return(
//             <button
//         className={`first:w-full h-6 rounded flex justify-start py-0.5 px-2 mr-3 mb-0.5 truncate ${eventTypeStyle()}`}
//         >
//         <span className="text-left text-sm">{summary}</span>
//         </button>
//         )
//     }else{
//         return(
//             <button
//             className={`first:w-full h-6 rounded flex justify-start py-0.5 px-2 mr-3 mb-0.5 truncate ${eventTypeStyle()}`}
//             >

//             <span className="text-left text-sm">{summary}</span>
//             </button>
//         )
//     }
// }
