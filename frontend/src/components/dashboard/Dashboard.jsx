// components/dashboard/Dashboard.jsx
import React from "react";
import { supabase } from "../../helper/supabaseClient";
import "./Dashboard.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";

import Sidebar from "./sidebar/Sidebar";
import DashboardHome from "./pages/DashboardHome";
import Messages from "./pages/Messages";
import BotBuilder from "./pages/botbuilder/BotBuilder";
import Settings from "./pages/settings/Settings";

export const Dashboard = ({ session }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header do Dashboard */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>ElasPorElas+</h1>
          <div className="user-info">
            <div className="notifications">
<IoNotifications />

            </div>

            <div className="userAccount">
<FaUserLarge />

            </div>

          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar de Navegação */}
        <Sidebar />

        {/* Conteúdo principal do Dashboard */}
        <main className="dashboard-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route index element={<DashboardHome />} />

            <Route path="messages" element={<Messages />} />
            <Route path="botbuilder" element={<BotBuilder />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
