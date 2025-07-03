// src/components/FormularioVulnerabilidad.jsx
import React, { useState, useEffect } from "react";

export default function FormularioVulnerabilidad({ onSubmit, initialData = {} }) {
  const [vul, setVul] = useState({
    nombre: "",
    tipo: "",
    riesgo: "",
    fechaDeteccion: "",
    descripcion: "",
    soluciones: "",
    recomendaciones: "",
    iconos: "",
    ...initialData
  });

  const handleChange = (e) => {
    setVul({ ...vul, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vul);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" className="form-control mb-2" value={vul.nombre} onChange={handleChange} required />
      <input name="tipo" placeholder="Tipo" className="form-control mb-2" value={vul.tipo} onChange={handleChange} required />
      <input name="riesgo" placeholder="Riesgo" className="form-control mb-2" value={vul.riesgo} onChange={handleChange} required />
      <input name="fechaDeteccion" type="date" className="form-control mb-2" value={vul.fechaDeteccion} onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" className="form-control mb-2" value={vul.descripcion} onChange={handleChange} />
      <textarea name="soluciones" placeholder="Soluciones" className="form-control mb-2" value={vul.soluciones} onChange={handleChange} />
      <textarea name="recomendaciones" placeholder="Recomendaciones" className="form-control mb-2" value={vul.recomendaciones} onChange={handleChange} />
      <button className="btn btn-primary">Guardar</button>
    </form>
  );
}
