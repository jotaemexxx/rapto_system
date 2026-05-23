import { useState } from "react";
import Login from "./components/Login";
import Layout from "./components/Layout";

function App() {
    const [logado, setLogado] = useState(false);
    const [usuario, setUsuario] = useState("");

    const handleLogin = (user) => {
        setUsuario(user);
        setLogado(true);
    };

    const handleLogout = () => {
        setLogado(false);
        setUsuario("");
    };

    if (!logado) return <Login onLogin={handleLogin} />;
    return <Layout usuario={usuario} onLogout={handleLogout} />;
}

export default App;