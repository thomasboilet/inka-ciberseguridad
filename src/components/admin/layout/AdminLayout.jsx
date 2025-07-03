// src/components/admin/layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import NavAdmin from "./NavAdmin"; // <- Asegúrate de que la ruta esté bien

export default function AdminLayout() {
  return (
    <div>
      <NavAdmin />
      <main className="container mt-3">
        <Outlet />
      </main>
    </div>
  );
}

