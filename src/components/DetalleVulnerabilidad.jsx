import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { FaBug, FaShieldAlt, FaExclamationTriangle, FaLock } from "react-icons/fa";

const obtenerIconoTipo = (tipo = "") => {
  switch (tipo.toLowerCase()) {
    case "sql": return <FaBug className="me-2 text-danger" />;
    case "xss": return <FaShieldAlt className="me-2 text-warning" />;
    case "csrf": return <FaLock className="me-2 text-info" />;
    default: return <FaBug className="me-2 text-secondary" />;
  }
};

const obtenerIconoRiesgo = (riesgo = "") => {
  switch (riesgo.toLowerCase()) {
    case "crítico": return <FaExclamationTriangle className="me-2 text-danger" />;
    case "alto": return <FaExclamationTriangle className="me-2 text-warning" />;
    case "medio": return <FaExclamationTriangle className="me-2 text-info" />;
    case "bajo": return <FaExclamationTriangle className="me-2 text-success" />;
    default: return <FaExclamationTriangle className="me-2 text-secondary" />;
  }
};

export default function DetalleVulnerabilidad({ data }) {
  if (!data) {
    return <p className="text-center text-muted mt-4">No hay datos para mostrar.</p>;
  }

  return (
    <Card className="shadow-sm border-0 my-4">
      <Card.Body>
        <Card.Title className="mb-4 d-flex align-items-center">
          {obtenerIconoTipo(data.tipo)}
          <span className="fs-4">{data.nombre}</span>
          <Badge bg="secondary" className="ms-2">{data.tipo}</Badge>
        </Card.Title>

        <Row className="mb-3">
          <Col md={6}>
            <h6 className="text-muted">Nivel de Riesgo</h6>
            <p className="d-flex align-items-center">
              {obtenerIconoRiesgo(data.riesgo)}
              <strong>{data.riesgo}</strong>
            </p>
          </Col>
          <Col md={6}>
            <h6 className="text-muted">Fecha de Detección</h6>
            <p>{data.fechaDeteccion}</p>
          </Col>
        </Row>

        <h6 className="text-muted mt-4">Descripción técnica</h6>
        <p>{data.descripcion}</p>

        <h6 className="text-muted mt-4">Soluciones</h6>
        <p>{data.soluciones}</p>

        <h6 className="text-muted mt-4">Recomendaciones</h6>
        <p>{data.recomendaciones}</p>
      </Card.Body>
    </Card>
  );
}

