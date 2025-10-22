// Dashboard.jsx
import React, { useState, useEffect } from "react";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [timeRange, setTimeRange] = useState("7d");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [highlightedType, setHighlightedType] = useState(null);
  const [reportVolumeData, setReportVolumeData] = useState({
    "24h": [5, 8, 12, 7, 10, 15, 18, 22, 17, 14, 9, 6],
    "2d": [24, 32, 28, 35, 42, 38, 31, 29],
    "3d": [45, 52, 48, 55, 62, 58, 51, 49, 53, 57, 60, 55],
    "7d": [120, 135, 142, 128, 155, 168, 145],
    "30d": [
      450, 520, 480, 550, 620, 580, 510, 490, 530, 570, 600, 550, 520, 480, 510,
      540, 560, 590, 610, 580, 550, 530, 560, 580, 600, 620, 590, 560, 540, 520,
    ],
    custom: [100, 120, 110, 130, 125, 115, 135],
  });
  const [stats, setStats] = useState({
    activeCases: 0,
    forwardedCases: 0,
    urgentCases: 0,
    avgResolutionTime: 0,
    operatorPerformance: 0,
  });

  // Dados mockados para demonstração
  useEffect(() => {
    // Simular dados iniciais
    setStats({
      activeCases: 15,
      forwardedCases: 8,
      urgentCases: 5,
      avgResolutionTime: 4.2,
      operatorPerformance: 82,
    });

    setConversations([
      {
        id: 1,
        user: "Usuario_5f8a1b",
        status: "new",
        priority: "high",
        type: "Violência Física",
        lastMessage: "Preciso de ajuda urgente...",
        timeInQueue: "5 min",
        unread: true,
        timestamp: "10:30",
      },
      {
        id: 2,
        user: "Usuario_9c3d2e",
        status: "in_progress",
        priority: "medium",
        type: "Violência Psicológica",
        lastMessage: "Ele está me ameaçando...",
        timeInQueue: "12 min",
        unread: false,
        timestamp: "10:15",
      },
    ]);

    // Set default dates
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    setStartDate(oneWeekAgo.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  }, []);

  const complaintTypes = [
    { type: "Violência Física", count: 45, color: "#FF6B6B" },
    { type: "Violência Psicológica", count: 38, color: "#4ECDC4" },
    { type: "Violência Sexual", count: 22, color: "#FFD166" },
    { type: "Violência Patrimonial", count: 18, color: "#06D6A0" },
    { type: "Violência Moral", count: 12, color: "#118AB2" },
  ];

  const caseStatusData = [
    { status: "Novas", count: 15, color: "#FF6B6B" },
    { status: "Em Andamento", count: 25, color: "#4ECDC4" },
    { status: "Aguardando", count: 12, color: "#FFD166" },
    { status: "Resolvidas", count: 48, color: "#06D6A0" },
  ];

  // Função para mostrar tooltip
  const showTooltip = (event, value, label) => {
    const tooltip = document.getElementById("chart-tooltip");
    if (tooltip) {
      tooltip.innerHTML = `<strong>${label}</strong><br>${value} denúncias`;
      tooltip.style.opacity = "1";
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY - 40}px`;
    }
  };

  const hideTooltip = () => {
    const tooltip = document.getElementById("chart-tooltip");
    if (tooltip) {
      tooltip.style.opacity = "0";
    }
  };

  // Função para obter labels dinâmicas
  const getLabelForIndex = (index, range) => {
    const labels = {
      "24h": [
        "00h",
        "02h",
        "04h",
        "06h",
        "08h",
        "10h",
        "12h",
        "14h",
        "16h",
        "18h",
        "20h",
        "22h",
      ],
      "2d": ["Dia 1", "Dia 2"],
      "3d": ["Seg", "Ter", "Qua"],
      "7d": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      "30d": Array.from({ length: 30 }, (_, i) => `${i + 1}`),
      custom: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
    };
    return labels[range]?.[index] || `Item ${index + 1}`;
  };

  // Função para calcular média
  const calculateAverage = (data) => {
    if (!data || data.length === 0) return 0;
    const average = data.reduce((a, b) => a + b, 0) / data.length;
    return average % 1 === 0 ? average : average.toFixed(1);
  };

  // Função para aplicar período personalizado
  const applyCustomDateRange = () => {
    if (startDate && endDate) {
      // Simular dados para o período personalizado
      const days =
        Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        ) + 1;
      const customData = Array.from(
        { length: Math.min(days, 30) },
        (_, i) =>
          Math.floor(Math.random() * 50) +
          20 +
          Math.floor(Math.sin(i * 0.5) * 10)
      );
      setReportVolumeData((prev) => ({
        ...prev,
        custom: customData,
      }));
      setTimeRange("custom");
    }
  };

  // Funções de interação
  const highlightType = (type) => {
    setHighlightedType(type);
  };

  const resetHighlight = () => {
    setHighlightedType(null);
  };

  const filterByStatus = (status) => {
    console.log(`Filtrando por status: ${status}`);
    // Implementar filtro real aqui
    alert(`Filtrando casos por: ${status}`);
  };

  const KPICard = ({ title, value, subtitle, trend }) => (
    <div className="kpi-card">
      <div className="kpi-content">
        <h3>{title}</h3>
        <div className="kpi-value">{value}</div>
        <div className="kpi-subtitle">{subtitle}</div>
        {trend && (
          <div className={`kpi-trend ${trend.type}`}>{trend.value}</div>
        )}
      </div>
    </div>
  );

  const PriorityBadge = ({ priority }) => {
    const priorityClass = `priority-badge ${priority}`;
    const priorityText = {
      high: "Alta",
      medium: "Média",
      low: "Baixa",
    }[priority];

    return <span className={priorityClass}>{priorityText}</span>;
  };

  const StatusBadge = ({ status }) => {
    const statusClass = `status-badge ${status}`;
    const statusText = {
      new: "Nova",
      in_progress: "Em Andamento",
      waiting: "Aguardando",
      resolved: "Resolvida",
    }[status];

    return <span className={statusClass}>{statusText}</span>;
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Central de Apoio</h1>
          <span className="subtitle">Sistema de Denúncias</span>
        </div>
        <div className="header-right">
          <div className="user-menu">
            <span>Operador</span>
            <div className="user-avatar">OP</div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Visão Geral
        </button>
        <button
          className={`nav-btn ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          Painel de Atendimento
        </button>
        <button
          className={`nav-btn ${activeTab === "reports" ? "active" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          Relatórios
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            {/* KPI Cards */}
            <div className="kpi-grid">
              <KPICard
                title="Casos Ativos"
                value={stats.activeCases}
                subtitle="Necessitam atenção imediata"
                trend={{ type: "neutral", value: "↔ 0%" }}
              />
              <KPICard
                title="Casos Encaminhados"
                value={stats.forwardedCases}
                subtitle="Para parceiros especializados"
                trend={{ type: "positive", value: "+8%" }}
              />
              <KPICard
                title="Casos Urgentes"
                value={stats.urgentCases}
                subtitle="Prioridade máxima"
                trend={{ type: "negative", value: "+15%" }}
              />
              <KPICard
                title="Tempo Médio Resolução"
                value={`${stats.avgResolutionTime}h`}
                subtitle="Duração média dos casos"
                trend={{ type: "positive", value: "-12%" }}
              />
              <KPICard
                title="Performance"
                value={`${stats.operatorPerformance}%`}
                subtitle="Eficiência do operador"
                trend={{ type: "positive", value: "+5%" }}
              />
            </div>

            {/* Charts Grid */}
            <div className="charts-grid">
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Volume de Denúncias</h3>
                  <div className="chart-controls">
                    <div className="custom-date-range">
                      <input
                        type="date"
                        className="date-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <span>até</span>
                      <input
                        type="date"
                        className="date-input"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      <button
                        className="btn-apply"
                        onClick={applyCustomDateRange}
                      >
                        Aplicar
                      </button>
                    </div>
                    <select
                      className="time-filter"
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <option value="24h">Últimas 24h</option>
                      <option value="2d">Últimos 2 dias</option>
                      <option value="3d">Últimos 3 dias</option>
                      <option value="7d">Última semana</option>
                      <option value="30d">Último mês</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>
                </div>
                <div className="chart-container">
                  <div className="volume-chart">
                    {reportVolumeData[timeRange]?.map((value, index) => (
                      <div key={index} className="chart-bar">
                        <div
                          className="bar-fill"
                          style={{
                            height: `${
                              (value /
                                Math.max(...reportVolumeData[timeRange])) *
                              100
                            }%`,
                          }}
                          onMouseEnter={(e) =>
                            showTooltip(
                              e,
                              value,
                              getLabelForIndex(index, timeRange)
                            )
                          }
                          onMouseLeave={hideTooltip}
                        ></div>
                        <span className="bar-label">
                          {getLabelForIndex(index, timeRange)}
                        </span>
                        <span className="bar-value">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-tooltip" id="chart-tooltip"></div>
                </div>
                <div className="chart-footer">
                  <div className="chart-stats">
                    <div className="stat-item">
                      <span className="stat-label">Média:</span>
                      <span className="stat-value">
                        {calculateAverage(reportVolumeData[timeRange])}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Pico:</span>
                      <span className="stat-value">
                        {Math.max(...reportVolumeData[timeRange])}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Total:</span>
                      <span className="stat-value">
                        {reportVolumeData[timeRange]?.reduce(
                          (a, b) => a + b,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Tipos de Denúncia</h3>
                <div className="chart-container">
                  <div className="types-chart">
                    {complaintTypes.map((item, index) => (
                      <div
                        key={index}
                        className="type-item"
                        onMouseEnter={() => highlightType(item.type)}
                        onMouseLeave={resetHighlight}
                      >
                        <div className="type-info">
                          <div
                            className="type-color"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="type-label">{item.type}</span>
                        </div>
                        <span className="type-count">{item.count}</span>
                        <div className="type-bar-container">
                          <div
                            className="type-bar-fill"
                            style={{
                              width: `${
                                (item.count /
                                  complaintTypes.reduce(
                                    (sum, t) => sum + t.count,
                                    0
                                  )) *
                                100
                              }%`,
                              backgroundColor: item.color,
                              opacity: highlightedType === item.type ? 1 : 0.8,
                            }}
                          ></div>
                          <span className="type-percentage">
                            {Math.round(
                              (item.count /
                                complaintTypes.reduce(
                                  (sum, t) => sum + t.count,
                                  0
                                )) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Status dos Casos</h3>
                <div className="chart-container">
                  <div className="status-chart">
                    {caseStatusData.map((item, index) => (
                      <div
                        key={index}
                        className="status-item"
                        onClick={() => filterByStatus(item.status)}
                      >
                        <div className="status-main">
                          <div
                            className="status-indicator"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="status-label">{item.status}</span>
                          <span className="status-count">{item.count}</span>
                        </div>
                        <div className="status-details">
                          <span className="status-percentage">
                            {Math.round(
                              (item.count /
                                caseStatusData.reduce(
                                  (acc, curr) => acc + curr.count,
                                  0
                                )) *
                                100
                            )}
                            %
                          </span>
                          <div className="status-trend">
                            <span className="trend-icon">↗</span>
                            <span className="trend-value">+5%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="attendance-tab">
            <div className="attendance-layout">
              {/* Conversations List */}
              <div className="conversations-panel">
                <div className="panel-header">
                  <h3>Conversas</h3>
                  <div className="filters">
                    <select className="filter-select">
                      <option>Todas</option>
                      <option>Novas</option>
                      <option>Em Andamento</option>
                    </select>
                  </div>
                </div>

                <div className="conversations-list">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`conversation-item ${
                        selectedChat?.id === conv.id ? "active" : ""
                      } ${conv.unread ? "unread" : ""}`}
                      onClick={() => setSelectedChat(conv)}
                    >
                      <div className="conv-header">
                        <span className="user-id">{conv.user}</span>
                        <span className="timestamp">{conv.timestamp}</span>
                      </div>
                      <div className="conv-preview">
                        <p>{conv.lastMessage}</p>
                        {conv.unread && (
                          <div className="unread-indicator"></div>
                        )}
                      </div>
                      <div className="conv-meta">
                        <StatusBadge status={conv.status} />
                        <PriorityBadge priority={conv.priority} />
                        <span className="case-type">{conv.type}</span>
                      </div>
                      <div className="conv-footer">
                        <span className="queue-time">
                          Na fila: {conv.timeInQueue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Viewer */}
              <div className="chat-viewer">
                {selectedChat ? (
                  <>
                    <div className="chat-header">
                      <div className="chat-user-info">
                        <h4>{selectedChat.user}</h4>
                        <div className="chat-meta">
                          <StatusBadge status={selectedChat.status} />
                          <PriorityBadge priority={selectedChat.priority} />
                          <span className="case-type">{selectedChat.type}</span>
                        </div>
                      </div>
                      <div className="chat-actions">
                        <button className="btn-secondary">Exportar</button>
                        <button className="btn-primary">Encaminhar</button>
                      </div>
                    </div>

                    <div className="chat-messages">
                      <div className="message received">
                        <div className="message-content">
                          <p>Preciso de ajuda, estou em situação de risco</p>
                        </div>
                        <span className="message-time">10:30</span>
                      </div>

                      <div className="message sent">
                        <div className="message-content">
                          <p>
                            Estou aqui para ajudar. Você está em local seguro no
                            momento?
                          </p>
                        </div>
                        <span className="message-time">10:32</span>
                      </div>
                    </div>

                    <div className="message-input">
                      <textarea placeholder="Digite sua resposta..."></textarea>
                      <button className="btn-send">Enviar</button>
                    </div>
                  </>
                ) : (
                  <div className="no-chat-selected">
                    <p>Selecione uma conversa para visualizar</p>
                  </div>
                )}
              </div>

              {/* Actions Sidebar */}
              <div className="actions-sidebar">
                <div className="sidebar-section">
                  <h4>Resumo do Caso</h4>
                  <div className="case-info">
                    <div className="info-item">
                      <label>Usuário:</label>
                      <span>{selectedChat?.user || "-"}</span>
                    </div>
                    <div className="info-item">
                      <label>Tipo:</label>
                      <span>{selectedChat?.type || "-"}</span>
                    </div>
                    <div className="info-item">
                      <label>Prioridade:</label>
                      <span>
                        {selectedChat ? (
                          <PriorityBadge priority={selectedChat.priority} />
                        ) : (
                          "-"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h4>Ações Rápidas</h4>
                  <div className="action-buttons">
                    <button className="btn-action">
                      Marcar como Resolvida
                    </button>
                    <button className="btn-action">Alterar Prioridade</button>
                    <button className="btn-action">
                      Encaminhar para Parceiro
                    </button>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h4>Anotações Internas</h4>
                  <textarea
                    className="notes-textarea"
                    placeholder="Registre observações importantes..."
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="reports-tab">
            <div className="reports-header">
              <h2>Relatórios e Análises</h2>
              <div className="report-filters">
                <select className="filter-select">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Este mês</option>
                </select>
                <button className="btn-primary">Exportar Relatório</button>
              </div>
            </div>

            <div className="reports-grid">
              <div className="report-card">
                <h3>Métricas de Atendimento</h3>
                <div className="chart-placeholder">
                  Relatório detalhado de atendimentos
                </div>
              </div>

              <div className="report-card">
                <h3>Encaminhamentos por Parceiro</h3>
                <div className="chart-placeholder">
                  Gráfico de encaminhamentos
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardHome;
