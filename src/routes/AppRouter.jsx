// src/routes/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import Login    from "../pages/Login";
import Register from "../pages/Register";
import ProtectedByRole from "./ProtectedByRole";

/* ───── Layouts ───── */
import AdminLayout   from "../components/admin/layout/AdminLayout";
import ClienteLayout from "../components/cliente/layout/ClienteLayout";

/* ───── Vistas compartidas ───── */
import Dashboard from "../pages/shared/Dashboard";

/* ───── Admin / Analista ───── */
import DetalleVulnerabilidadPage from "../pages/admin/DetalleVulnerabilidadPage";
import CrudVulnerabilidades      from "../pages/admin/CrudVulnerabilidades";
import CrearVulnerabilidad       from "../pages/admin/CrearVulnerabilidad";
import EditarVulnerabilidad      from "../pages/admin/EditarVulnerabilidad";

export default function AppRouter() {
  return (
    <Routes>
      {/* ─────────── RUTAS PÚBLICAS ─────────── */}
      <Route path="/"        element={<Login />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/registro" element={<Register />} />
      {/* <Route path="/recuperar" element={<RecuperarContraseña />} /> */}

      {/* ─────────── CLIENTE ─────────── */}
      <Route
        path="/cliente"
        element={
          <ProtectedByRole allowed={["cliente"]}>
            <ClienteLayout />
          </ProtectedByRole>
        }
      >
        <Route
          path="dashboard"
          element={<Dashboard role="cliente" />}
        />
        <Route path="vulnerabilidad/:id" element={<DetalleVulnerabilidadPage />} />
      </Route>

      {/* ─────────── ADMIN / ANALISTA ─────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedByRole allowed={["admin", "analista"]}>
            <AdminLayout />
          </ProtectedByRole>
        }
      >
        {/* Dashboard reutiliza el mismo componente, pero con rol de admin */}
        <Route
          path="dashboard"
          element={<Dashboard role="admin" />}
        />

        {/* CRUD */}
        <Route path="crud"          element={<CrudVulnerabilidades />} />
        <Route path="crear"         element={<CrearVulnerabilidad />} />
        <Route path="editar/:id"    element={<EditarVulnerabilidad />} />

        {/* Detalle */}
        <Route path="vulnerabilidad/:id" element={<DetalleVulnerabilidadPage />} />
      </Route>
    </Routes>
  );
}
