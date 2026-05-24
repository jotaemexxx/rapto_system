import { useState } from "react";
import Modal from "./Modal";
import "./Dashboard.css";

const CARDS = [
  { label: "Entregas Realizadas", valor: 48, cor: "sucesso", icone: "✅", sub: "este mês" },
  { label: "Entregas Pendentes",  valor: 12, cor: "aviso",   icone: "📦", sub: "aguardando rota" },
  { label: "Em Trânsito",         valor: 5,  cor: "azul",    icone: "🚛", sub: "em andamento" },
  { label: "Ocorrências",         valor: 2,  cor: "perigo",  icone: "⚠️", sub: "requer atenção" },
];

const ENTREGAS_RECENTES = [
  { codigo: "RPT-001", destinatario: "Mercado Central",     status: "entregue", data: "23/05/2025", endereco: "Av. Calama, 1200 - Centro",        peso: "12 kg", motorista: "Carlos Silva" },
  { codigo: "RPT-002", destinatario: "Farmácia São Lucas",  status: "entregue", data: "22/05/2025", endereco: "Rua Tenreiro Aranha, 340 - Olaria", peso: "3 kg",  motorista: "Carlos Silva" },
  { codigo: "RPT-003", destinatario: "Construtora Nortão",  status: "transito", data: "23/05/2025", endereco: "Rua Industrial, 890",               peso: "80 kg", motorista: "João Mendes" },
  { codigo: "RPT-004", destinatario: "Escola Estadual RO",  status: "pendente", data: "24/05/2025", endereco: "Av. Jatuarana, 500 - Embratel",     peso: "5 kg",  motorista: "—" },
  { codigo: "RPT-005", destinatario: "Supermercado Araújo", status: "pendente", data: "24/05/2025", endereco: "Rua Cascalheira, 210",              peso: "40 kg", motorista: "—" },
];

const STATUS_LABEL = {
  entregue: { label: "Entregue",    cor: "sucesso" },
  transito: { label: "Em trânsito", cor: "azul"    },
  pendente: { label: "Pendente",    cor: "aviso"   },
};

export default function Dashboard() {
  const [selecionada, setSelecionada] = useState(null);

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
              <tr><th>Código</th><th>Destinatário</th><th>Status</th><th>Data</th></tr>
            </thead>
            <tbody>
              {ENTREGAS_RECENTES.map((e) => {
                const s = STATUS_LABEL[e.status];
                return (
                  <tr key={e.codigo} className="dash-row" onClick={() => setSelecionada(e)}>
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
              <div className="resumo-barra-wrapper"><div className="resumo-barra" style={{ width: "92%" }} /></div>
              <span className="resumo-valor">92%</span>
            </div>
            <div className="resumo-item">
              <span className="resumo-label">Rotas otimizadas</span>
              <div className="resumo-barra-wrapper"><div className="resumo-barra resumo-barra--azul" style={{ width: "78%" }} /></div>
              <span className="resumo-valor">78%</span>
            </div>
            <div className="resumo-item">
              <span className="resumo-label">Ocupação da frota</span>
              <div className="resumo-barra-wrapper"><div className="resumo-barra resumo-barra--aviso" style={{ width: "65%" }} /></div>
              <span className="resumo-valor">65%</span>
            </div>
          </div>
        </div>
      </div>

      {selecionada && (
        <Modal titulo="Detalhes da Entrega" onFechar={() => setSelecionada(null)}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.25rem" }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1rem", color: "var(--azul)", letterSpacing: "0.08em" }}>{selecionada.codigo}</span>
            <span className={`modal-badge modal-badge--${STATUS_LABEL[selecionada.status].cor}`}>{STATUS_LABEL[selecionada.status].label}</span>
          </div>
          <div className="modal-grid">
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Destinatário</label>
              <div className="modal-input-readonly">{selecionada.destinatario}</div>
            </div>
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Endereço</label>
              <div className="modal-input-readonly">{selecionada.endereco}</div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Peso</label>
              <div className="modal-input-readonly">{selecionada.peso}</div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Data prevista</label>
              <div className="modal-input-readonly">{selecionada.data}</div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Motorista</label>
              <div className="modal-input-readonly">{selecionada.motorista}</div>
            </div>
          </div>
          <div className="modal-acoes">
            <button className="btn-modal-secundario" onClick={() => setSelecionada(null)}>Fechar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
