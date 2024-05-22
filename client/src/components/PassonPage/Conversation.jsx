import { Avatar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedConversation } from '/src/redux/conversations/conversationsSlice.js';
import { useSocketContext } from '../SocketContext.jsx';

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation } = useSelector((state) => state.conversations);
  const dispatch = useDispatch();

  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center border-2 bg-rose-50 dark:bg-slate-500 border-rose-100 rounded-lg p-5 cursor-pointer ${
          isSelected ? 'bg-violet-300 dark:bg-violet-400' : ''
        }`}
        onClick={() => dispatch(setSelectedConversation(conversation))}
      >
        <Avatar
          alt="user"
          img={conversation.profilePicture}
          rounded
          status={`${isOnline ? 'online' : 'busy'}`}
          statusPosition="top-right"
        />

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="ml-2">{conversation.username}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
