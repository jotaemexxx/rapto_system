import "./Dashboard.css";

const CARDS = [
  { label: "Entregas Realizadas", valor: 48, cor: "sucesso",  icone: "✅", sub: "este mês" },
  { label: "Entregas Pendentes",  valor: 12, cor: "aviso",    icone: "📦", sub: "aguardando rota" },
  { label: "Em Trânsito",         valor: 5,  cor: "azul",     icone: "🚛", sub: "em andamento" },
  { label: "Ocorrências",         valor: 2,  cor: "perigo",   icone: "⚠️", sub: "requer atenção" },
];

const ENTREGAS_RECENTES = [
  { codigo: "RPT-001", destinatario: "Mercado Central",    status: "entregue",  data: "23/05/2025" },
  { codigo: "RPT-002", destinatario: "Farmácia São Lucas", status: "entregue",  data: "22/05/2025" },
  { codigo: "RPT-003", destinatario: "Construtora Nortão", status: "transito",  data: "23/05/2025" },
  { codigo: "RPT-004", destinatario: "Escola Estadual RO", status: "pendente",  data: "24/05/2025" },
  { codigo: "RPT-005", destinatario: "Supermercado Araújo",status: "pendente",  data: "24/05/2025" },
];

const STATUS_LABEL = {
  entregue: { label: "Entregue",   cor: "sucesso" },
  transito: { label: "Em trânsito",cor: "azul"    },
  pendente: { label: "Pendente",   cor: "aviso"   },
};

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dash-cards">
        {CARDS.map((c, i) => (
          <div key={i} className={`dash-card dash-card--${c.cor}`}>
            <div className="dash-card-icone">{c.icone}</div>
            <div className="dash-card-info">
              <span className="dash-card-valor">{c.valor}</span>
              <span className="dash-card-label">{c.label}</span>
              <span className="dash-card-sub">{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-corpo">
        <div className="dash-tabela-wrapper">
          <div className="dash-secao-header">
            <h2 className="dash-secao-titulo">Entregas Recentes</h2>
          </div>
          <table className="dash-tabela">
            <thead>
              <tr>
                <th>Código</th>
                <th>Destinatário</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {ENTREGAS_RECENTES.map((e) => {
                const s = STATUS_LABEL[e.status];
                return (
                  <tr key={e.codigo}>
                    <td><span className="tabela-codigo">{e.codigo}</span></td>
                    <td>{e.destinatario}</td>
                    <td><span className={`tabela-status status--${s.cor}`}>{s.label}</span></td>
                    <td className="tabela-data">{e.data}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="dash-resumo">
          <div className="dash-secao-header">
            <h2 className="dash-secao-titulo">Resumo do Mês</h2>
          </div>
          <div className="resumo-lista">
            <div className="resumo-item">
              <span className="resumo-label">Taxa de entrega</span>
              <div className="resumo-barra-wrapper">
                <div className="resumo-barra" style={{ width: "92%" }} />
              </div>
              <span className="resumo-valor">92%</span>
            </div>
            <div className="resumo-item">
              <span className="resumo-label">Rotas otimizadas</span>
              <div className="resumo-barra-wrapper">
                <div className="resumo-barra resumo-barra--azul" style={{ width: "78%" }} />
              </div>
              <span className="resumo-valor">78%</span>
            </div>
            <div className="resumo-item">
              <span className="resumo-label">Ocupação da frota</span>
              <div className="resumo-barra-wrapper">
                <div className="resumo-barra resumo-barra--aviso" style={{ width: "65%" }} />
              </div>
              <span className="resumo-valor">65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
