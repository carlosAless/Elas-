import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    botName: "Meu Bot WhatsApp",
    welcomeMessage: "Olá! Bem-vindo ao nosso atendimento automatizado.",
    autoReply: true,
    businessHours: {
      enabled: true,
      startTime: "09:00",
      endTime: "18:00",
    },
    awayMessage:
      "No momento estamos fora do horário comercial. Retornaremos em breve.",
    maxConnections: 100,
    messageDelay: 2,
    mediaSharing: true,
    language: "pt-BR",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log("Configurações salvas:", settings);
    alert("Configurações salvas com sucesso!");
  };

  const handleReset = () => {
    if (
      window.confirm("Tem certeza que deseja redefinir todas as configurações?")
    ) {
      setSettings({
        botName: "Meu Bot WhatsApp",
        welcomeMessage: "Olá! Bem-vindo ao nosso atendimento automatizado.",
        autoReply: true,
        businessHours: {
          enabled: true,
          startTime: "09:00",
          endTime: "18:00",
        },
        awayMessage:
          "No momento estamos fora do horário comercial. Retornaremos em breve.",
        maxConnections: 100,
        messageDelay: 2,
        mediaSharing: true,
        language: "pt-BR",
      });
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Configurações do Bot</h1>
        <p>Gerencie as configurações do seu bot WhatsApp</p>
      </div>

      <div className="settings-content">
        {/* Informações Básicas */}
        <div className="settings-section">
          <h2>Informações Básicas</h2>
          <div className="form-group">
            <label htmlFor="botName">Nome do Bot</label>
            <input
              type="text"
              id="botName"
              name="botName"
              value={settings.botName}
              onChange={handleInputChange}
              placeholder="Digite o nome do bot"
            />
          </div>

          <div className="form-group">
            <label htmlFor="welcomeMessage">Mensagem de Boas-vindas</label>
            <textarea
              id="welcomeMessage"
              name="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={handleInputChange}
              placeholder="Digite a mensagem de boas-vindas"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Idioma</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleInputChange}
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Configurações de Resposta */}
        <div className="settings-section">
          <h2>Configurações de Resposta</h2>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoReply"
                checked={settings.autoReply}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Resposta Automática Ativada
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="messageDelay">
              Delay entre Mensagens (segundos)
            </label>
            <input
              type="number"
              id="messageDelay"
              name="messageDelay"
              value={settings.messageDelay}
              onChange={handleInputChange}
              min="1"
              max="10"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.mediaSharing}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "mediaSharing",
                      type: "checkbox",
                      checked: e.target.checked,
                    },
                  })
                }
              />
              <span className="checkmark"></span>
              Permitir Compartilhamento de Mídia
            </label>
          </div>
        </div>

        {/* Horário Comercial */}
        <div className="settings-section">
          <h2>Horário Comercial</h2>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.businessHours.enabled}
                onChange={(e) =>
                  handleNestedChange(
                    "businessHours",
                    "enabled",
                    e.target.checked
                  )
                }
              />
              <span className="checkmark"></span>
              Ativar Horário Comercial
            </label>
          </div>

          {settings.businessHours.enabled && (
            <div className="time-settings">
              <div className="form-group">
                <label htmlFor="startTime">Horário de Início</label>
                <input
                  type="time"
                  id="startTime"
                  value={settings.businessHours.startTime}
                  onChange={(e) =>
                    handleNestedChange(
                      "businessHours",
                      "startTime",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="endTime">Horário de Término</label>
                <input
                  type="time"
                  id="endTime"
                  value={settings.businessHours.endTime}
                  onChange={(e) =>
                    handleNestedChange(
                      "businessHours",
                      "endTime",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="awayMessage">Mensagem Fora do Horário</label>
                <textarea
                  id="awayMessage"
                  value={settings.awayMessage}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "awayMessage",
                        value: e.target.value,
                      },
                    })
                  }
                  placeholder="Digite a mensagem para fora do horário comercial"
                  rows="3"
                />
              </div>
            </div>
          )}
        </div>

        {/* Limites */}
        <div className="settings-section">
          <h2>Limites e Conexões</h2>
          <div className="form-group">
            <label htmlFor="maxConnections">
              Máximo de Conexões Simultâneas
            </label>
            <input
              type="number"
              id="maxConnections"
              name="maxConnections"
              value={settings.maxConnections}
              onChange={handleInputChange}
              min="1"
              max="1000"
            />
          </div>
        </div>

        {/* Ações */}
        <div className="settings-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Salvar Configurações
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Redefinir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
