import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";

/** The shared layout for all pages of the app */
export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route path="/activities" element={<Outlet />} />
          <Route path="/register" element={<Outlet />} />
          <Route path="/login" element={<Outlet />} />
          <Route path="*" element={<Outlet />} />
        </Routes>
        <Outlet />
      </main>
    </>
  );
}
