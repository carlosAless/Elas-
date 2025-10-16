// components/dashboard/pages/DashboardHome.jsx
import React, { useState, useEffect } from "react";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalConversations: 0,
    activeChats: 0,
    resolvedToday: 0,
    responseTime: 0,
  });

  const [metrics, setMetrics] = useState({
    satisfactionRate: 0,
    firstResponseTime: "0min",
    resolutionRate: 0,
  });

  // Simulação de carregamento de dados
  useEffect(() => {
    // Simula API call
    setTimeout(() => {
      setStats({
        totalConversations: 1247,
        activeChats: 23,
        resolvedToday: 47,
        responseTime: 2.4,
      });

      setMetrics({
        satisfactionRate: 94,
        firstResponseTime: "1.2min",
        resolutionRate: 88,
      });
    }, 1000);
  }, []);

  const recentActivities = [
    {
      id: 1,
      type: "new_chat",
      contact: "João Silva",
      time: "2 min atrás",
      status: "pending",
    },
    {
      id: 2,
      type: "resolved",
      contact: "Maria Santos",
      time: "5 min atrás",
      status: "resolved",
    },
    {
      id: 3,
      type: "transfer",
      contact: "Pedro Costa",
      time: "12 min atrás",
      status: "transferred",
    },
    {
      id: 4,
      type: "new_chat",
      contact: "Ana Oliveira",
      time: "15 min atrás",
      status: "pending",
    },
  ];

  const performanceData = [
    { hour: "09:00", chats: 12, resolved: 10 },
    { hour: "10:00", chats: 18, resolved: 15 },
    { hour: "11:00", chats: 25, resolved: 22 },
    { hour: "12:00", chats: 30, resolved: 27 },
    { hour: "13:00", chats: 22, resolved: 20 },
    { hour: "14:00", chats: 28, resolved: 25 },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: "#ff6b35",
      resolved: "#4CAF50",
      transferred: "#2196F3",
    };
    return colors[status] || "#666";
  };

  const getActivityIcon = (type) => {
    const icons = {
      new_chat: "💬",
      resolved: "✅",
      transfer: "🔄",
    };
    return icons[type] || "📝";
  };

  return (
    <div className="dashboard-home">
      {/* Header com Saudação */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Bem-vindo de volta! 👋</h1>
          <p>Aqui está o que está acontecendo no seu atendimento hoje</p>
        </div>
        <div className="date-section">
          <span>
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💬</div>
          <div className="metric-info">
            <h3>Total de Conversas</h3>
            <div className="metric-value">
              {stats.totalConversations.toLocaleString()}
            </div>
            <div className="metric-trend positive">+12% desde ontem</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🔄</div>
          <div className="metric-info">
            <h3>Chats Ativos</h3>
            <div className="metric-value">{stats.activeChats}</div>
            <div className="metric-trend warning">+3 aguardando</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-info">
            <h3>Resolvidos Hoje</h3>
            <div className="metric-value">{stats.resolvedToday}</div>
            <div className="metric-trend positive">+8% meta diária</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-info">
            <h3>Tempo Médio de Resposta</h3>
            <div className="metric-value">{stats.responseTime}min</div>
            <div className="metric-trend positive">-0.3min vs ontem</div>
          </div>
        </div>
      </div>

      {/* Segunda Linha de Métricas */}
      <div className="metrics-grid">
        <div className="metric-card large">
          <div className="metric-header">
            <h3>📊 Desempenho do Atendimento</h3>
          </div>
          <div className="performance-metrics">
            <div className="performance-item">
              <div className="performance-value" style={{ color: "#4CAF50" }}>
                {metrics.satisfactionRate}%
              </div>
              <div className="performance-label">Satisfação do Cliente</div>
            </div>
            <div className="performance-item">
              <div className="performance-value" style={{ color: "#2196F3" }}>
                {metrics.firstResponseTime}
              </div>
              <div className="performance-label">1ª Resposta</div>
            </div>
            <div className="performance-item">
              <div className="performance-value" style={{ color: "#FF9800" }}>
                {metrics.resolutionRate}%
              </div>
              <div className="performance-label">Taxa de Resolução</div>
            </div>
          </div>
        </div>

        <div className="metric-card large">
          <div className="metric-header">
            <h3>📈 Atividade em Tempo Real</h3>
          </div>
          <div className="activity-chart">
            {performanceData.map((item, index) => (
              <div key={index} className="chart-bar">
                <div
                  className="bar chats"
                  style={{ height: `${item.chats * 3}px` }}
                  title={`${item.chats} chats`}
                ></div>
                <div
                  className="bar resolved"
                  style={{ height: `${item.resolved * 3}px` }}
                  title={`${item.resolved} resolvidos`}
                ></div>
                <span className="bar-label">{item.hour}</span>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color chats"></div>
              <span>Total de Chats</span>
            </div>
            <div className="legend-item">
              <div className="legend-color resolved"></div>
              <span>Resolvidos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Atividades Recentes e Ações Rápidas */}
      <div className="bottom-section">
        <div className="recent-activities">
          <h3>🕒 Atividades Recentes</h3>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-details">
                  <div className="activity-contact">{activity.contact}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
                <div
                  className="activity-status"
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3>⚡ Ações Rápidas</h3>
          <div className="actions-grid">
            <button className="action-btn primary">
              <span>💬</span>
              Novo Chat
            </button>
            <button className="action-btn secondary">
              <span>🤖</span>
              Criar Bot
            </button>
            <button className="action-btn secondary">
              <span>📊</span>
              Ver Relatórios
            </button>
            <button className="action-btn secondary">
              <span>👥</span>
              Gerenciar Equipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
