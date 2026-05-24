import { useState, useEffect } from "react";
import Modal from "./Modal";
import "./Cadastros.css";

const CLIENTES_INICIAL = [
  { id: 1, nome: "Mercado Central Ltda",    cnpj: "12.345.678/0001-90", cidade: "Porto Velho", contato: "(69) 99801-1234", tipo: "Empresa",     email: "contato@mercadocentral.com.br",  endereco: "Av. Calama, 1200 - Centro" },
  { id: 2, nome: "Farmácia São Lucas",       cnpj: "23.456.789/0001-01", cidade: "Porto Velho", contato: "(69) 99802-2345", tipo: "Empresa",     email: "farmaciasaolucas@email.com",      endereco: "Rua Tenreiro Aranha, 340" },
  { id: 3, nome: "Construtora Nortão S/A",   cnpj: "34.567.890/0001-12", cidade: "Porto Velho", contato: "(69) 99803-3456", tipo: "Empresa",     email: "nortao@construtora.com.br",       endereco: "Rua Industrial, 890" },
  { id: 4, nome: "Escola Estadual RO",       cnpj: "45.678.901/0001-23", cidade: "Porto Velho", contato: "(69) 99804-4567", tipo: "Instituição", email: "escola.ro@seed.ro.gov.br",        endereco: "Av. Jatuarana, 500" },
  { id: 5, nome: "Supermercado Araújo",      cnpj: "56.789.012/0001-34", cidade: "Porto Velho", contato: "(69) 99805-5678", tipo: "Empresa",     email: "araujo@supermercado.com",         endereco: "Rua Cascalheira, 210" },
  { id: 6, nome: "Clínica VidaSaúde",        cnpj: "67.890.123/0001-45", cidade: "Porto Velho", contato: "(69) 99806-6789", tipo: "Clínica",     email: "clinica@vidasaude.com.br",        endereco: "Av. Amazonas, 780" },
  { id: 7, nome: "Restaurante Sabor AM",     cnpj: "78.901.234/0001-56", cidade: "Porto Velho", contato: "(69) 99807-7890", tipo: "Empresa",     email: "saboram@restaurante.com",         endereco: "Rua Arigolândia, 55" },
  { id: 8, nome: "Auto Peças Norte",         cnpj: "89.012.345/0001-67", cidade: "Porto Velho", contato: "(69) 99808-8901", tipo: "Empresa",     email: "autopecas@norte.com.br",          endereco: "Av. Laginha, 430" },
];

function carregarClientes() {
  try {
    const salvo = localStorage.getItem("rapto_clientes");
    return salvo ? JSON.parse(salvo) : CLIENTES_INICIAL;
  } catch { return CLIENTES_INICIAL; }
}

function salvarClientes(clientes) {
  localStorage.setItem("rapto_clientes", JSON.stringify(clientes));
}

