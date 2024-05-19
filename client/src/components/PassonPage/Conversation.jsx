import { Avatar } from 'flowbite-react';
import { useSelector } from 'react-redux';

const Conversation = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex gap-2 items-center border-2 bg-rose-50  border-rose-100 rounded-lg hover:bg-rose-100 p-5 cursor-pointer">
        <Avatar
          alt="user"
          img={currentUser.profilePicture}
          rounded
          status="online"
          statusPosition="top-right"
        />

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="ml-2">Ram</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
