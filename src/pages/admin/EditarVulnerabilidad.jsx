import React, { useEffect, useState } from "react";
import { obtenerUnaVulnerabilidad, actualizarVulnerabilidad } from "../../services/vulnerabilidadesService";
import { useNavigate, useParams } from "react-router-dom";
import FormularioVulnerabilidad from "../../components/FormularioVulnerabilidad";

export default function EditarVulnerabilidad() {
  const { id } = useParams();
  const [vul, setVul] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerUnaVulnerabilidad(id).then(setVul);
  }, [id]);

  const handleSubmit = async (data) => {
    await actualizarVulnerabilidad(id, data);
    navigate("/admin/crud");
  };

  return (
    <div className="container mt-4">
      <h2>Editar Vulnerabilidad</h2>
      {vul ? <FormularioVulnerabilidad onSubmit={handleSubmit} initialData={vul} /> : <p>Cargando...</p>}
    </div>
  );
}
