import React, { useState } from 'react';
import { Button } from 'flowbite-react';
export default function Board({ selectedOption }) {
  const handleCreateClick = () => {
    console.log('Create button clicked');
  };

  switch (selectedOption) {
    case 'Service Request':
      return (
        <div className="flex gap-2 overflow-y-auto w-full h-full text-center">
          <BoardColumn title="Requests Created">
            <Button label="" onClick={handleCreateClick}>
              Create a Service Request
            </Button>
          </BoardColumn>
          <BoardColumn title="Service In Progress" />
          <BoardColumn title="Actioned" />
        </div>
      );
    case 'Incident Report':
      return (
        <div className="flex gap-2 overflow-y-auto w-full h-full text-center">
          <BoardColumn title="Incident Report Created">
            <Button onClick={handleCreateClick}>
              Create an Incident Report{' '}
            </Button>
          </BoardColumn>
          <BoardColumn title="Actioned" />
        </div>
      );
    case 'Parking Registration':
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
    default:
      return null; // Or render a default state
  }
}

const BoardColumn = ({ title, children }) => {
  return (
    <div className="bg-white flex-1 p-4 rounded shadow-sm flex flex-col overflow-y-auto w-full h-full ">
      <h2 className="mb-4 pb-2 border-b border-gray-300 text-center sm:text-sm">
        {title}
      </h2>
      {children}
    </div>
  );
};
