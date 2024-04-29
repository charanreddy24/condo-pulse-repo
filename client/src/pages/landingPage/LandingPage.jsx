// App.js
import React, { useState, useEffect } from 'react';
import Sidebar from '/src/pages/landingPage/sidebar/Sidebar.jsx';
import Header from '/src/pages/landingPage/header/Header.jsx';
import MainBody from '/src/pages/landingPage/body-components/MainBody.jsx';
import UnitFile from '/src/pages/landingPage/body-components/UnitFile.jsx';
import KeyManagement from '/src/pages/landingPage/body-components/KeyManagement.jsx';
import PassOn from '/src/pages/landingPage/body-components/PassOn.jsx';

const LandingPage = () => {
  const [selectedOption, setSelectedOption] = useState('Incident Report');
  const [selectedDate, setSelectedDate] = useState();
  const [value, setValue] = useState(new Date().toISOString().slice(0, 10));
  const [sideBarSelectedOption, setSideBarSelectedOption] =
    useState('MainBody');
  const [showSidebar, setShowSidebar] = useState(true);
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value + 'T00:00:00');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear().toString();
    const formattedDate = day + month + year;
    setSelectedDate(formattedDate);
    setValue(e.target.value);
  };

  const handleSideBarButtonClick = (option) => {
    setSideBarSelectedOption(option);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const renderSelectedPage = () => {
    switch (sideBarSelectedOption) {
      case 'MainBody':
        return (
          <MainBody
            selectedOption={selectedOption}
            selectedDate={selectedDate}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
          />
        );
      case 'UnitFile':
        return <UnitFile />;
      case 'KeyManagement':
        return <KeyManagement />;
      case 'PassOn':
        return <PassOn />;
      default:
        return (
          <MainBody
            selectedOption={selectedOption}
            selectedDate={selectedDate}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
          />
        );
    }
  };

  return (
    <div className="flex bg-slate-200 overflow-auto">
      <div
        className={`${
          showSidebar ? 'block' : 'hidden'
        } h-dvh w-fit xl:w-1/6 flex flex-col p-4 shadow-md bg-gradient-to-r from-red-200 via-mint-500 to-purple-300`}
      >
        <Sidebar handleSideBarButtonClick={handleSideBarButtonClick} />
      </div>

      <div className="h-dvh w-full flex flex-col p-2 gap-y-2 sm:flex-shrink-0 lg:flex-shrink">
        <div className="">
          <Header handleSidebarToggle={handleSidebarToggle} />
        </div>
        {renderSelectedPage()}
      </div>
    </div>
  );
};

export default LandingPage;
