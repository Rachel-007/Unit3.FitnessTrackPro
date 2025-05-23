/**
 * AuthContext manages the user's authentication state by storing a token,
 * It provides functions for the user to register, log in, and log out,
 * all of which update the token in state.
 */

import { createContext, useContext, useState } from "react";

import { API } from "../api/ApiContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    localStorage.setItem("token", result.token);
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    localStorage.setItem("token", result.token);
    setToken(result.token);
  };

  const logout = () => setToken(null);

  const value = { setToken, token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// useAuth hook moved to a separate file: useAuth.js
