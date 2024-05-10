import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashIncidentReports() {
  const { currentUser } = useSelector((state) => state.user);
  const [userIncidentReports, setUserIncidentReports] = useState([]);
  const [showMore, setShowMore] = useState(true);
  useEffect(() => {
    const fetchIncidentReports = async () => {
      try {
        const res = await fetch(
          `/api/incidentReport/getIncidentReports?userId=${currentUser._id}`,
        );
        const data = await res.json();
        if (res.ok) {
          setUserIncidentReports(data.incidentReports);
          if (data.incidentReports.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchIncidentReports();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userIncidentReports.length;
    try {
      const res = await fetch(
        `/api/incidentReport/getIncidentReports?userId=${currentUser._id}&startIndex=${startIndex}`,
      );
      const data = await res.json();
      if (res.ok) {
        setUserIncidentReports((prev) => [...prev, ...data.incidentReports]);
        if (data.incidentReports.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {userIncidentReports.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Files</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Incident Type</Table.HeadCell>
              <Table.HeadCell>Logged By</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userIncidentReports.map((incidentReport) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(incidentReport.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="flex flex-col gap-4">
                    {incidentReport.files &&
                      incidentReport.files.map((file, index) => (
                        <a
                          key={index}
                          href={file.fileUrl}
                          download={file.filename}
                        >
                          {file.filename}
                        </a>
                      ))}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/incidentReport/${incidentReport.slug}`}
                    >
                      {incidentReport.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/incidentReport/${incidentReport.slug}`}
                    >
                      {incidentReport.column}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/incidentReport/${incidentReport.slug}`}>
                      {incidentReport.incidentType}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/incidentReport/${incidentReport.slug}`}>
                      {incidentReport.loggedBy}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/view-incidentReport/${incidentReport._id}`}
                    >
                      <span>View</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have created no incident reports</p>
      )}
    </div>
  );
}
