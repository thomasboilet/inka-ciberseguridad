// src/pages/admin/CrudVulnerabilidades.jsx
import React, { useEffect, useState } from "react";
import { obtenerVulnerabilidades, eliminarVulnerabilidad } from "../../services/vulnerabilidadesService";
import { useNavigate } from "react-router-dom";

export default function CrudVulnerabilidades() {
  const [vulnerabilidades, setVulnerabilidades] = useState([]);
  const navigate = useNavigate();

  const cargarDatos = async () => {
    const data = await obtenerVulnerabilidades();
    setVulnerabilidades(data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleEliminar = async (id) => {
    if (confirm("¿Eliminar esta vulnerabilidad?")) {
      await eliminarVulnerabilidad(id);
      cargarDatos();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Vulnerabilidades</h2>
      <button onClick={() => navigate("/admin/crear")} className="btn btn-success mb-3">
        + Nueva Vulnerabilidad
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Riesgo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vulnerabilidades.map(v => (
            <tr key={v.id}>
              <td>{v.nombre}</td>
              <td>{v.tipo}</td>
              <td>{v.riesgo}</td>
              <td>{v.fechaDeteccion}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => navigate(`/admin/editar/${v.id}`)}>Editar</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleEliminar(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
