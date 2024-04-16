import React, { useState } from "react";
import { Button } from "flowbite-react";
import Modal from "/src/components/ReportForm.jsx";

export default function Board({ selectedOption }) {
  const handleCreateClick = () => {
    console.log("Create button clicked");
  };

  switch (selectedOption) {
    case "Incident Report":
      return (
        <div className="flex gap-2 overflow-y-auto w-full h-full text-center">
          <BoardColumn title="Incident Report Created">
            <Modal />
          </BoardColumn>
          <BoardColumn title="Actioned" />
        </div>
      );
    case "Parking Registration":
      return (
        <div className="flex gap-2 overflow-y-auto w-full h-full text-center ">
          <BoardColumn title="Active Day Permit">
            <Button onClick={handleCreateClick}> Issue Day Permit</Button>
          </BoardColumn>
          <BoardColumn title="Active Night Permit">
            <Button onClick={handleCreateClick}> Issue Night Permit</Button>
          </BoardColumn>
        </div>
      );
    case "Service Request":
      return (
        <div className="flex gap-2 overflow-y-auto w-full h-full text-center">
          <BoardColumn title="Requests Created">
            <Modal />
          </BoardColumn>
          <BoardColumn title="Service In Progress" />
          <BoardColumn title="Actioned" />
        </div>
      );
    default:
      return null; // Or render a default state
  }
}

const BoardColumn = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm flex flex-col flex-1 overflow-y-auto">
      <h2 className="mb-4 pb-2 border-b border-gray-300 text-center sm:text-sm">
        {title}
      </h2>
      {children}
    </div>
  );
};