export default function Cadastros() {
  const [clientes, setClientes]     = useState(carregarClientes);
  const [busca, setBusca]           = useState("");
  const [selecionado, setSelecionado] = useState(null);
  const [editando, setEditando]     = useState(false);
  const [form, setForm]             = useState({});
  const [salvo, setSalvo]           = useState(false);
  const [novoModal, setNovoModal]   = useState(false);
  const [novoForm, setNovoForm]     = useState({ nome: "", cnpj: "", cidade: "Porto Velho", contato: "", tipo: "Empresa", email: "", endereco: "" });

  const filtrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.cnpj.includes(busca) ||
      c.tipo.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModal = (cliente) => {
    setSelecionado(cliente);
    setForm({ ...cliente });
    setEditando(false);
    setSalvo(false);
  };

  const fecharModal = () => { setSelecionado(null); setEditando(false); setSalvo(false); };

  const salvar = () => {
    const atualizados = clientes.map((c) => c.id === form.id ? form : c);
    setClientes(atualizados);
    salvarClientes(atualizados);
    setSelecionado(form);
    setEditando(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  const excluir = () => {
    const atualizados = clientes.filter((c) => c.id !== selecionado.id);
    setClientes(atualizados);
    salvarClientes(atualizados);
    fecharModal();
  };

  const adicionarCliente = () => {
    const novo = { ...novoForm, id: Date.now() };
    const atualizados = [...clientes, novo];
    setClientes(atualizados);
    salvarClientes(atualizados);
    setNovoModal(false);
    setNovoForm({ nome: "", cnpj: "", cidade: "Porto Velho", contato: "", tipo: "Empresa", email: "", endereco: "" });
  };

  return (
    <div className="cadastros">
      <div className="cadastros-toolbar">
        <input className="cadastros-busca" type="text" placeholder="🔍 Buscar cliente ou empresa..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        <button className="btn-novo-cadastro" onClick={() => setNovoModal(true)}>+ Novo Cadastro</button>
      </div>

      <div className="cadastros-tabela-wrapper">
        <table className="cadastros-tabela">
          <thead>
            <tr>
              <th>#</th><th>Nome / Razão Social</th><th>CNPJ</th><th>Cidade</th><th>Contato</th><th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c) => (
              <tr key={c.id} className="cad-row" onClick={() => abrirModal(c)}>
                <td className="cad-id">{c.id}</td>
                <td className="cad-nome">{c.nome}</td>
                <td className="cad-cnpj">{c.cnpj}</td>
                <td>{c.cidade}</td>
                <td>{c.contato}</td>
                <td><span className="cad-tipo">{c.tipo}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal detalhes/edição */}
      {selecionado && (
        <Modal titulo={editando ? "Editar Cadastro" : "Detalhes do Cadastro"} onFechar={fecharModal}>
          {salvo && <div className="modal-salvo">Dados salvos com sucesso!</div>}
          <div className="modal-grid">
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Nome / Razão Social</label>
              {editando
                ? <input className="modal-input" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.nome}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">CNPJ</label>
              {editando
                ? <input className="modal-input" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.cnpj}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Tipo</label>
              {editando
                ? <select className="modal-input" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                    <option>Empresa</option><option>Clínica</option><option>Instituição</option>
                  </select>
                : <div className="modal-input-readonly">{selecionado.tipo}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Contato</label>
              {editando
                ? <input className="modal-input" value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.contato}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">E-mail</label>
              {editando
                ? <input className="modal-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.email}</div>}
            </div>
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Endereço</label>
              {editando
                ? <input className="modal-input" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.endereco}</div>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Cidade</label>
              {editando
                ? <input className="modal-input" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
                : <div className="modal-input-readonly">{selecionado.cidade}</div>}
            </div>
          </div>
          <div className="modal-acoes">
            {editando ? (
              <>
                <button className="btn-modal-perigo" onClick={excluir}>Excluir</button>
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

      {/* Modal novo cadastro */}
      {novoModal && (
        <Modal titulo="Novo Cadastro" onFechar={() => setNovoModal(false)}>
          <div className="modal-grid">
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Nome / Razão Social</label>
              <input className="modal-input" value={novoForm.nome} onChange={(e) => setNovoForm({ ...novoForm, nome: e.target.value })} placeholder="Ex: Empresa XYZ Ltda" />
            </div>
            <div className="modal-field">
              <label className="modal-label">CNPJ</label>
              <input className="modal-input" value={novoForm.cnpj} onChange={(e) => setNovoForm({ ...novoForm, cnpj: e.target.value })} placeholder="00.000.000/0001-00" />
            </div>
            <div className="modal-field">
              <label className="modal-label">Tipo</label>
              <select className="modal-input" value={novoForm.tipo} onChange={(e) => setNovoForm({ ...novoForm, tipo: e.target.value })}>
                <option>Empresa</option><option>Clínica</option><option>Instituição</option>
              </select>
            </div>
            <div className="modal-field">
              <label className="modal-label">Contato</label>
              <input className="modal-input" value={novoForm.contato} onChange={(e) => setNovoForm({ ...novoForm, contato: e.target.value })} placeholder="(69) 99999-9999" />
            </div>
            <div className="modal-field">
              <label className="modal-label">E-mail</label>
              <input className="modal-input" value={novoForm.email} onChange={(e) => setNovoForm({ ...novoForm, email: e.target.value })} placeholder="email@empresa.com" />
            </div>
            <div className="modal-field" style={{ gridColumn: "1 / -1" }}>
              <label className="modal-label">Endereço</label>
              <input className="modal-input" value={novoForm.endereco} onChange={(e) => setNovoForm({ ...novoForm, endereco: e.target.value })} placeholder="Rua, número, bairro" />
            </div>
            <div className="modal-field">
              <label className="modal-label">Cidade</label>
              <input className="modal-input" value={novoForm.cidade} onChange={(e) => setNovoForm({ ...novoForm, cidade: e.target.value })} />
            </div>
          </div>
          <div className="modal-acoes">
            <button className="btn-modal-secundario" onClick={() => setNovoModal(false)}>Cancelar</button>
            <button className="btn-modal-primario" onClick={adicionarCliente} disabled={!novoForm.nome}>Cadastrar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
