import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import Loader from "./componets/Loader";

// Import context providers
import { AuthProvider, useAuth } from "./context/AuthContext";

function AdminAppContent() {
  const { isAuthenticated, verifyToken, initialLoading} = useAuth();

  useEffect(() => {
    verifyToken(); // 🔑 chequear sesión al cargar
  }, []);

  if (initialLoading) return <Loader />;


  return (
    <div className="admin-app">
      <AdminDashboard />
      {/* cuando termine debo cambiar estas lineas por esto: */}
            {/* {isAuthenticated ? <AdminDashboard /> : <LoginPage />} */}
    </div>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
              <AdminAppContent />
    </AuthProvider>
  );
}
