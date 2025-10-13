// components/dashboard/pages/DashboardHome.jsx
import React from "react";

const DashboardHome = () => (
  <div className="page-content">
    <div className="welcome-section">
      <h2>Painel Administrativo</h2>
      <p>Gerencie suas conversas e bots de WhatsApp</p>

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
  </div>
);

export default DashboardHome;
