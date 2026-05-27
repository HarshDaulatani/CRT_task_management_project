import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TASK_API = "http://localhost:8080/tasks";
const USER_API = "http://localhost:8080/users";

function ManagerDashboard() {

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [assignedTo, setAssignedTo] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {

    fetchTasks();

    fetchEmployees();

  }, []);

  const fetchTasks = async () => {

    const response = await axios.get(
      `${TASK_API}/all`
    );

    setTasks(response.data);
  };

  const fetchEmployees = async () => {

    const response = await axios.get(
      `${USER_API}/employees`
    );

    setEmployees(response.data);
  };

  const resetForm = () => {

    setTitle("");
    setDescription("");
    setPriority("HIGH");
    setAssignedTo("");

    setEditId(null);
  };

  const saveTask = async () => {

    const task = {
      title,
      description,
      priority,
      assignedTo,
      status: "PENDING"
    };

    try {

      if(editId == null) {

        await axios.post(
          `${TASK_API}/add`,
          task
        );

      } else {

        await axios.put(
          `${TASK_API}/update/${editId}`,
          task
        );
      }

      fetchTasks();

      resetForm();

    } catch(error) {

      console.log(error);
    }
  };

  const editTask = (task) => {

    setEditId(task.id);

    setTitle(task.title);

    setDescription(task.description);

    setPriority(task.priority);

    setAssignedTo(task.assignedTo);
  };

  const deleteTask = async (id) => {

    await axios.delete(
      `${TASK_API}/delete/${id}`
    );

    fetchTasks();
  };

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  return (

    <div className="container mt-5">

      {/* Heading */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="text-primary">
          Manager Dashboard
        </h1>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Form */}

      <div className="card p-4 mb-4">

        <h3>
          {
            editId == null
            ? "Add Task"
            : "Update Task"
          }
        </h3>

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="form-control mt-3"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          className="form-select mt-3"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >

          <option value="HIGH">
            High
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="LOW">
            Low
          </option>

        </select>

        <select
          className="form-select mt-3"
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value)
          }
        >

          <option value="">
            Select Employee
          </option>

          {
            employees.map((employee) => (

              <option
                key={employee.id}
                value={employee.email}
              >

                {employee.name}

              </option>
            ))
          }

        </select>

        <button
          className={`btn ${
            editId == null
            ? "btn-primary"
            : "btn-warning"
          } mt-3`}
          onClick={saveTask}
        >

          {
            editId == null
            ? "Add Task"
            : "Update Task"
          }

        </button>

      </div>

      {/* Table */}

      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>

            <th>ID</th>
            <th>Title</th>
            <th>Employee</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {
            tasks.map((task) => (

              <tr key={task.id}>

                <td>{task.id}</td>

                <td>{task.title}</td>

                <td>{task.assignedTo}</td>

                <td>{task.priority}</td>

                <td>{task.status}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      editTask(task)
                    }
                  >

                    Edit

                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >

                    Delete

                  </button>

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default ManagerDashboard;