import React, { useState, useEffect } from 'react';
import TimePickerDropdown from '/src/components/TimePicker.jsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Checkbox, Table, Textarea } from 'flowbite-react';

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
  const [quillData, setQuillData] = useState({
    startTime: times.current,
    endTime: times.end,
    equipmentReceived: '',
    description: '',
  });
  const [startTime, setStartTime] = useState(times.current);
  const [endTime, setEndTime] = useState(times.end);
  const [loggedTime, setLoggedTime] = useState(new Date().toLocaleString());
  const [logs, setLogs] = useState([]);
  const [topForm, setTopForm] = useState(true);
  const [bottomForm, setBottomForm] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getUsers');
        const data = await res.json();
        if (res.ok) {
          const { usersList } = data;
          const usersName = usersList.map((user) => user.username);
          setUsers(usersName); // Set the users array in the state
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleTopDivSave = (e) => {
    e.preventDefault();
    setTopForm(false);
    setBottomForm(true);
  };
  const handleLogSaveChanges = (e) => {
    e.preventDefault();
    const newLog = {
      time: loggedTime,
      description: quillData.description,
    };
    setLogs([...logs, newLog]);
    setLoggedTime(new Date().toLocaleString());
  };

  const handleRefresh = (e) => {
    setLoggedTime(new Date().toLocaleString());
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold underline dark:text-black">
          Shift Log
        </h1>
      </div>
      {topForm && (
        <form
          onSubmit={handleTopDivSave}
          className="flex flex-col gap-2 h-full sm:shrink-0 "
        >
          <div className="text-sm p-4 w-full bg-white dark:bg-gray-800 rounded-lg flex flex-col ">
            <div className="flex self-center mb-4">
              <TimePickerDropdown
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
              />
            </div>

            {/* header grid */}
            <div className="grid grid-cols-2 gap-4 place-items-center">
              {/* first column */}
              <div className="flex flex-col">
                <div className="flex items-center">
                  <strong>Shift Start Time:</strong>
                  <span className="ml-5">{startTime}</span>
                </div>
                <div className="flex items-center">
                  <strong>Shift End Time:</strong>
                  <span className="ml-7">{endTime}</span>
                </div>

                <div className="flex items-center">
                  <strong>Equipment Received:</strong>
                  <Textarea
                    className="ml-2 bg-gray-50 border border-gray-300 
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></Textarea>
                </div>
              </div>
              {/* second column */}
              <div className="flex flex-col">
                <div className="flex items-center">
                  <strong className="mr-2">Relieved:</strong>
                  <select className="w-full ml-2 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {users.map((user, index) => (
                      <option value={user}>{user}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <strong className="text-xs">To be Relieved By:</strong>
                  <select className="w-full ml-2 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {users.map((user) => (
                      <option value={user}>{user}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col self-center mt-4">
              <strong>Uniform Report:</strong>
              <p className="mt-2 mb-2">
                I confirm that I have the below uniform
              </p>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Checkbox></Checkbox>
                  <p className="ml-2">HD Logo White Shirt</p>
                </div>
                <div className="flex items-center">
                  <Checkbox></Checkbox>
                  <p className="ml-2">Black Tie</p>
                </div>
                <div className="flex items-center">
                  <Checkbox></Checkbox>
                  <p className="ml-2">Badge ID</p>
                </div>
                <div className="flex items-center">
                  <Checkbox></Checkbox>
                  <p className="ml-2">Black Pants</p>
                </div>
                <div className="flex items-center">
                  <Checkbox></Checkbox>
                  <p className="ml-2">Security Logo Blazer / Jacket / Vest</p>
                </div>
              </div>
            </div>
            <button
              className="mt-4 justify-center self-center bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      )}
      {/* Bottom Form */}
      {bottomForm && (
        <form
          className="bg-white dark:bg-gray-500 w-full h-4/5 rounded-lg  p-4 overflow-y-auto"
          onSubmit={handleLogSaveChanges}
        >
          <div className="flex flex-col justify-center items-center">
            <p className="mb-2">Logged at: {loggedTime}</p>
            <ReactQuill
              className=" h-40 w-full"
              type="text"
              name="description"
              required
              theme="snow"
              value={quillData.description}
              onChange={(value) =>
                setQuillData({ ...quillData, description: value })
              }
            />
          </div>
          <div className="flex justify-end">
            <button
              className="mt-20 justify-center self-center bg-emerald-500 dark:bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleRefresh}
            >
              update log time
            </button>
            <button
              className="mt-20 justify-center self-center bg-emerald-300 dark:bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Enter The Log
            </button>
          </div>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable className="w-full dark:text-white">
              <Table.Head className="dark:text-white">
                <Table.HeadCell className="border border-slate-300 w-1/6">
                  Time
                </Table.HeadCell>
                <Table.HeadCell className="border border-slate-300">
                  Description
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {logs.map((log, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="border border-slate-300">
                      {log.time}
                    </Table.Cell>
                    <Table.Cell className="border border-slate-300">
                      {log.description}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </form>
      )}
    </>
  );
}
