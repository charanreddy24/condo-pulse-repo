import React, { useEffect } from 'react';
import { useSocketContext } from '../SocketContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '/src/redux/conversations/conversationsSlice.js';
import notificationSound from '/src/assets/sounds/notification.mp3';

const ListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages } = useSelector((state) => state.conversations);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const passOnNotification = new Audio(notificationSound);
      passOnNotification.play();
      dispatch(setMessages([...messages, newMessage]));
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};

export default ListenMessages;
