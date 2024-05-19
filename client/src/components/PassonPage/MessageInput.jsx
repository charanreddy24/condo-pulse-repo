import { TextInput, Textarea } from 'flowbite-react';
import { IoIosSend } from 'react-icons/io';

const MessageInput = () => {
  return (
    <form className="w-2/3 h-24">
      <div className=" relative">
        <Textarea
          type="text"
          placeholder="Enter the Pass-On"
          className=" rounded-lg"
          rows={4}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-6"
        >
          <IoIosSend size={36} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
