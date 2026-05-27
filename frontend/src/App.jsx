import Login from "./components/Login";
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";

function App() {

  const role = localStorage.getItem("role");
  if(role === "MANAGER") {
    return <ManagerDashboard />;
  }

  if(role === "EMPLOYEE") {
    return <EmployeeDashboard />;
  }

  return <Login />;
}

export default App;