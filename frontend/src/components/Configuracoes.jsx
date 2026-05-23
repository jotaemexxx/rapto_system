import "./Configuracoes.css";

export default function Configuracoes({ usuario }) {
  return (
    <div className="config">
      <div className="config-secao">
        <h2 className="config-titulo">Conta</h2>
        <div className="config-card">
          <div className="config-row">
            <span className="config-label">Usuário</span>
            <span className="config-valor">{usuario}</span>
          </div>
          <div className="config-row">
            <span className="config-label">Perfil</span>
            <span className="config-valor">Administrador</span>
          </div>
          <div className="config-row">
            <span className="config-label">Versão do sistema</span>
            <span className="config-valor">v1.0.0</span>
          </div>
        </div>
      </div>

      <div className="config-secao">
        <h2 className="config-titulo">Operação</h2>
        <div className="config-card">
          <div className="config-row">
            <span className="config-label">Base de operações</span>
            <span className="config-valor">Porto Velho — RO</span>
          </div>
          <div className="config-row">
            <span className="config-label">Algoritmo de roteamento</span>
            <span className="config-valor">Vizinho Mais Próximo (TSP)</span>
          </div>
          <div className="config-row">
            <span className="config-label">Mapa</span>
            <span className="config-valor">OpenStreetMap + OSRM</span>
          </div>
          <div className="config-row">
            <span className="config-label">Limite de paradas por rota</span>
            <span className="config-valor">20 pontos</span>
          </div>
        </div>
      </div>

      <div className="config-secao">
        <h2 className="config-titulo">Sistema</h2>
        <div className="config-card">
          <div className="config-row">
            <span className="config-label">Backend</span>
            <span className="config-valor config-ok">Conectado</span>
          </div>
          <div className="config-row">
            <span className="config-label">API de Rotas (OSRM)</span>
            <span className="config-valor config-ok">Online</span>
          </div>
          <div className="config-row">
            <span className="config-label">Ambiente</span>
            <span className="config-valor">Desenvolvimento</span>
          </div>
        </div>
      </div>
    </div>
  );
}
