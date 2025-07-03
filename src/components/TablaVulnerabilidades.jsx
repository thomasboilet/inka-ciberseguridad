// src/components/TablaVulnerabilidades.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TablaVulnerabilidades({ vulnerabilidades, filtros }) {
  const filtradas = vulnerabilidades.filter(vul => {
    return (
      (!filtros.riesgo || vul.riesgo === filtros.riesgo) &&
      (!filtros.tipo || vul.tipo === filtros.tipo) &&
      (!filtros.fecha || vul.fechaDeteccion === filtros.fecha)
    );
  });

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Nivel de riesgo</th>
          <th>Fecha de detección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filtradas.length > 0 ? (
          filtradas.map(v => (
            <tr key={v.id}>
              <td>{v.nombre}</td>
              <td>{v.tipo}</td>
              <td>{v.riesgo}</td>
              <td>{v.fechaDeteccion}</td>
              <td>
                <Link
                  to={`/admin/vulnerabilidad/${v.id}`}
                  className="btn btn-dark btn-sm"
                >
                  Ver Detalle
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No se encontraron vulnerabilidades con los filtros aplicados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
