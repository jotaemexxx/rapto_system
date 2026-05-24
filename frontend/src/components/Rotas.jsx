import { useState } from "react";
import { ESTOQUE } from "../data/estoque";
import MapaRotas from "./MapaRotas";
import "./Rotas.css";

export default function Rotas() {
    const [selecionados, setSelecionados] = useState([]);
    const [busca, setBusca] = useState("");
    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [etapa, setEtapa] = useState("selecao"); // "selecao" | "mapa"

    const filtrados = ESTOQUE.filter(
        (item) =>
            item.destinatario.toLowerCase().includes(busca.toLowerCase()) ||
            item.bairro.toLowerCase().includes(busca.toLowerCase()) ||
            item.codigo.toLowerCase().includes(busca.toLowerCase())
    );

    const toggleSelecao = (item) => {
        setSelecionados((prev) =>
            prev.find((s) => s.id === item.id)
                ? prev.filter((s) => s.id !== item.id)
                : prev.length >= 20 ? prev : [...prev, item]
        );
        setResultado(null);
    };

    const selecionado = (id) => selecionados.some((s) => s.id === id);
    const pesoTotal = selecionados.reduce((acc, s) => acc + s.peso, 0);

    const otimizarRota = async () => {
        if (selecionados.length < 2) { setErro("Selecione ao menos 2 pacotes."); return; }
        setLoading(true);
        setErro(null);
        try {
            const pontos = selecionados.map((s) => ({ id: s.id, nome: s.destinatario, latitude: s.latitude, longitude: s.longitude }));
            const response = await fetch("https://rapto-api.onrender.com/api/Rota/otimizar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pontos),
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            setResultado(data);
            setEtapa("mapa");
        } catch (e) {
            setErro(`Erro: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (etapa === "mapa" && resultado) {
        return (
            <div className="rotas-mapa-wrapper">
                <div className="rotas-mapa-topbar">
                    <button className="btn-voltar-selecao" onClick={() => setEtapa("selecao")}>
                        ← Voltar à seleção
                    </button>
                    <div className="rotas-mapa-info">
                        <span className="rotas-dist">Distância total: <strong>{resultado.distanciaTotalKm} km</strong></span>
                        <span className="rotas-pacotes">{selecionados.length} pacotes na rota</span>
                    </div>
                </div>
                <MapaRotas pontos={selecionados.map(s => ({ id: s.id, nome: s.destinatario, latitude: s.latitude, longitude: s.longitude }))} resultado={resultado} />
            </div>
        );
    }

    return (
        <div className="rotas">
            <div className="rotas-corpo">
                <div className="rotas-lista-wrapper">
                    <div className="rotas-busca-wrapper">
                        <input
                            className="rotas-busca"
                            type="text"
                            placeholder="🔍 Buscar pacote..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    <div className="rotas-lista">
                        {filtrados.map((item) => (
                            <div
                                key={item.id}
                                className={`rotas-card ${selecionado(item.id) ? "selecionado" : ""}`}
                                onClick={() => toggleSelecao(item)}
                            >
                                <div className="rcard-check">{selecionado(item.id) ? "✓" : ""}</div>
                                <div className="rcard-info">
                                    <div className="rcard-top">
                                        <span className="rcard-codigo">{item.codigo}</span>
                                        <span className="rcard-peso">{item.peso} kg</span>
                                    </div>
                                    <span className="rcard-destinatario">{item.destinatario}</span>
                                    <span className="rcard-endereco">📍 {item.endereco}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rotas-painel">
                    <div className="rpainel-resumo">
                        <h2 className="rpainel-titulo">Resumo da Rota</h2>
                        <div className="rpainel-stats">
                            <div className="rpainel-stat">
                                <span className="rstat-valor">{selecionados.length}</span>
                                <span className="rstat-label">pacotes</span>
                            </div>
                            <div className="rpainel-divider" />
                            <div className="rpainel-stat">
                                <span className="rstat-valor">{pesoTotal}</span>
                                <span className="rstat-label">kg total</span>
                            </div>
                        </div>
                    </div>

                    {selecionados.length > 0 && (
                        <ul className="rpainel-lista">
                            {selecionados.map((s) => (
                                <li key={s.id} className="rpainel-item">
                                    <div className="rpainel-item-info">
                                        <span className="rpainel-codigo">{s.codigo}</span>
                                        <span className="rpainel-cliente">{s.destinatario}</span>
                                        <span className="rpainel-end">{s.endereco}</span>
                                    </div>
                                    <button className="rpainel-remover" onClick={(e) => { e.stopPropagation(); toggleSelecao(s); }}>✕</button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {erro && <div className="rotas-erro">{erro}</div>}

                    {selecionados.length < 2 && (
                        <p className="rpainel-aviso">Selecione ao menos 2 pacotes para calcular a rota.</p>
                    )}

                    <button className="btn-calcular" disabled={selecionados.length < 2 || loading} onClick={otimizarRota}>
                        {loading ? <span className="btn-spinner" /> : "Calcular Rota"}
                    </button>
                </div>
            </div>
        </div>
    );
}