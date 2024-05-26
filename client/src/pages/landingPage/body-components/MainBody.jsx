import React, { useState } from 'react';
import IncidentReportBoard from '/src/pages/landingPage/boards/IncidentReportBoard.jsx';
import ParkingReportBoard from '/src/pages/landingPage/boards/ParkingReportBoard.jsx';
import ServiceRequestBoard from '/src/pages/landingPage/boards/ServiceRequestBoard.jsx';

export default function MainBody({ selectedOption, selectedPeriod }) {
  const [cardsArray, setCardsArray] = useState([]);
  return (
    <>
      <div className="flex gap-4 justify-center">
        {/* <div className="w-64">
          <input
            className="bg-gray-50 text-center border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            id="datePicker"
            onChange={handleDateChange}
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div> */}
      </div>
      {selectedOption === 'Incident Report' ? (
        <IncidentReportBoard
          selectedPeriod={selectedPeriod}
          cardsArray={cardsArray}
          setCardsArray={setCardsArray}
        />
      ) : selectedOption === 'Parking Registration' ? (
        <ParkingReportBoard
          selectedPeriod={selectedPeriod}
          cardsArray={cardsArray}
          setCardsArray={setCardsArray}
        />
      ) : (
        <ServiceRequestBoard
          selectedPeriod={selectedPeriod}
          cardsArray={cardsArray}
          setCardsArray={setCardsArray}
        />
      )}
    </>
  );
}
