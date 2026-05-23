import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";
import Inventario from "./Inventario";
import Cadastros from "./Cadastros";
import Fiscal from "./Fiscal";
import Rotas from "./Rotas";
import Configuracoes from "./Configuracoes";
import "./Layout.css";

export default function Layout({ usuario, onLogout }) {
  const [paginaAtiva, setPaginaAtiva] = useState("dashboard");

  const renderPagina = () => {
    switch (paginaAtiva) {
      case "dashboard":    return <Dashboard />;
      case "inventario":   return <Inventario onIrParaRotas={() => setPaginaAtiva("rotas")} />;
      case "cadastros":    return <Cadastros />;
      case "fiscal":       return <Fiscal />;
      case "rotas":        return <Rotas />;
      case "configuracoes":return <Configuracoes usuario={usuario} />;
      default:             return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar paginaAtiva={paginaAtiva} onNavegar={setPaginaAtiva} />
      <div className="layout-corpo">
        <Topbar usuario={usuario} onLogout={onLogout} paginaAtiva={paginaAtiva} />
        <main className="layout-main">
          {renderPagina()}
        </main>
      </div>
    </div>
  );
}
