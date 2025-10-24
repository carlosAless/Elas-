// components/dashboard/sidebar/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { MdDashboard } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ session }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { path: "/dashboard/messages", label: "Conversas", icon: <FaMessage /> },
    {
      path: "/dashboard/botbuilder",
      label: "Criador de Bot",
      icon: <FaRobot />,
    },
    {
      path: "/dashboard/settings",
      label: "Configurações",
      icon: <IoSettings />,
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <span>{session?.user?.email}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
