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

    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="text-success">
          Employee Dashboard
        </h1>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <table className="table table-bordered">

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

                <td>{task.priority}</td>

                <td>{task.status}</td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeDashboard;