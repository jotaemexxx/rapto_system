import "./Fiscal.css";

const NOTAS = [
  { numero: "NF-001", emitente: "Rapto Transportadora", destinatario: "Mercado Central",    valor: "R$ 340,00",  data: "20/05/2025", status: "emitida"   },
  { numero: "NF-002", emitente: "Rapto Transportadora", destinatario: "Farmácia São Lucas",  valor: "R$ 120,00",  data: "21/05/2025", status: "emitida"   },
  { numero: "NF-003", emitente: "Rapto Transportadora", destinatario: "Construtora Nortão",  valor: "R$ 980,00",  data: "22/05/2025", status: "pendente"  },
  { numero: "NF-004", emitente: "Rapto Transportadora", destinatario: "Escola Estadual RO",  valor: "R$ 210,00",  data: "22/05/2025", status: "emitida"   },
  { numero: "NF-005", emitente: "Rapto Transportadora", destinatario: "Supermercado Araújo", valor: "R$ 650,00",  data: "23/05/2025", status: "cancelada" },
];

const STATUS_NF = {
  emitida:   { label: "Emitida",   cor: "sucesso" },
  pendente:  { label: "Pendente",  cor: "aviso"   },
  cancelada: { label: "Cancelada", cor: "perigo"  },
};

export default function Fiscal() {
  return (
    <div className="fiscal">
      <div className="fiscal-cards">
        <div className="fiscal-card">
          <span className="fiscal-card-label">Notas Emitidas</span>
          <span className="fiscal-card-valor">4</span>
          <span className="fiscal-card-sub">este mês</span>
        </div>
        <div className="fiscal-card">
          <span className="fiscal-card-label">Valor Total</span>
          <span className="fiscal-card-valor">R$ 2.300</span>
          <span className="fiscal-card-sub">faturado</span>
        </div>
        <div className="fiscal-card">
          <span className="fiscal-card-label">Pendentes</span>
          <span className="fiscal-card-valor fiscal-card-valor--aviso">1</span>
          <span className="fiscal-card-sub">aguardando</span>
        </div>
        <div className="fiscal-card">
          <span className="fiscal-card-label">Canceladas</span>
          <span className="fiscal-card-valor fiscal-card-valor--perigo">1</span>
          <span className="fiscal-card-sub">este mês</span>
        </div>
      </div>

      <div className="fiscal-tabela-wrapper">
        <div className="fiscal-tabela-header">
          <h2 className="fiscal-titulo">Notas Fiscais</h2>
          <button className="btn-emitir">+ Emitir NF</button>
        </div>
        <table className="fiscal-tabela">
          <thead>
            <tr>
              <th>Número</th>
              <th>Emitente</th>
              <th>Destinatário</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {NOTAS.map((n) => {
              const s = STATUS_NF[n.status];
              return (
                <tr key={n.numero}>
                  <td><span className="nf-numero">{n.numero}</span></td>
                  <td className="nf-emitente">{n.emitente}</td>
                  <td>{n.destinatario}</td>
                  <td className="nf-valor">{n.valor}</td>
                  <td className="nf-data">{n.data}</td>
                  <td><span className={`nf-status status--${s.cor}`}>{s.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
