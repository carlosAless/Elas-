// components/dashboard/Dashboard.jsx
import React from "react";
import { supabase } from "../../helper/supabaseClient";
import "./Dashboard.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";

import Sidebar from "../../components/common/sidebar/Sidebar";
import DashboardHome from "./DashboardHome";
import Messages from "./tabs/Messages";
import BotBuilder from "./tabs/botbuilder/BotBuilder";
import Settings from "./tabs/settings/Settings";

export const Dashboard = ({ session }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar automática - já tem seus próprios menuItems */}
      <Sidebar session={session} />

      <div className="dashboard-layout">
        {/* Header do Dashboard */}
        <header className="dashboard-header">
          <div className="header-content">
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
