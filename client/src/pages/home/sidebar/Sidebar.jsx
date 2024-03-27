// Sidebar.js
import { Button, Navbar } from 'flowbite-react';
import React from 'react';

const Sidebar = ({ handleSideBarButtonClick }) => {
  const handleClick = (option) => {
    handleSideBarButtonClick(option);
  };
  return (
    <div>
      <div className="flex flex-col items-start gap-y-6">
        <Button
          className="w-full mb-4 mt-20"
          gradientDuoTone="purpleToBlue"
          outline
          text="Home"
          onClick={() => handleClick('Home')}
        >
          Home
        </Button>
        <Button
          className="w-full mb-4"
          gradientDuoTone="purpleToBlue"
          outline
          text="Unit File"
          onClick={() => handleClick('UnitFile')}
        >
          Unit File
        </Button>
        <Button
          className="w-full mb-4"
          gradientDuoTone="purpleToBlue"
          outline
          text="Key Management"
          onClick={() => handleClick('KeyManagement')}
        >
          Key Management
        </Button>
        <Button
          className="w-full"
          gradientDuoTone="purpleToBlue"
          outline
          text="Pass On"
          onClick={() => handleClick('PassOn')}
        >
          Pass On
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
