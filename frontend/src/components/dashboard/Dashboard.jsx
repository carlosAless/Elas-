// components/dashboard/Dashboard.jsx
import React from "react";
import { supabase } from "../../helper/supabaseClient";
import "./Dashboard.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import DashboardHome from "./pages/DashboardHome";
import Messages from "./pages/Messages";
import BotBuilder from "./pages/botbuilder/BotBuilder";
import Settings from "./pages/Settings";

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
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>Bem-vindo, {session.user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
              Sair
            </button>
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
