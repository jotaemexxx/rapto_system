import "./Cadastros.css";

const CLIENTES = [
  { id: 1, nome: "Mercado Central Ltda",    cnpj: "12.345.678/0001-90", cidade: "Porto Velho", contato: "(69) 99801-1234", tipo: "Empresa" },
  { id: 2, nome: "Farmácia São Lucas",       cnpj: "23.456.789/0001-01", cidade: "Porto Velho", contato: "(69) 99802-2345", tipo: "Empresa" },
  { id: 3, nome: "Construtora Nortão S/A",   cnpj: "34.567.890/0001-12", cidade: "Porto Velho", contato: "(69) 99803-3456", tipo: "Empresa" },
  { id: 4, nome: "Escola Estadual RO",       cnpj: "45.678.901/0001-23", cidade: "Porto Velho", contato: "(69) 99804-4567", tipo: "Instituição" },
  { id: 5, nome: "Supermercado Araújo",      cnpj: "56.789.012/0001-34", cidade: "Porto Velho", contato: "(69) 99805-5678", tipo: "Empresa" },
  { id: 6, nome: "Clínica VidaSaúde",        cnpj: "67.890.123/0001-45", cidade: "Porto Velho", contato: "(69) 99806-6789", tipo: "Clínica" },
  { id: 7, nome: "Restaurante Sabor AM",     cnpj: "78.901.234/0001-56", cidade: "Porto Velho", contato: "(69) 99807-7890", tipo: "Empresa" },
  { id: 8, nome: "Auto Peças Norte",         cnpj: "89.012.345/0001-67", cidade: "Porto Velho", contato: "(69) 99808-8901", tipo: "Empresa" },
];

export default function Cadastros() {
  return (
    <div className="cadastros">
      <div className="cadastros-toolbar">
        <input className="cadastros-busca" type="text" placeholder="🔍 Buscar cliente ou empresa..." />
        <button className="btn-novo-cadastro">+ Novo Cadastro</button>
      </div>

      <div className="cadastros-tabela-wrapper">
        <table className="cadastros-tabela">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome / Razão Social</th>
              <th>CNPJ</th>
              <th>Cidade</th>
              <th>Contato</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {CLIENTES.map((c) => (
              <tr key={c.id}>
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
    </div>
  );
}
