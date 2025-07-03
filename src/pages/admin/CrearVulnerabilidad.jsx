import React from "react";
import { agregarVulnerabilidad } from "../../services/vulnerabilidadesService";
import { useNavigate } from "react-router-dom";
import FormularioVulnerabilidad from "../../components/FormularioVulnerabilidad";

export default function CrearVulnerabilidad() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await agregarVulnerabilidad(data);
    navigate("/admin/crud");
  };

  return (
    <div className="container mt-4">
      <h2>Nueva Vulnerabilidad</h2>
      <FormularioVulnerabilidad onSubmit={handleSubmit} />
    </div>
  );
}
