import { Route, Routes } from "react-router-dom";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";
import ActivityDetails from "./activities/ActivityDetails.jsx";
import Layout from "./layout/Layout";
import RoutinesPage from "./routines/RoutinesPage.jsx";
import RoutineDetails from "./routines/RoutineDetails.jsx";

import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext.jsx";
/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  const { setToken } = useAuth();
  // when the App component mounts, check localstorage
  // for token and if it's there, setToken to that token
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    console.log(localToken);
    // localstorage.getItem() returns null if no token, else
    // returns the value, so we use that here in the if-statement
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/routines" element={<RoutinesPage />} />
          <Route path="/routines/:id" element={<RoutineDetails />} />
        </Route>{" "}
      </Routes>
    </>
  );
}
