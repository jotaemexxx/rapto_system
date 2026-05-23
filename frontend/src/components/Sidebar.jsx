import "./Sidebar.css";
import logo from "../assets/logo.png";

const MENU = [
  { id: "dashboard",     icone: "▦",  label: "Dashboard" },
  { id: "inventario",    icone: "📦", label: "Inventário" },
  { id: "cadastros",     icone: "👥", label: "Cadastros" },
  { id: "fiscal",        icone: "🧾", label: "Fiscal" },
  { id: "rotas",         icone: "🗺️", label: "Rotas" },
  { id: "configuracoes", icone: "⚙️", label: "Configurações" },
];

export default function Sidebar({ paginaAtiva, onNavegar }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Rapto" className="sidebar-logo-img" />
        <span className="sidebar-logo-nome">RAPTO</span>
      </div>

      <nav className="sidebar-nav">
        {MENU.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${paginaAtiva === item.id ? "ativo" : ""}`}
            onClick={() => onNavegar(item.id)}
          >
            <span className="sidebar-icone">{item.icone}</span>
            <span className="sidebar-label">{item.label}</span>
            {paginaAtiva === item.id && <span className="sidebar-indicador" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-versao">v1.0.0</span>
      </div>
    </aside>
  );
}
