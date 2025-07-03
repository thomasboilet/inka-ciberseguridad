// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedByRole from "./ProtectedByRole";

// Dashboards
import AdminLayout from "../components/admin/layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ClienteDashboard from "../pages/cliente/ClienteDashboard";
import DetalleVulnerabilidadPage from "../pages/admin/DetalleVulnerabilidadPage";

// CRUD de Vulnerabilidades
import CrudVulnerabilidades from "../pages/admin/CrudVulnerabilidades";
import CrearVulnerabilidad from "../pages/admin/CrearVulnerabilidad";
import EditarVulnerabilidad from "../pages/admin/EditarVulnerabilidad";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      {/* <Route path="/recuperar" element={<RecuperarContraseña />} /> */}

      {/* Rutas protegidas por rol: Cliente */}
      <Route
        path="/cliente/dashboard"
        element={
          <ProtectedByRole allowed={["cliente"]}>
            <ClienteDashboard />
          </ProtectedByRole>
        }
      />

      {/* Rutas protegidas por rol: Admin y Analista */}
      <Route
        path="/admin"
        element={
          <ProtectedByRole allowed={["admin", "analista"]}>
            <AdminLayout />
          </ProtectedByRole>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="crud" element={<CrudVulnerabilidades />} />
        <Route path="crear" element={<CrearVulnerabilidad />} />
        <Route path="editar/:id" element={<EditarVulnerabilidad />} />
        <Route path="vulnerabilidad/:id" element={<DetalleVulnerabilidadPage />} />
      </Route>
    </Routes>
  );
}
