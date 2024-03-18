// App.js
import React, { useState, useEffect } from "react";
import "/src/styles/app.css";
import Sidebar from "/src/pages/home/sidebar/Sidebar.jsx";
import Header from "/src/pages/home/header/Header.jsx";
import MainBody from "/src/pages/home/body-components/MainBody.jsx";
import UnitFile from "/src/pages/home/body-components/UnitFile.jsx";
import KeyManagement from "/src/pages/home/body-components/KeyManagement.jsx";
import PassOn from "/src/pages/home/body-components/PassOn.jsx";

const LandingPage = () => {
  const [selectedOption, setSelectedOption] = useState("Service Request");
  const [selectedDate, setSelectedDate] = useState();
  const [value, setValue] = useState(new Date().toISOString().slice(0, 10));
  const [sideBarSelectedOption, setSideBarSelectedOption] =
    useState("MainBody");
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value + "T00:00:00");
    const day = inputDate.getDate().toString().padStart(2, "0");
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const year = inputDate.getFullYear().toString();
    const formattedDate = day + month + year;
    setSelectedDate(formattedDate);
    setValue(e.target.value);
  };

  const handleSideBarButtonClick = (option) => {
    setSideBarSelectedOption(option);
  };

  const renderSelectedPage = () => {
    switch (sideBarSelectedOption) {
      case "MainBody":
        return (
          <MainBody
            selectedOption={selectedOption}
            selectedDate={selectedDate}
          />
        );
      case "UnitFile":
        return <UnitFile />;
      case "KeyManagement":
        return <KeyManagement />;
      case "PassOn":
        return <PassOn />;
      default:
        return (
          <MainBody
            selectedOption={selectedOption}
            selectedDate={selectedDate}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-red">
      <Sidebar handleSideBarButtonClick={handleSideBarButtonClick} />
      <div className="flex-1 main-content">
        <Header
          handleSelectChange={handleSelectChange}
          handleDateChange={handleDateChange}
        />
        {renderSelectedPage()}
      </div>
    </div>
  );
};

export default LandingPage;
