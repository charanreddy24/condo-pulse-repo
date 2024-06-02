// Sidebar.js
import { Button, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { HiIdentification, HiClock, HiUser } from 'react-icons/hi';
import { FcTimeline } from 'react-icons/fc';
import { PiHandshake } from 'react-icons/pi';
import React from 'react';

const Sidebar = ({ handleSideBarButtonClick }) => {
  const handleClick = (option) => {
    handleSideBarButtonClick(option);
  };
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/dashboard?tab=profile');
  };
  return (
    <>
      <div className="flex flex-col items-start gap-y-6 overflow-y-auto">
        <Button
          className="w-full md:mb-4 md:mt-20 sm:mb-1 sm:mt-10"
          gradientDuoTone="purpleToBlue"
          outline
          text="Home"
          onClick={() => handleClick('Home')}
          pill
        >
          <FaHome className="text-xl mr-2 text-slate-600 dark:text-white" />
          Home
        </Button>

        <Button
          className="w-full md:mb-4 sm:mb-1"
          gradientDuoTone="purpleToBlue"
          outline
          text="Timeline"
          onClick={() => handleClick('Timeline')}
          pill
        >
          <FcTimeline className="text-xl mr-2 text-slate-600 dark:text-white" />
          Timeline
        </Button>

        <Button
          className="w-full md:mb-4 sm:mb-1"
          gradientDuoTone="purpleToBlue"
          outline
          text="Unit File"
          onClick={() => handleClick('UnitFile')}
          pill
        >
          <HiIdentification className="text-xl mr-2 text-slate-600 dark:text-white" />
          Unit File
        </Button>
        <Button
          className="w-full md:mb-4 sm:mb-1"
          gradientDuoTone="purpleToBlue"
          outline
          text="Shift Log"
          onClick={() => handleClick('ShiftLog')}
          pill
        >
          <HiClock className="text-xl mr-2 text-slate-600 dark:text-white" />
          Shift Log
        </Button>
        <Button
          className="w-full mb-16"
          gradientDuoTone="purpleToBlue"
          outline
          text="Pass On"
          onClick={() => handleClick('PassOn')}
          pill
        >
          <PiHandshake className="text-xl mr-2 text-slate-600 dark:text-white" />
          Pass On
        </Button>
      </div>
      <hr className="my-4 border-purple-400" />
      <Button
        className="w-full md:mb-4 sm:mb-1 mt-10"
        gradientDuoTone="purpleToBlue"
        outline
        text="Unit File"
        onClick={handleProfileClick}
      >
        <HiUser className="text-3xl mr-2 text-slate-600 dark:text-white" />
        User Profile
      </Button>
    </>
  );
};

export default Sidebar;
