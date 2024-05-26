import React, { useEffect } from 'react';
import WeatherComponent from './WeatherComponent';
import Clock from './Clock';
import { AiOutlineSearch } from 'react-icons/ai';
import { TextInput, Button } from 'flowbite-react';
import { FaBars } from 'react-icons/fa';

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
    // <div className="px-4 py-2 w-full rounded-lg grid grid-cols-4 gap-4 bg-gradient-to-r from-red-200 via-mint-500 to-purple-200  ">
    <div className="px-4 py-2 w-full rounded-lg flex gap-4 bg-gradient-to-r from-red-200 via-mint-500 to-purple-200 md:flex-grow sm:shrink-0 ">
      <SidebarToggle
        classname="w-14"
        handleSidebarToggle={handleSidebarToggle}
      />
      <div className="flex-grow text-xs lg:text-sm text-center font-bold py-2 dark:text-slate-700">
        <WeatherComponent />
      </div>
      <div className="w-3/2">
        <select
          onChange={handleSelectChange}
          className="bg-gray-50 text-center border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-violet-300 focus:border-violet-300 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-300 dark:focus:border-violet-300"
        >
          <option value="Incident Report">Incident Report</option>
          <option value="Parking Registration">Parking Registration</option>
          <option value="Service Request">Service Request</option>
        </select>
      </div>
      <div className="flex-grow text-xs lg:text-sm font-bold text-center py-2 dark:text-slate-700">
        <Clock />
      </div>
    </div>
  );
}
