import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import "./BotBuilder.css";

// Ícones
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaImage, FaVideo, FaMusic, FaFileAlt } from "react-icons/fa";
import {
  FaListUl,
  FaRegHandPointer,
  FaList,
  FaSmile,
  FaKeyboard,
  FaMapMarkerAlt,
  FaAddressBook,
  FaCodeBranch,
} from "react-icons/fa";

//
// 🧩 Componentes de Nó
//

const MensagemNode = ({ data }) => (
  <div className="node bot-node">
    <div className="node-header">
      <span className="node-icon">
        <BiSolidMessageRounded />
      </span>{" "}
      Mensagem
    </div>
    <textarea
      placeholder="Digite sua mensagem..."
      value={data.message || ""}
      onChange={(e) => data.onChange?.(e.target.value)}
    />
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const ImagemNode = ({ data }) => (
  <div className="node bot-node">
    <div className="node-header midia-header">
      <span className="node-icon">
        <FaImage />
      </span>{" "}
      Imagem
    </div>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => data.onFileChange?.(e.target.files[0])}
    />
    <input
      type="text"
      placeholder="Legenda (opcional)"
      value={data.caption || ""}
      onChange={(e) => data.onCaptionChange?.(e.target.value)}
    />
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const VideoNode = ({ data }) => (
  <div className="node bot-node">
    <div className="node-header midia-header">
      <span className="node-icon">
        <FaVideo />
      </span>{" "}
      Vídeo
    </div>
    <input
      type="file"
      accept="video/*"
      onChange={(e) => data.onFileChange?.(e.target.files[0])}
    />
    <input
      type="text"
      placeholder="Legenda (opcional)"
      value={data.caption || ""}
      onChange={(e) => data.onCaptionChange?.(e.target.value)}
    />
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const AudioNode = ({ data }) => (
  <div className="node bot-node">
    <div className="node-header midia-header">
      <span className="node-icon">
        <FaMusic />
      </span>{" "}
      Áudio
    </div>
    <input
      type="file"
      accept="audio/*"
      onChange={(e) => data.onFileChange?.(e.target.files[0])}
    />
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const DocumentoNode = ({ data }) => (
  <div className="node bot-node">
    <div className="node-header midia-header">
      <span className="node-icon">
        <FaFileAlt />
      </span>{" "}
      Documento
    </div>
    <input
      type="file"
      accept="*"
      onChange={(e) => data.onFileChange?.(e.target.files[0])}
    />
    <input
      type="text"
      placeholder="Legenda (opcional)"
      value={data.caption || ""}
      onChange={(e) => data.onCaptionChange?.(e.target.value)}
    />
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

//
// 🧠 Nós de Interação
//

const EscolhaNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaListUl className="node-icon" /> Escolha
    </div>
    <p>Menu de opções</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const BotoesNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaRegHandPointer className="node-icon" /> Botões
    </div>
    <p>Botões interativos</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const ListaNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaList className="node-icon" /> Lista
    </div>
    <p>Lista selecionável</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const ReacaoNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaSmile className="node-icon" /> Reação
    </div>
    <p>Reagir com emojis</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const InteracaoUsuarioNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaKeyboard className="node-icon" /> Interação Usuário
    </div>
    <p>Campo de entrada</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

//
// 📡 Nós de Dados
//

const LocalizacaoNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaMapMarkerAlt className="node-icon" /> Localização
    </div>
    <p>Enviar localização</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const ContatoNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaAddressBook className="node-icon" /> Contato
    </div>
    <p>Enviar contato</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

const CondicaoNode = () => (
  <div className="node bot-node">
    <div className="node-header">
      <FaCodeBranch className="node-icon" /> Condição
    </div>
    <p>Fluxo condicional</p>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

//
// 🧭 Tipos de Nó
//

const nodeTypes = {
  mensagem: MensagemNode,
  imagem: ImagemNode,
  video: VideoNode,
  audio: AudioNode,
  documento: DocumentoNode,
  escolha: EscolhaNode,
  botoes: BotoesNode,
  lista: ListaNode,
  reacao: ReacaoNode,
  interacaoUsuario: InteracaoUsuarioNode,
  localizacao: LocalizacaoNode,
  contato: ContatoNode,
  condicao: CondicaoNode,
};

//
// 🚀 Componente Principal
//

export default function BotBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const rect = event.target.getBoundingClientRect();
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      const id = `${type}-${Date.now()}`;
      const newNode = {
        id,
        type,
        position,
        data: {
          onChange: (value) =>
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, message: value } } : n
              )
            ),
          onFileChange: (file) =>
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, file } } : n
              )
            ),
          onCaptionChange: (value) =>
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, caption: value } } : n
              )
            ),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="botbuilder-wrapper">
      {/* 🧭 Sidebar Esquerda */}
      <div className="sidebar-left">
        <h4>MENSAGENS</h4>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "mensagem")
          }
        >
          <BiSolidMessageRounded /> Mensagem
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "imagem")
          }
        >
          <FaImage /> Imagem
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "video")
          }
        >
          <FaVideo /> Vídeo
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "audio")
          }
        >
          <FaMusic /> Áudio
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "documento")
          }
        >
          <FaFileAlt /> Documento
        </div>

        <h4>INTERAÇÃO</h4>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "escolha")
          }
        >
          <FaListUl /> Escolha
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "botoes")
          }
        >
          <FaRegHandPointer /> Botões
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "lista")
          }
        >
          <FaList /> Lista
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "reacao")
          }
        >
          <FaSmile /> Reação
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "interacaoUsuario")
          }
        >
          <FaKeyboard /> Interação Usuário
        </div>

        <h4>DADOS</h4>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "localizacao")
          }
        >
          <FaMapMarkerAlt /> Localização
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "contato")
          }
        >
          <FaAddressBook /> Contato
        </div>
        <div
          className="sidebar-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", "condicao")
          }
        >
          <FaCodeBranch /> Condição
        </div>
      </div>

      {/* 🧭 Canvas Central */}
      <div className="canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* 📊 Sidebar Direita */}
      <div className="sidebar-right">
        <div className="info-box">
          <h4>📘 Como usar:</h4>
          <ol>
            <li>Arraste elementos da sidebar para o canvas</li>
            <li>Clique nos círculos para conectar nós</li>
            <li>Configure clicando no nó</li>
            <li>Exporte para WhatsApp</li>
          </ol>
        </div>

        <div className="info-box">
          <h4>📊 Sequência do Fluxo</h4>
          <ol>
            {nodes.map((node, index) => (
              <li key={node.id}>
                {index + 1}.{" "}
                {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
