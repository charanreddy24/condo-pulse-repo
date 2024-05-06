import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import { torontoTimeOptions } from '../../pages/landingPage/header/Clock.jsx';
import { FaTimes } from 'react-icons/fa';
import { Label, Checkbox, Textarea, FileInput, Alert } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function IncidentReportModal({ cardsArray, setCardsArray }) {
  const [showModal, setShowModal] = useState(false);
  const draggableRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState();
  const [value, setValue] = useState(new Date().toISOString().slice(0, 10));
  const [descriptionValue, setDescriptionValue] = useState('');
  const [loggedOnDate, setLoggedOnDate] = useState(new Date());
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal) {
      // Calculate the logged on date only when the modal is opened
      const currentDate = new Date();
      setLoggedOnDate(currentDate);
    }
  }, [showModal]);
  const initialFormData = {
    title: '',
    loggedDate: `${loggedOnDate.toLocaleString('en-US', torontoTimeOptions)}`,
    incidentType: 'Trespassers',
    loggedBy: `${currentUser ? currentUser.username : ''}`,
    incidentDate: `${new Date().toISOString().split('T')[0]}`,
    description: '',
    files: '',
    id: Math.random().toString(),
    column: 'Incident Report Created',
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Restore overflow on component unmount
    };
  }, [showModal]);

  const handleReportDateChange = (e) => {
    const inputDate = new Date(e.target.value + 'T00:00:00');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear().toString();
    const formattedDate = day + month + year;
    setSelectedDate(formattedDate);
    setValue(e.target.value);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, files: files });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.incidentType ||
      !formData.incidentDate ||
      !formData.description
    ) {
      return alert(JSON.stringify('Please fill out all the fields'));
    }
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (formData.files) {
      for (let i = 0; i < formData.files.length; i++) {
        formDataToSend.append('files', formData.files[i]);
      }
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    try {
      const card = { ...formData };
      console.log('New card:', card);
      setCardsArray([...cardsArray, card]);
      setFormData({ ...initialFormData });
      setShowModal(false);

      const res = await fetch('/api/incidentReport/create', {
        method: 'POST',
        body: formDataToSend,
        config,
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  return (
    <>
      <button
        className="bg-violet-300 hover:bg-violet-400 active:bg-violet-500 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create an Incident Report
      </button>
      {showModal && (
        <>
          <form
            encType={'multipart/form-data'}
            onSubmit={handleSaveChanges}
            className="dark:text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <Draggable handle=".modal-header" nodeRef={draggableRef}>
              <div
                className="relative w-auto my-6 h-dvh mx-auto max-w-6xl"
                ref={draggableRef}
              >
                {/*content*/}
                <div className="dark:bg-slate-500 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t modal-header cursor-move">
                    <h3 className="text-xl font-semibold">Incident Report</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 dark:text-white text-black opacity-5 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 space-y-6 flex-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <strong className="mr-2">Title:</strong>
                          <input
                            className="w-full  ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <strong className="mr-2">Logged On:</strong>{' '}
                        {loggedOnDate.toLocaleString(
                          'en-US',
                          torontoTimeOptions,
                        )}
                      </div>
                      <div className="flex items-center">
                        <strong>Type of Incident:</strong>
                        <select
                          name="incidentType"
                          value={formData.incidentType}
                          onChange={handleInputChange}
                          className="w-full ml-2 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="Trespassers">Trespassers</option>
                          <option value="Elevator Related">
                            Elevator Related
                          </option>
                          <option value="Alarm Occurrence">
                            Alarm Occurrence
                          </option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <strong className="mr-2">Logged By:</strong>{' '}
                        {currentUser ? currentUser.username : ''}
                      </div>
                      <div className="flex items-center">
                        <strong>Date of Incident:</strong>
                        <input
                          className="w-full ml-2 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="date"
                          name="incidentDate"
                          value={formData.incidentDate}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-span-2">
                        <div className="mb-12">
                          <strong className="mr-2">Description:</strong>
                          <ReactQuill
                            className=" h-56 w-full"
                            type="text"
                            name="description"
                            required
                            theme="snow"
                            value={formData.description}
                            onChange={(value) =>
                              setFormData({ ...formData, description: value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-4 ">
                          <strong className="mr-2">Upload Files:</strong>
                          <input
                            type="file"
                            name="files"
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="multiple-file-upload"
                            multiple
                            onChange={handleFileInputChange}
                          />
                        </div>
                      </div>
                      <div className=" col-span-2">
                        <Checkbox id="accept" required /> I agree that above
                        information is accurate and as per the company's
                        policies
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                    {/* {publishError && (
                      <Alert color="failure" className="mt-5">
                        {publishError}
                      </Alert>
                    )} */}
                  </div>
                </div>
              </div>
            </Draggable>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
