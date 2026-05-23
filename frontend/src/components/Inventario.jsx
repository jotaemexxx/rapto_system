import { useState } from "react";
import { ESTOQUE } from "../data/estoque";
import "./Inventario.css";

const STATUS_LABEL = {
  aguardando: { label: "Aguardando", cor: "aviso" },
  transito:   { label: "Em trânsito", cor: "azul" },
  entregue:   { label: "Entregue",   cor: "sucesso" },
};

export default function Inventario({ onIrParaRotas }) {
  const [busca, setBusca] = useState("");

  const filtrados = ESTOQUE.filter(
    (item) =>
      item.destinatario.toLowerCase().includes(busca.toLowerCase()) ||
      item.bairro.toLowerCase().includes(busca.toLowerCase()) ||
      item.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="inventario">
      <div className="inventario-toolbar">
        <input
          className="inventario-busca"
          type="text"
          placeholder="🔍 Buscar por destinatário, bairro ou código..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className="btn-nova-rota" onClick={onIrParaRotas}>
          Calcular Rota
        </button>
      </div>

      <div className="inventario-tabela-wrapper">
        <table className="inventario-tabela">
          <thead>
            <tr>
              <th>Código</th>
              <th>Destinatário</th>
              <th>Endereço</th>
              <th>Bairro</th>
              <th>Peso</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((item) => {
              const s = STATUS_LABEL[item.status] || STATUS_LABEL.aguardando;
              return (
                <tr key={item.id}>
                  <td><span className="inv-codigo">{item.codigo}</span></td>
                  <td className="inv-destinatario">{item.destinatario}</td>
                  <td className="inv-endereco">{item.endereco}</td>
                  <td>{item.bairro}</td>
                  <td>{item.peso} kg</td>
                  <td><span className={`inv-status status--${s.cor}`}>{s.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
