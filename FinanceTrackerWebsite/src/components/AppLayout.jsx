import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function AppLayout() {
  return (
    <div className="lg:flex min-h-screen">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}