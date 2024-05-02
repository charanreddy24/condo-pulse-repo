import React, { useState } from 'react';
import TimePickerDropdown from '/src/components/TimePicker.jsx';

export default function ShiftLog() {
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  return (
    <form action="" className="flex flex-col gap-2 h-full">
      <div className="flex justify-center items-center ">
        <h1 className="text-xl font-bold underline dark:text-black">
          Shift Log
        </h1>
      </div>

      <div className="p-4 w-full bg-white dark:bg-gray-800 rounded-lg flex flex-col ">
        <div className="flex justify-center mb-4">
          <TimePickerDropdown
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        </div>

        {/* header grid */}
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {/* first column */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <strong>Start Time:</strong>
              <span className="ml-2">{startTime}</span>
            </div>
            <div className="flex items-center">
              <strong>End Time:</strong>
              <span className="ml-2">{endTime}</span>
            </div>
          </div>
          {/* second column */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <strong>Relieved:</strong>
              <select className="w-full ml-2 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>
            </div>
            <div className="flex items-center">
              <strong>To be Relieved By:</strong>
              <select className="w-full ml-2 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex bg-white dark:bg-gray-800 w-full h-4/5 rounded-lg overflow-y-auto "></div>
    </form>
  );
}
