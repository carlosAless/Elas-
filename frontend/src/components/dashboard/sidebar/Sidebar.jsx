// components/dashboard/sidebar/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ session }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/dashboard/messages", label: "Conversas", icon: "💬" },
    { path: "/dashboard/botbuilder", label: "Criador de Bot", icon: "🤖" },
    { path: "/dashboard/settings", label: "Configurações", icon: "⚙️" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <h2>Meu Dashboard</h2>
        </div>
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
