import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaPlus, FaTasks, FaHome } from "react-icons/fa";

export default function NavAdmin() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0d1b2a", padding: "1rem" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span
          className="navbar-brand mb-0 h1 text-white fw-bold fs-5"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/dashboard")}
        >
          Panel de Administración INKA
        </span>

        <div className="d-flex flex-wrap gap-2">
          <Button
            variant="primary"
            className="fw-semibold d-flex align-items-center"
            onClick={() => navigate("/admin/dashboard")}
          >
            <FaHome className="me-2" />
            Inicio
          </Button>

          <Button
            variant="info"
            className="text-white fw-semibold d-flex align-items-center"
            onClick={() => navigate("/admin/crud")}
          >
            <FaTasks className="me-2" />
            Gestionar Vulnerabilidades
          </Button>

          <Button
            variant="success"
            className="fw-semibold d-flex align-items-center"
            onClick={() => navigate("/admin/crear")}
          >
            <FaPlus className="me-2" />
            Crear Vulnerabilidad
          </Button>

          <Button
            variant="outline-light"
            className="fw-semibold d-flex align-items-center"
            onClick={cerrarSesion}
          >
            <FaSignOutAlt className="me-2" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </nav>
  );
}
