import React from "react";
import Board from "/src/pages/home/boards/Board";

export default function MainBody({
  selectedOption,
  selectedPeriod,
  handleSelectChange,
  handleDateChange,
}) {
  return (
    <>
      <div className="flex gap-4 justify-center">
        <div className="w-64">
          <select
            onChange={handleSelectChange}
            className="bg-gray-50 text-center border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Service Request">Service Request</option>
            <option value="Incident Report">Incident Report</option>
            <option value="Parking Registration">Parking Registration</option>
          </select>
        </div>
        <div className="w-64">
          <input
            className="bg-gray-50 text-center border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            id="datePicker"
            onChange={handleDateChange}
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div>
      </div>
      <Board selectedOption={selectedOption} selectedPeriod={selectedPeriod} />
    </>
  );
}
