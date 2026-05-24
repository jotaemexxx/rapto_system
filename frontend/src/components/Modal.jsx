import { useEffect } from "react";
import "./Modal.css";

export default function Modal({ titulo, onFechar, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onFechar(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFechar]);

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-titulo">{titulo}</h2>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>
        <div className="modal-corpo">{children}</div>
      </div>
    </div>
  );
}
