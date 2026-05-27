import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/users/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "email",
        email
      );

      if(response.data.role === "MANAGER") {

        window.location.href = "/manager";

      } else {

        window.location.href = "/employee";
      }

    } catch(error) {

      setMessage("Invalid Credentials");
    }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(to right, #e0ecff, #f8fbff)"
      }}
    >

      <div
        className="card border-0 shadow-lg p-5"
        style={{
          width: "430px",
          borderRadius: "25px"
        }}
      >

        {/* Top */}

        <div className="text-center mb-5">

          <div
            className="d-inline-flex justify-content-center align-items-center mb-3"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background:
                "linear-gradient(to right, #2563eb, #3b82f6)",
              color: "white",
              fontSize: "35px"
            }}
          >
            📋
          </div>

          <h1
            className="fw-bold"
            style={{
              color: "#1e293b"
            }}
          >
            TaskFlow
          </h1>

          <p
            className="text-muted"
          >
            Manage tasks efficiently
          </p>

        </div>

        {/* Email */}

        <div className="mb-4">

          <label className="form-label fw-semibold text-secondary">

            Email

          </label>

          <input
            type="email"
            className="form-control form-control-lg shadow-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              borderRadius: "12px"
            }}
          />

        </div>

        {/* Password */}

        <div className="mb-4">

          <label className="form-label fw-semibold text-secondary">

            Password

          </label>

          <input
            type="password"
            className="form-control form-control-lg shadow-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              borderRadius: "12px"
            }}
          />

        </div>

        {/* Button */}

        <button
          className="btn btn-primary btn-lg w-100 fw-bold shadow-sm"
          onClick={handleLogin}
          style={{
            borderRadius: "12px"
          }}
        >
          Login
        </button>

        {/* Error */}

        {
          message && (

            <div
              className="alert alert-danger mt-4 text-center"
              style={{
                borderRadius: "12px"
              }}
            >

              {message}

            </div>
          )
        }

        {/* Bottom */}

        <div className="text-center mt-4">

          <small className="text-muted">

            React • Spring Boot • JWT

          </small>

        </div>

      </div>

    </div>
  );
}

export default Login;