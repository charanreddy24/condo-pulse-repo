import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormOne from './FormOne.jsx';
import FormTwo from './FormTwo.jsx';

function getCurrentAndEndHours() {
  const now = new Date();
  const currentHours = now.getHours().toString().padStart(2, '0');
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHours}:${currentMinutes}`;

  const endHours = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const endHoursHours = endHours.getHours().toString().padStart(2, '0');
  const endHoursMinutes = endHours.getMinutes().toString().padStart(2, '0');
  const endHoursTime = `${endHoursHours}:${endHoursMinutes}`;

  return { current: currentTime, end: endHoursTime };
}

const times = getCurrentAndEndHours();

export default function ShiftLog() {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);

  const [topForm, setTopForm] = useState(true);
  const [startTime, setStartTime] = useState(times.current);
  const [endTime, setEndTime] = useState(times.end);

  const [bottomForm, setBottomForm] = useState(false);
  const [loggedTime, setLoggedTime] = useState(new Date().toLocaleString());
  const [logs, setLogs] = useState([]);

  const [quillData, setQuillData] = useState({
    description: '',
  });

  const [formOneData, setFormOneData] = useState({
    startTime: times.current,
    endTime: times.end,
    relieved: '',
    toBeRelievedBy: '',
    equipment: '',
    uniform: {
      whiteShirt: false,
      blackTie: false,
      badgeID: false,
      blackPants: false,
      securityLogoBlazer: false,
    },
  });

  const handleFormOneInputChange = (e) => {
    const { name, value } = e.target;
    setFormOneData({ ...formOneData, [name]: value });
    if (name === 'startTime') {
      setStartTime(value);
    } else if (name === 'endTime') {
      setEndTime(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormOneData({
      ...formOneData,
      uniform: {
        ...formOneData.uniform,
        [name]: checked,
      },
    });
  };

  const handleFormTwoInputChange = (e) => {
    const { name, value } = e.target;
    setQuillData({ ...quillData, [name]: value });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getUsers');
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => [...prev, ...data.users]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [currentUser]);

  const handleFormOneSave = (e) => {
    e.preventDefault();
    console.log('Top form submitted:', formOneData);
    setTopForm(false);
    setBottomForm(true);
  };

  const handleLogSaveChanges = (e) => {
    e.preventDefault();
    const newLog = {
      time: loggedTime,
      description: quillData.description,
    };
    console.log('Logging Form Two Data:', newLog);
    setLogs([...logs, newLog]);
    setLoggedTime(new Date().toLocaleString());
    setQuillData({ description: '' });
  };

  const handleRefresh = () => {
    setLoggedTime(new Date().toLocaleString());
  };

  // Automatic form submission after 13 hours
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Automatic form submission:', formOneData, logs);
      // Add your form submission logic here, e.g., send data to an API
      // }, 13 * 60 * 60 * 1000); // 13 hours in milliseconds
    }, 1000);

    return () => clearTimeout(timer);
  }, [formOneData, logs]);

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold underline dark:text-black">
          Shift Log
        </h1>
      </div>
      {topForm && (
        <FormOne
          startTime={startTime}
          endTime={endTime}
          formOneData={formOneData}
          users={users}
          handleFormOneInputChange={handleFormOneInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleFormOneSave={handleFormOneSave}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
      )}
      {bottomForm && (
        <FormTwo
          loggedTime={loggedTime}
          quillData={quillData}
          logs={logs}
          handleLogSaveChanges={handleLogSaveChanges}
          setQuillData={setQuillData}
          handleRefresh={handleRefresh}
        />
      )}
    </>
  );
}
