import "./Topbar.css";

const TITULOS = {
  dashboard:     "Dashboard",
  inventario:    "Inventário",
  cadastros:     "Cadastros",
  fiscal:        "Fiscal",
  rotas:         "Rotas",
  configuracoes: "Configurações",
};

export default function Topbar({ usuario, onLogout, paginaAtiva }) {
  return (
    <header className="topbar">
      <div className="topbar-titulo">{TITULOS[paginaAtiva] || "Dashboard"}</div>

      <div className="topbar-direita">
        <div className="topbar-notif" title="Notificações">
          🔔
          <span className="notif-badge">3</span>
        </div>

        <div className="topbar-usuario">
          <div className="usuario-avatar">
            {usuario.charAt(0).toUpperCase()}
          </div>
          <div className="usuario-info">
            <span className="usuario-nome">{usuario}</span>
            <span className="usuario-cargo">Administrador</span>
          </div>
          <button className="btn-logout" onClick={onLogout} title="Sair">
            ⏻
          </button>
        </div>
      </div>
    </header>
  );
}
