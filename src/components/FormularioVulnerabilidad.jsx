import React, { useState } from "react";

export default function FormularioVulnerabilidad({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    nombre: initialData.nombre || "",
    tipo: initialData.tipo || "",
    riesgo: initialData.riesgo || "",
    fechaDeteccion: initialData.fechaDeteccion || "",
    descripcion: initialData.descripcion || "",
    soluciones: initialData.soluciones || "",
    recomendaciones: initialData.recomendaciones || "",
    ...initialData
  });

  const [nuevasEvidencias, setNuevasEvidencias] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
      .filter(file => ['image/png', 'image/jpeg', 'application/pdf'].includes(file.type));
    setNuevasEvidencias(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      nuevasEvidencias: nuevasEvidencias.length > 0 ? nuevasEvidencias : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" className="form-control mb-2" 
        value={formData.nombre} onChange={handleChange} required />
      
      <input name="tipo" placeholder="Tipo" className="form-control mb-2"
        value={formData.tipo} onChange={handleChange} required />
      
      <input name="riesgo" placeholder="Riesgo" className="form-control mb-2"
        value={formData.riesgo} onChange={handleChange} required />
      
      <input name="fechaDeteccion" type="date" className="form-control mb-2"
        value={formData.fechaDeteccion} onChange={handleChange} required />
      
      <textarea name="descripcion" placeholder="Descripción" className="form-control mb-2"
        value={formData.descripcion} onChange={handleChange} rows={3} />
      
      <textarea name="soluciones" placeholder="Soluciones" className="form-control mb-2"
        value={formData.soluciones} onChange={handleChange} rows={3} />
      
      <textarea name="recomendaciones" placeholder="Recomendaciones" className="form-control mb-2"
        value={formData.recomendaciones} onChange={handleChange} rows={3} />

      <div className="mt-3">
        <label className="form-label">Evidencias (PDF, PNG, JPG)</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".png,.jpg,.jpeg,.pdf"
          className="form-control mb-2"
        />
        
        {nuevasEvidencias.map((file, index) => (
          <div key={index} className="small text-muted">
            {file.name}
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Guardar
      </button>
    </form>
  );
}