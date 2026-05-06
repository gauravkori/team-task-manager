import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleRegister = async (
    e
  ) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "350px",
          gap: "15px",
          padding: "40px",
          background: "white",
          borderRadius: "12px",
          boxShadow:
            "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "5px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "5px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "5px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() =>
            navigate("/")
          }
        >
          Already have an account?
          Login
        </p>
      </form>
    </div>
  );
}

export default Register;