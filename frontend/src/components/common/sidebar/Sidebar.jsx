import React, { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaRobot, FaComments, FaSignOutAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import "./Sidebar.css";
import { images } from "../../../assets/assets";
import { supabase } from "../../../helper/supabaseClient";
import { RiMenuUnfold4Line } from "react-icons/ri";

// Context para compartilhar o estado expanded
const SidebarContext = createContext();

export default function Sidebar({ session }) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { path: "/dashboard/messages", label: "Conversas", icon: <FaComments /> },
    {
      path: "/dashboard/botbuilder",
      label: "Criador de Bot",
      icon: <FaRobot />,
    },
    {
      path: "/dashboard/settings",
      label: "Configurações",
      icon: <IoSettings />,
    },
    {
      path: "#",
      label: "Sair",
      icon: <FaSignOutAlt />,
      onClick: handleLogout,
      isButton: true,
    },
  ];

  return (
    <aside className={`h-screen ${expanded ? "w-70" : "w-fit"}`}>
      <nav className="h-full flex flex-col bg-white shadow-sm">
        {/* Header com toggle */}
        <div
          className={`p-4 pb-2 flex ${
            expanded ? "justify-between" : "justify-center"
          } items-center h-[128px] `}
        >
          <img
            src={images.elasporelas}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 cursor-pointer"
          >
            {expanded ? (
              <RiMenuUnfold4Line className="w-[30px] h-[30px]" />
            ) : (
              <RiMenuUnfold4Line className="w-[30px] h-[30px] rotate-180"></RiMenuUnfold4Line>
            )}
          </button>
        </div>

        {/* Menu Items usando SidebarContext */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 !px-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                text={item.label}
                path={item.path}
                active={location.pathname === item.path}
                onClick={item.onClick}
                isButton={item.isButton}
              />
            ))}
          </ul>
        </SidebarContext.Provider>

        {/* Footer do usuário */}
      </nav>
    </aside>
  );
}

// Componente SidebarItem atualizado para suportar botões
function SidebarItem({ icon, text, active, alert, path, onClick, isButton }) {
  const { expanded } = useContext(SidebarContext);

  const Content = ({ children }) => {
    if (isButton) {
      return (
        <button onClick={onClick} className="w-full text-left">
          {children}
        </button>
      );
    }
    return <Link to={path}>{children}</Link>;
  };

  return (
    <Content>
      <li
        className={`
  !py-3 !px-4 relative flex items-center my-1
  font-medium rounded-md cursor-pointer
  transition-colors group h-[50px]
  ${
    (expanded ? "w-full" : "w-50px",
    active
      ? "bg-[var(--secondary-color)] text-[var(--third-color)]"
      : "hover:bg-indigo-50 text-gray-600")
  }
`}
      >
        <span className="text-lg">{icon}</span>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
      absolute left-full rounded-md px-3 py-2 ml-2
      bg-indigo-100 text-indigo-800 text-sm font-medium
      invisible opacity-0 -translate-x-2 transition-all
      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      z-50 whitespace-nowrap shadow-lg
    `}
          >
            {text}
          </div>
        )}
      </li>
    </Content>
  );
}

// Export do SidebarItem (caso precise usar em outros lugares)
export { SidebarItem };
