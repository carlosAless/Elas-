// components/dashboard/Dashboard.jsx
import React from "react";
import { supabase } from "../../helper/supabaseClient";
import "./Dashboard.css";

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
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal do Dashboard */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Painel Administrativo</h2>
          <p>Gerencie suas conversas e bots de WhatsApp</p>

          {/* Aqui você pode adicionar os módulos do seu sistema */}
          <div className="modules-grid">
            <div className="module-card">
              <h3>💬 Conversas</h3>
              <p>Gerencie mensagens e contatos</p>
            </div>

            <div className="module-card">
              <h3>🤖 Bots</h3>
              <p>Crie e gerencie chatbots</p>
            </div>

            <div className="module-card">
              <h3>📊 Relatórios</h3>
              <p>Analise o desempenho</p>
            </div>

            <div className="module-card">
              <h3>⚙️ Configurações</h3>
              <p>Configure sua conta</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
