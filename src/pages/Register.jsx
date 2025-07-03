import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveUserData } from "../services/userService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("cliente");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const credenciales = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(credenciales.user);
      await saveUserData(credenciales.user.uid, { nombre, tipo, email });

      Swal.fire(
        "¡Registro exitoso!",
        "Revisa tu correo para verificar tu cuenta antes de iniciar sesión.",
        "success"
      );
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error.code, error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `No se pudo completar el registro: ${error.message}`,
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Registro de Usuario</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Rol de usuario</label>
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="cliente">Cliente</option>
            <option value="analista">Analista</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="mb-2">¿Ya tienes una cuenta?</p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-outline-primary"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
