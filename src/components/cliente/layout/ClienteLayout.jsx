// src/components/layout/ClienteLayout.jsx
import { Outlet } from "react-router-dom";
import NavCliente from "./NavCliente";

export default function ClienteLayout() {
  return (
    <>
      <NavCliente />
      <main className="container mt-3">
        <Outlet />
      </main>
    </>
  );
}
