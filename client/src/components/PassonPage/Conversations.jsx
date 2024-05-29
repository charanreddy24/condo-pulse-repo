import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import Conversation from './Conversation.jsx';

const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/user/getUsers');
        const data = await res.json();
        if (res.ok) {
          setConversations((prev) => [...prev, ...data.users]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <div className="mx-auto">
          <Spinner size="xl"></Spinner>
        </div>
      ) : null}
    </div>
  );
};

export default Conversations;
