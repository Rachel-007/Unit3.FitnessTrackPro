import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext.jsx";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  // The login function is imported from the AuthContext
  const navigate = useNavigate();
  // The useNavigate hook is used to programmatically navigate to a different route
  // after a successful login.
  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    // The tryLogin function is called when the form is submitted.
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}
