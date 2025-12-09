import { Outlet, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

function ProtectedRoute() {
  const isAuthenticated = true;
  const loading = false;

  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="login" repalce />
  );
}

export default ProtectedRoute;
