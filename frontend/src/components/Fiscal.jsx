import { useState } from "react";
import Modal from "./Modal";
import "./Fiscal.css";

const NOTAS_INICIAL = [
  { id: 1, numero: "NF-001", emitente: "Rapto Transportadora", destinatario: "Mercado Central",     valor: 340.00,  data: "20/05/2025", status: "emitida",   descricao: "Serviço de transporte de alimentos" },
  { id: 2, numero: "NF-002", emitente: "Rapto Transportadora", destinatario: "Farmácia São Lucas",  valor: 120.00,  data: "21/05/2025", status: "emitida",   descricao: "Transporte de medicamentos" },
  { id: 3, numero: "NF-003", emitente: "Rapto Transportadora", destinatario: "Construtora Nortão",  valor: 980.00,  data: "22/05/2025", status: "pendente",  descricao: "Transporte de material de construção" },
  { id: 4, numero: "NF-004", emitente: "Rapto Transportadora", destinatario: "Escola Estadual RO",  valor: 210.00,  data: "22/05/2025", status: "emitida",   descricao: "Entrega de material escolar" },
  { id: 5, numero: "NF-005", emitente: "Rapto Transportadora", destinatario: "Supermercado Araújo", valor: 650.00,  data: "23/05/2025", status: "cancelada", descricao: "Transporte de bebidas - cancelado" },
];

const STATUS_NF = {
  emitida:   { label: "Emitida",   cor: "sucesso" },
  pendente:  { label: "Pendente",  cor: "aviso"   },
  cancelada: { label: "Cancelada", cor: "perigo"  },
};

function carregarNotas() {
  try {
    const salvo = localStorage.getItem("rapto_fiscal");
    return salvo ? JSON.parse(salvo) : NOTAS_INICIAL;
  } catch { return NOTAS_INICIAL; }
}

function salvarNotas(notas) {
  localStorage.setItem("rapto_fiscal", JSON.stringify(notas));
}

export default function Fiscal() {
  const [notas, setNotas]             = useState(carregarNotas);
  const [selecionada, setSelecionada] = useState(null);
  const [editando, setEditando]       = useState(false);
  const [form, setForm]               = useState({});
  const [salvo, setSalvo]             = useState(false);

  const abrirModal = (nota) => { setSelecionada(nota); setForm({ ...nota }); setEditando(false); setSalvo(false); };
  const fecharModal = () => { setSelecionada(null); setEditando(false); setSalvo(false); };

  const salvar = () => {
    const atualizadas = notas.map((n) => n.id === form.id ? { ...form, valor: Number(form.valor) } : n);
    setNotas(atualizadas);
    salvarNotas(atualizadas);
    setSelecionada({ ...form, valor: Number(form.valor) });
    setEditando(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  const emitidas  = notas.filter((n) => n.status === "emitida").length;
  const pendentes = notas.filter((n) => n.status === "pendente").length;
  const canceladas = notas.filter((n) => n.status === "cancelada").length;
  const total = notas.filter((n) => n.status === "emitida").reduce((a, n) => a + n.valor, 0);

  return (
    <div className="fiscal">
      <div className="fiscal-cards">
        <div className="fiscal-card">
          <span className="fiscal-card-label">Notas Emitidas</span>
          <span className="fiscal-card-valor">{emitidas}</span>
          <span className="fiscal-card-sub">este mês</span>
        </div>
        <div className="fiscal-card">
          <span className="fiscal-card-label">Valor Total</span>
          <span className="fiscal-card-valor">R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
          <span className="fiscal-card-sub">faturado</span>
        </div>
        <div className="fiscal-card">
          <span className="fiscal-card-label">Pendentes</span>
          <span className="fiscal-card-valor fiscal-card-valor--aviso">{pendentes}</span>
          <span className="fiscal-card-sub">aguardando</span>
        </div>
        <div className="fiscal-card">
          <span className="fiscal-card-label">Canceladas</span>
          <span className="fiscal-card-valor fiscal-card-valor--perigo">{canceladas}</span>
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
            <tr><th>Número</th><th>Emitente</th><th>Destinatário</th><th>Valor</th><th>Data</th><th>Status</th></tr>
          </thead>
          <tbody>
            {notas.map((n) => {
              const s = STATUS_NF[n.status];
              return (
                <tr key={n.id} className="nf-row" onClick={() => abrirModal(n)}>
                  <td><span className="nf-numero">{n.numero}</span></td>
                  <td className="nf-emitente">{n.emitente}</td>
                  <td>{n.destinatario}</td>
                  <td className="nf-valor">R$ {Number(n.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                  <td className="nf-data">{n.data}</td>
                  <td><span className={`nf-status status--${s.cor}`}>{s.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selecionada && (
        <Modal titulo={editando ? "Editar Nota Fiscal" : "Detalhes da Nota Fiscal"} onFechar={fecharModal}>
          {salvo && <div className="modal-salvo">Nota atualizada com sucesso!</div>}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.25rem" }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1rem", color: "var(--azul)", letterSpacing: "0.08em" }}>{selecionada.numero}</span>
            <span className={`modal-badge modal-badge--${STATUS_NF[selecionada.status].cor}`}>{STATUS_NF[selecionada.status].label}</span>
          </div>
          <div className="modal-grid">
            <div className="modal-field">
              <label className="modal-label">Emitente</label>
              <div className="modal-input-readonly">{selecionada.emitente}</div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Destinatário</label>
              {editando
                ? <input className="modal-input" value={form.destinatario} onChange={(e) => setForm({ ...form, destinatario: e.target.value })} />
                : <div className="modal-input-readonly">{selecionada.destinatario}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Valor (R$)</label>
              {editando
                ? <input className="modal-input" type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
                : <div className="modal-input-readonly">R$ {Number(selecionada.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Data</label>
              {editando
                ? <input className="modal-input" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
                : <div className="modal-input-readonly">{selecionada.data}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Status</label>
              {editando
                ? <select className="modal-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="emitida">Emitida</option>
                    <option value="pendente">Pendente</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                : <div className="modal-input-readonly">{STATUS_NF[selecionada.status].label}</div>}
            </div>
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Descrição</label>
              {editando
                ? <input className="modal-input" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
                : <div className="modal-input-readonly">{selecionada.descricao}</div>}
            </div>
          </div>
          <div className="modal-acoes">
            {editando ? (
              <>
                <button className="btn-modal-secundario" onClick={() => setEditando(false)}>Cancelar</button>
                <button className="btn-modal-primario" onClick={salvar}>Salvar</button>
              </>
            ) : (
              <>
                <button className="btn-modal-secundario" onClick={fecharModal}>Fechar</button>
                <button className="btn-modal-primario" onClick={() => setEditando(true)}>Editar</button>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
