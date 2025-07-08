import { useNavigate } from "react-router-dom";
import FormularioVulnerabilidad from "../../components/FormularioVulnerabilidad";
import { agregarVulnerabilidad } from "../../services/vulnerabilidadesService";
import Swal from "sweetalert2";

export default function CrearVulnerabilidad() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await agregarVulnerabilidad(formData);
      Swal.fire({
        title: "¡Éxito!",
        text: "Vulnerabilidad creada correctamente",
        icon: "success"
      });
      navigate("/admin/crud");
    } catch (error) {
      console.error("Error al crear:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo crear la vulnerabilidad",
        icon: "error"
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Nueva Vulnerabilidad</h2>
        </div>
        <div className="card-body">
          <FormularioVulnerabilidad onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}