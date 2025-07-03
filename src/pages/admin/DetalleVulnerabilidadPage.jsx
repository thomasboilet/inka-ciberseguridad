import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerUnaVulnerabilidad } from "../../services/vulnerabilidadesService";
import DetalleVulnerabilidad from "../../components/DetalleVulnerabilidad";

export default function DetalleVulnerabilidadPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await obtenerUnaVulnerabilidad(id);
      setData(resultado);
    };
    fetchData();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Detalle de la Vulnerabilidad</h2>
      <DetalleVulnerabilidad data={data} />
    </div>
  );
}
