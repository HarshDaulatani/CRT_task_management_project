import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API = "http://localhost:8080/tasks";

function EmployeeDashboard() {

  const [tasks, setTasks] = useState([]);

  const email =
    localStorage.getItem("email");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    const response = await axios.get(
      `${API}/all`
    );

    const filteredTasks =
      response.data.filter(
        (task) =>
          task.assignedTo === email
      );

    setTasks(filteredTasks);
  };

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  return (

    <div
      className="container-fluid min-vh-100 p-5"
      style={{
        background:
          "linear-gradient(to right, #eef2f3, #dfe9f3)"
      }}
    >

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="text-success fw-bold">
          Employee Dashboard
        </h1>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Task Table */}

      <div
        className="card shadow-lg p-4"
        style={{
          borderRadius: "20px"
        }}
      >

        <h3 className="mb-4 text-secondary">
          Assigned Tasks
        </h3>

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>

              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {
              tasks.map((task) => (

                <tr key={task.id}>

                  <td>{task.id}</td>

                  <td>{task.title}</td>

                  <td>{task.description}</td>

                  <td>

                    <span
                      className={`badge ${
                        task.priority === "HIGH"
                        ? "bg-danger"
                        : task.priority === "MEDIUM"
                        ? "bg-warning text-dark"
                        : "bg-success"
                      }`}
                    >

                      {task.priority}

                    </span>

                  </td>

                  <td>

                    <span className="badge bg-info">

                      {task.status}

                    </span>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployeeDashboard;