import React from 'react';
import { TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import Conversations from './Conversations';

const PassOnSideBar = () => {
  return (
    <div className="border-2 border-indigo-500/50 rounded-lg  p-4 mt-2 ml-2 flex flex-col">
      <TextInput
        type="text"
        placeholder="Search"
        rightIcon={AiOutlineSearch}
        className=""
      />

      <div className="">
        <Conversations />
      </div>
    </div>
  );
};

export default PassOnSideBar;
