// src/components/layout/NavCliente.jsx
import { Button } from "react-bootstrap";
import { FaSignOutAlt /* ícono salida */ } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavCliente() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg" style={{ background:"#0d1b2a", padding:"1rem" }}>
      <span
        className="navbar-brand text-white fw-bold"
        style={{ cursor:"pointer" }}
        onClick={() => navigate("/cliente/dashboard")}
      >
        INKA • Seguridad Cibernética
      </span>

      <div className="ms-auto">
        <Button
          variant="outline-light"
          className="d-flex align-items-center fw-semibold"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <FaSignOutAlt className="me-2" /> Cerrar sesión
        </Button>
      </div>
    </nav>
  );
}
