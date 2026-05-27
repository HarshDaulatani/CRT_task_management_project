import { useState } from "react";
import axios from "axios";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

    try {
        const response = await axios.post("http://localhost:8080/users/login",
            {
                email,
                password
            }
        );

        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        localStorage.setItem("email",email);

        if(response.data.role === "MANAGER") {
            window.location.href = "/manager";
        } else {
            window.location.href = "/employee";
        }

    } catch(error) {
        alert("Invalid Credentials");
    }
    };

    return (

        <div className="login">
            <h1>Task Management System</h1>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default Login;