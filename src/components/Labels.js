import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Labels</p>
      <div className="text-red-500 text-gray-500 text-blue-500 text-green-500 text-purple-500 hidden"></div>
      {labels.map(({ label, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            className={`form-checkbox h-5 w-5 text-${label}-500 rounded focus:rind-0 cursor-pointer`}
            onChange={() => updateLabel({ label, checked: !checked })}
          />
          <span className="ml-2 text-gray-700 capitalize">{label}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
