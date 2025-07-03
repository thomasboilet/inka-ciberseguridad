export default function FiltroVulnerabilidades({ filtros, setFiltros }) {
  return (
    <div className="d-flex gap-3 mb-3">
      <select onChange={e => setFiltros({ ...filtros, riesgo: e.target.value })}>
        <option value="">Nivel de riesgo</option>
        <option value="Crítico">Crítico</option>
        <option value="Alto">Alto</option>
        <option value="Medio">Medio</option>
        <option value="Bajo">Bajo</option>
      </select>
      <select onChange={e => setFiltros({ ...filtros, tipo: e.target.value })}>
        <option value="">Tipo de vulnerabilidad</option>
        <option value="XSS">XSS</option>
        <option value="SQL">SQL</option>
        <option value="Configuración incorrecta">Configuración incorrecta</option>
        <option value="Uso de componente vulnerable">Uso de componente vulnerable</option>
      </select>
      <input type="date" onChange={e => setFiltros({ ...filtros, fecha: e.target.value })} />
    </div>
  );
}
