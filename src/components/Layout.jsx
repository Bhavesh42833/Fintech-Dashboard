import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "mesh-gradient-light" : "mesh-gradient-dark"
      } text-[#0b1c30] dark:text-[#ecedf7] selection:bg-primary/20`}
    >
      <Sidebar />
      <Header />
      <main className="px-4 lg:pl-32 lg:pr-8 pt-24 pb-24 lg:pb-12 min-h-screen max-w-[1600px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
