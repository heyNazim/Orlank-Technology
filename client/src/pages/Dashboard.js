import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Dashboard = () => {
  const [tasklist, setTasklist] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [status, setStatus] = useState('Pending');

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [taskid, setTaskid] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const [filterStatus, setFilterStatus] = useState('All'); // Filter state

  const [toggle, setToggle] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = (id) => {
    setTaskid(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  const handleform = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${process.env.REACT_APP_API}/createtask`, {
        title,
        description,
      });

      if (result.data.success) {
        alert('Task created successfully');
        setToggle(true);
        gettask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettask();
  }, []);

  const gettask = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API}/gettasklist`);
      if (result.data.success) {
        setTasklist(result.data.tasks || []);
        setFilteredTasks(result.data.tasks || []); // Set filteredTasks initially
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (taskId, e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`${process.env.REACT_APP_API}/taskstatus/${taskId}`, { status });
      if (result.data.success) {
        alert('Task updated successfully');
        gettask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`${process.env.REACT_APP_API}/updatetask/${taskid}`, {
        title,
        description,
      });

      if (result.data.success) {
        alert('Task updated successfully');
        setShowModal(false);
        gettask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_API}/deleteTask/${id}`);
      if (result.data.success) {
        alert('Task deleted successfully');
        gettask();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tasksPerPage = 5;

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter tasks based on selected status
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
    setCurrentPage(1); // Reset to the first page

    if (selectedStatus === 'All') {
      setFilteredTasks(tasklist);
    } else {
      setFilteredTasks(tasklist.filter((task) => task.status === selectedStatus));
    }
  };

  return (
    <div className="min-h-full">
      <Header />
      <div className="App">
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Task</h2>
              <form onSubmit={updateTask}>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-1"
                  placeholder="Title"
                  type="text"
                  required
                />
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-1"
                  placeholder="Description"
                  type="text"
                  required
                />
                <button type="submit">Update Task</button>
              </form>
            </div>
            <button onClick={closeModal}>x</button>
          </div>
        )}
      </div>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <div className="flex justify-between items-center px-6 py-4">
        <button
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleToggle}
        >
          Create Task
        </button>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="block rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <main>
        {toggle ? (
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="box">
              <h3>Total task: {filteredTasks.length}</h3>

              {filteredTasks.length > 0 ? (
                <>
                  <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Update Status</th>
                        <th className="border border-gray-300 px-4 py-2">Edit / Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTasks.map((task) => (
                        <tr key={task._id} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                          <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                          <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">
                            <form onSubmit={(e) => updateTaskStatus(task._id, e)}>
                              <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                id="taskstatus"
                                name="taskstatus"
                                className="block rounded-md border border-gray-300 py-1 px-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Progress">Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                              <button
                                type="submit"
                                className="mt-2 inline-block rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
                              >
                                Update Status
                              </button>
                            </form>
                          </td>
                          <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <button
                              onClick={() => openModal(task._id)}
                              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTask(task._id)}
                              className="rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    {[...Array(totalPages).keys()].map((page) => (
                      <button
                        key={page + 1}
                        onClick={() => handlePageChange(page + 1)}
                        className={`${
                          currentPage === page + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-black'
                        } mx-1 px-3 py-1 rounded`}
                      >
                        {page + 1}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p>No tasks available.</p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleform}>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-1"
              placeholder="Title"
              type="text"
              required
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-1"
              placeholder="Description"
              type="text"
              required
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
