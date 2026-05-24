import { useState, useEffect } from "react";
import { ESTOQUE } from "../data/estoque";
import Modal from "./Modal";
import "./Inventario.css";

const STATUS_LABEL = {
  aguardando: { label: "Aguardando", cor: "aviso"   },
  transito:   { label: "Em trânsito", cor: "azul"   },
  entregue:   { label: "Entregue",   cor: "sucesso" },
};

function carregarPacotes() {
  try {
    const salvo = localStorage.getItem("rapto_inventario");
    return salvo ? JSON.parse(salvo) : ESTOQUE;
  } catch { return ESTOQUE; }
}

function salvarPacotes(pacotes) {
  localStorage.setItem("rapto_inventario", JSON.stringify(pacotes));
}

export default function Inventario({ onIrParaRotas }) {
  const [pacotes, setPacotes]         = useState(carregarPacotes);
  const [busca, setBusca]             = useState("");
  const [selecionado, setSelecionado] = useState(null);
  const [editando, setEditando]       = useState(false);
  const [form, setForm]               = useState({});
  const [salvo, setSalvo]             = useState(false);

  const filtrados = pacotes.filter(
    (item) =>
      item.destinatario.toLowerCase().includes(busca.toLowerCase()) ||
      item.bairro.toLowerCase().includes(busca.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModal = (item) => {
    setSelecionado(item);
    setForm({ ...item });
    setEditando(false);
    setSalvo(false);
  };

  const fecharModal = () => { setSelecionado(null); setEditando(false); setSalvo(false); };

  const salvar = () => {
    const atualizados = pacotes.map((p) => p.id === form.id ? { ...form, peso: Number(form.peso) } : p);
    setPacotes(atualizados);
    salvarPacotes(atualizados);
    setSelecionado({ ...form, peso: Number(form.peso) });
    setEditando(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  const s = selecionado ? (STATUS_LABEL[selecionado.status] || STATUS_LABEL.aguardando) : null;

  return (
    <div className="inventario">
      <div className="inventario-toolbar">
        <input className="inventario-busca" type="text" placeholder="🔍 Buscar por destinatário, bairro ou código..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        <button className="btn-nova-rota" onClick={onIrParaRotas}>Calcular Rota</button>
      </div>

      <div className="inventario-tabela-wrapper">
        <table className="inventario-tabela">
          <thead>
            <tr><th>Código</th><th>Destinatário</th><th>Endereço</th><th>Bairro</th><th>Peso</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtrados.map((item) => {
              const st = STATUS_LABEL[item.status] || STATUS_LABEL.aguardando;
              return (
                <tr key={item.id} className="inv-row" onClick={() => abrirModal(item)}>
                  <td><span className="inv-codigo">{item.codigo}</span></td>
                  <td className="inv-destinatario">{item.destinatario}</td>
                  <td className="inv-endereco">{item.endereco}</td>
                  <td>{item.bairro}</td>
                  <td>{item.peso} kg</td>
                  <td><span className={`inv-status status--${st.cor}`}>{st.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selecionado && (
        <Modal titulo={editando ? "Editar Pacote" : "Detalhes do Pacote"} onFechar={fecharModal}>
          {salvo && <div className="modal-salvo">Dados atualizados com sucesso!</div>}

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.25rem" }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1rem", color: "var(--azul)", letterSpacing: "0.08em" }}>{selecionado.codigo}</span>
            <span className={`modal-badge modal-badge--${s.cor}`}>{s.label}</span>
          </div>

          <div className="modal-grid">
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Destinatário</label>
              {editando
                ? <input className="modal-input" value={form.destinatario} onChange={(e) => setForm({ ...form, destinatario: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.destinatario}</div>}
            </div>
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Endereço</label>
              {editando
                ? <input className="modal-input" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.endereco}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Bairro</label>
              {editando
                ? <input className="modal-input" value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.bairro}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Peso (kg)</label>
              {editando
                ? <input className="modal-input" type="number" value={form.peso} onChange={(e) => setForm({ ...form, peso: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.peso} kg</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Status</label>
              {editando
                ? <select className="modal-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="aguardando">Aguardando</option>
                    <option value="transito">Em trânsito</option>
                    <option value="entregue">Entregue</option>
                  </select>
                : <div className="modal-input-readonly">{s.label}</div>}
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
