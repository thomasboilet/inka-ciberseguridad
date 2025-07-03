import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerVulnerabilidades } from "../../services/vulnerabilidadesService";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

export default function AdminDashboard() {
  const [vulnerabilidades, setVulnerabilidades] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroRiesgo, setFiltroRiesgo] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerVulnerabilidades();
      setVulnerabilidades(datos);
    };
    cargarDatos();
  }, []);

  const filtrarVulnerabilidades = () => {
    return vulnerabilidades.filter((v) => {
      const coincideTipo = filtroTipo === "" || v.tipo.toLowerCase() === filtroTipo.toLowerCase();
      const coincideRiesgo = filtroRiesgo === "" || v.riesgo.toLowerCase() === filtroRiesgo.toLowerCase();
      const coincideFecha =
        filtroFecha === "" || new Date(v.fechaDeteccion).toISOString().split("T")[0] === filtroFecha;
      return coincideTipo && coincideRiesgo && coincideFecha;
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-dark fw-bold mb-4">INKA - Seguridad Cibernética Empresarial</h2>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Form.Select value={filtroRiesgo} onChange={(e) => setFiltroRiesgo(e.target.value)}>
            <option value="">Nivel de riesgo</option>
            <option value="Crítico">Crítico</option>
            <option value="Alto">Alto</option>
            <option value="Medio">Medio</option>
            <option value="Bajo">Bajo</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="">Tipo de vulnerabilidad</option>
            <option value="SQL">SQL</option>
            <option value="XSS">XSS</option>
            <option value="CSRF">CSRF</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Control
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </Col>
      </Row>

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
          {filtrarVulnerabilidades().length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No hay vulnerabilidades que coincidan con los filtros.
              </td>
            </tr>
          ) : (
            filtrarVulnerabilidades().map((v) => (
              <tr key={v.id}>
                <td>{v.nombre}</td>
                <td>{v.tipo}</td>
                <td>{v.riesgo}</td>
                <td>{v.fechaDeteccion}</td>
                <td className="text-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/admin/vulnerabilidad/${v.id}`)}
                  >
                    Ver Detalle
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
