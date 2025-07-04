// src/components/TablaVulnerabilidades.jsx
import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Tabla de vulnerabilidades filtrable.
 *
 * @param {Array}  vulnerabilidades - Lista completa proveniente de Firestore.
 * @param {Object} filtros          - { riesgo, tipo, fecha }.
 * @param {String} basePath         - Prefijo de la ruta ("/admin" o "/cliente"). Default "/admin".
 */
export default function TablaVulnerabilidades({
  vulnerabilidades = [],
  filtros         = { riesgo: "", tipo: "", fecha: "" },
  basePath        = "/admin"
}) {
  const navigate = useNavigate();

  /* ────── Filtrado dinámico ────── */
  const filtradas = vulnerabilidades.filter((v) => {
    const coincideRiesgo =
      filtros.riesgo === "" || v.riesgo.toLowerCase() === filtros.riesgo.toLowerCase();

    const coincideTipo =
      filtros.tipo === "" || v.tipo.toLowerCase() === filtros.tipo.toLowerCase();

    const coincideFecha =
      filtros.fecha === "" ||
      new Date(v.fechaDeteccion).toISOString().split("T")[0] === filtros.fecha;

    return coincideRiesgo && coincideTipo && coincideFecha;
  });

  /* ────── Render ────── */
  return (
    <Table striped bordered hover responsive className="shadow-sm">
      <thead className="table-dark text-center">
        <tr>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Nivel de riesgo</th>
          <th>Fecha de detección</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {filtradas.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center text-muted">
              No se encontraron vulnerabilidades con los filtros aplicados.
            </td>
          </tr>
        ) : (
          filtradas.map((v) => (
            <tr key={v.id}>
              <td>{v.nombre}</td>
              <td>{v.tipo}</td>
              <td>{v.riesgo}</td>
              <td>{v.fechaDeteccion}</td>
              <td className="text-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`${basePath}/vulnerabilidad/${v.id}`)}
                >
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
