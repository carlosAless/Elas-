// components/dashboard/pages/Messages.jsx
import React, { useState } from "react";
import {
  FaSearch,
  FaPhoneAlt,
  FaVideo,
  FaEllipsisV,
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
  FaCircle,
  FaCheckDouble,
} from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import "./Messages.css";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  // Dados fictícios de conversas
  const conversations = [
    {
      id: 1,
      name: "João Silva",
      phone: "+55 (11) 98765-4321",
      lastMessage: "Obrigado pela ajuda!",
      time: "10:23",
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          text: "Olá, gostaria de saber sobre o produto X",
          time: "09:15",
          sender: "contact",
          status: "read",
        },
        {
          id: 2,
          text: "Claro! O produto X está disponível em 3 cores",
          time: "09:16",
          sender: "agent",
          status: "read",
        },
        {
          id: 3,
          text: "Qual o preço?",
          time: "09:20",
          sender: "contact",
          status: "read",
        },
        {
          id: 4,
          text: "R$ 299,90 à vista ou 12x sem juros",
          time: "09:21",
          sender: "agent",
          status: "read",
        },
        {
          id: 5,
          text: "Obrigado pela ajuda!",
          time: "10:23",
          sender: "contact",
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      name: "Maria Santos",
      phone: "+55 (11) 91234-5678",
      lastMessage: "Pode me enviar a nota fiscal?",
      time: "09:45",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          text: "Bom dia, meu pedido ainda não chegou",
          time: "09:30",
          sender: "contact",
          status: "read",
        },
        {
          id: 2,
          text: "Vou verificar o status para você",
          time: "09:32",
          sender: "agent",
          status: "read",
        },
        {
          id: 3,
          text: "Pode me enviar a nota fiscal?",
          time: "09:45",
          sender: "contact",
          status: "read",
        },
      ],
    },
    {
      id: 3,
      name: "Pedro Costa",
      phone: "+55 (11) 94567-8901",
      lastMessage: "Entendi, obrigado!",
      time: "Ontem",
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          text: "O suporte técnico funciona aos fins de semana?",
          time: "16:20",
          sender: "contact",
          status: "read",
        },
        {
          id: 2,
          text: "Sim, das 8h às 18h",
          time: "16:22",
          sender: "agent",
          status: "read",
        },
        {
          id: 3,
          text: "Entendi, obrigado!",
          time: "16:25",
          sender: "contact",
          status: "read",
        },
      ],
    },
    {
      id: 4,
      name: "Ana Oliveira",
      phone: "+55 (11) 92345-6789",
      lastMessage: "Preciso falar com o gerente",
      time: "Ontem",
      unread: 1,
      online: false,
      messages: [
        {
          id: 1,
          text: "Boa tarde, preciso falar com o gerente",
          time: "14:10",
          sender: "contact",
          status: "delivered",
        },
      ],
    },
    {
      id: 5,
      name: "Carlos Souza",
      phone: "+55 (11) 93456-7890",
      lastMessage: "Ótimo atendimento!",
      time: "12/12",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          text: "Muito obrigado pelo suporte, excelente atendimento!",
          time: "15:30",
          sender: "contact",
          status: "read",
        },
        {
          id: 2,
          text: "Que bom que gostou! Estamos à disposição",
          time: "15:31",
          sender: "agent",
          status: "read",
        },
      ],
    },
  ];

  const selectedConversation = conversations.find(
    (chat) => chat.id === selectedChat
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === "") return;

    // Em uma aplicação real, aqui você enviaria a mensagem para a API
    console.log("Mensagem enviada:", messageInput);
    setMessageInput("");
  };

  const getStatusIcon = (status, sender) => {
    if (sender === "contact") return null;

    switch (status) {
      case "sent":
        return <FaPaperPlane size={10} color="#999" />;
      case "delivered":
        return <FaCheckDouble size={10} color="#999" />;
      case "read":
        return <IoCheckmarkDone size={12} color="#53bdeb" />;
      default:
        return <FaPaperPlane size={10} color="#999" />;
    }
  };

  return (
    <div className="messages-page">
      {/* Header */}
      <div className="messages-header">
        <div className="header-content">
          <h1>
            <FaCircle size={8} color="#25d366" className="header-icon" />
            Mensagens
          </h1>
          <div className="header-stats">
            <span className="stat-item">
              <strong>{conversations.length}</strong> Conversas
            </span>
            <span className="stat-item">
              <strong>
                {conversations.filter((c) => c.unread > 0).length}
              </strong>{" "}
              Não lidas
            </span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {/* Lista de Conversas (Sidebar) */}
        <div className="conversations-sidebar">
          <div className="sidebar-header">
            <div className="search-box">
              <div className="search-icon">
                <FaSearch size={14} color="#999" />
              </div>
              <input
                type="text"
                placeholder="Buscar conversas..."
                className="search-input"
              />
            </div>
            <div className="filter-tabs">
              <button className="filter-tab active">Todas</button>
              <button className="filter-tab">Não lidas</button>
              <button className="filter-tab">Grupos</button>
            </div>
          </div>

          <div className="conversations-list">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${
                  selectedChat === conversation.id ? "active" : ""
                }`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="avatar">
                  <div className="avatar-img">
                    {conversation.name.charAt(0)}
                  </div>
                  {conversation.online && (
                    <div className="online-indicator">
                      <FaCircle size={8} color="#4caf50" />
                    </div>
                  )}
                </div>

                <div className="conversation-info">
                  <div className="conversation-header">
                    <span className="contact-name">{conversation.name}</span>
                    <span className="message-time">{conversation.time}</span>
                  </div>

                  <div className="conversation-preview">
                    <p className="last-message">{conversation.lastMessage}</p>
                    <div className="conversation-meta">
                      {conversation.unread > 0 && (
                        <span className="unread-badge">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área de Chat */}
        <div className="chat-area">
          {selectedConversation ? (
            <>
              {/* Header do Chat */}
              <div className="chat-header">
                <div className="chat-contact-info">
                  <div className="contact-avatar">
                    {selectedConversation.name.charAt(0)}
                    {selectedConversation.online && (
                      <div className="online-indicator">
                        <FaCircle size={8} color="#4caf50" />
                      </div>
                    )}
                  </div>
                  <div className="contact-details">
                    <h3>{selectedConversation.name}</h3>
                    <span className="contact-phone">
                      {selectedConversation.phone}
                    </span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn">
                    <FaPhoneAlt size={16} color="#666" />
                  </button>
                  <button className="action-btn">
                    <FaVideo size={16} color="#666" />
                  </button>
                  <button className="action-btn">
                    <FaEllipsisV size={16} color="#666" />
                  </button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="messages-list">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${
                      message.sender === "agent" ? "sent" : "received"
                    }`}
                  >
                    <div className="message-bubble">
                      <p>{message.text}</p>
                      <div className="message-footer">
                        <span className="message-time">{message.time}</span>
                        {message.sender === "agent" && (
                          <span className="message-status">
                            {getStatusIcon(message.status, message.sender)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de Mensagem */}
              <form
                className="message-input-container"
                onSubmit={handleSendMessage}
              >
                <div className="input-actions">
                  <button type="button" className="input-action-btn">
                    <FaSmile size={20} color="#666" />
                  </button>
                  <button type="button" className="input-action-btn">
                    <FaPaperclip size={18} color="#666" />
                  </button>
                </div>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Digite uma mensagem..."
                  className="message-input"
                />
                <button
                  type="submit"
                  className="send-button"
                  disabled={!messageInput.trim()}
                >
                  <FaPaperPlane size={16} color="white" />
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="empty-state">
                <div className="empty-icon">
                  <FaCircle size={64} color="#25d366" />
                </div>
                <h3>Selecione uma conversa</h3>
                <p>
                  Escolha uma conversa da lista para começar a trocar mensagens
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
