import React, { useEffect } from "react";
import WeatherComponent from "./WeatherComponent";
import Clock from "./Clock";
import { AiOutlineSearch } from "react-icons/ai";
import { TextInput, Button } from "flowbite-react";
import { FaBars } from "react-icons/fa";

export function SidebarToggle({ handleSidebarToggle }) {
  return (
    <button
      className="bg-transparent p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
      onClick={handleSidebarToggle}
    >
      <FaBars className="text-2xl mt-[-20px] mr-[-20px]" />
    </button>
  );
}

export default function Header({
  handleSelectChange,
  handleDateChange,
  handleSidebarToggle,
}) {
  return (
    <div className="px-4 py-2 w-full rounded-lg grid grid-cols-4 gap-4 bg-gradient-to-r from-red-200 via-mint-500 to-purple-200  ">
      <SidebarToggle handleSidebarToggle={handleSidebarToggle} />

      <div className="col-span-2">
        <form>
          <TextInput
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className=""
          />
        </form>
      </div>
      <div className="text-xs lg:text-sm font-bold text-center py-2 dark:text-slate-700">
        <Clock />
      </div>
      <div className="text-xs font-bold">
        <div></div>
      </div>
      <div>
        <select
          onChange={handleSelectChange}
          className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Service Request">Service Request</option>
          <option value="Incident Report">Incident Report</option>
          <option value="Parking Registration">Parking Registration</option>
        </select>
      </div>

      <div>
        <input
          className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="date"
          id="datePicker"
          onChange={handleDateChange}
          defaultValue={new Date().toISOString().slice(0, 10)}
        />
      </div>
      <div className="text-xs lg:text-sm text-center font-bold py-2 dark:text-slate-700">
        <WeatherComponent />
      </div>
    </div>
  );
}
