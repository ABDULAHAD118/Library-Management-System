import { Route, Routes } from "react-router";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Students from "./components/Students";
import Departments from "./components/Departments";

export default function App() {
  return (
    <div className="flex m-2">
      <Sidebar />
      <div className="mt-16 p-4 w-full">
        <Routes>
          <Route path="/" index element={<Dashboard />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/users" element={<Students />} />
        </Routes>
      </div>
    </div>
  )
}