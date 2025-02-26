import { useState } from "react";
import Form from "../components/Form";
import { useAuthContext } from "../hooks/useContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../interfaces";
import { API } from "../constant";
import { setToken } from "../helpers";

import "../css/login.css";
import useBackendStatus from "../hooks/useBackendStatus";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { setUserData } = useAuthContext();
  const navigate = useNavigate();

  const { backendReady } = useBackendStatus(
    `${API.replace("/api", "")}/admin/_health`
  );

  const fields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  const handleLogin = async (values: LoginFormData) => {
    setIsLoading(true);
    setError("");
    try {
      const value = {
        identifier: values.username,
        password: values.password,
      };

      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid username or password.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error("An error occurred. Please try again later.");
        }
      }
      setToken(await data.jwt);
      setUserData(await data.user);
      console.log("User data set in context:", data.user);

      navigate("/");
    } catch (error: any) {
      setError(
        error.message || "An unexpected error occured please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!backendReady) {
    return (
      <div className="backend-not-ready">
        <h1>Loading...</h1>
        <p>
          Please wait for the backend to start up. <br /> This may take a couple
          of minutes. <br />
          The backend and database lies dormant while the app is not beeing
          used.
        </p>
      </div>
    );
  }

  return (
    <section className="login-section">
      {error && <div className="login-error-message">{error}</div>}
      <div className="dev-message">
        <h1 className="dev-message-h1">Open login information:</h1>
        <h2 className="dev-message-h2">Username: testaccount </h2>
        <h2 className="dev-message-h2">Password: 123456</h2>
      </div>
      <Form
        title="Login"
        fields={fields}
        onSubmit={handleLogin}
        type="login"
        buttonValue={isLoading ? "Loading..." : "Login"}
      />
    </section>
  );
}

export default Login;
