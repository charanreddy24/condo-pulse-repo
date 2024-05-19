import React from 'react';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';
import { TiMessages } from 'react-icons/ti';

const MessageContainer = () => {
  const noChatSelected = false;

  return (
    <div className="flex flex-col grow items-center justify-center shrink-0 overflow-hidden">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="px-4 py-2 mb-2">
            <span className="label-text"> To:</span>
            <span className="text-gray-900 font-bold"> Ram Charan Reddy</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center font-semibold flex flex-col items-center gap-2">
        <p>Welcome Ram</p>
        <p>Select a user to send a pass-on</p>
        <TiMessages className="text-3xl text-center" />
      </div>
    </div>
  );
};
