import { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png";

const USUARIO = "rapto_admin";
const SENHA   = "rapto123*";

export default function Login({ onLogin }) {
  const [user, setUser]   = useState("");
  const [pass, setPass]   = useState("");
  const [erro, setErro]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    setTimeout(() => {
      if (user === USUARIO && pass === SENHA) {
        onLogin(user);
      } else {
        setErro("Usuário ou senha incorretos.");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />

      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="Rapto" className="login-logo-img" />
          <span className="login-logo-nome">RAPTO</span>
        </div>

        <div className="login-header">
          <h1 className="login-titulo">Bem-vindo de volta</h1>
          <p className="login-sub">Acesse o painel de gerenciamento</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Usuário</label>
            <input
              className="login-input"
              type="text"
              placeholder="Digite seu usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label className="login-label">Senha</label>
            <input
              className="login-input"
              type="password"
              placeholder="Digite sua senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {erro && <div className="login-erro">{erro}</div>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <span className="login-spinner" /> : "Entrar"}
          </button>
        </form>

        <p className="login-footer">© 2025 Rapto Transportadora</p>
      </div>
    </div>
  );
}
