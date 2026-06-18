import { createContext, useContext, useState, useEffect } from "react";
import {
  loginByApi,
  logoutByApi,
  verifyTokenRequestByApi,
  registerByApi
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Solo para login / logout
  const [loading, setLoading] = useState(false);

  // 🔹 Solo para verificar token al iniciar la app
  const [initialLoading, setInitialLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
  verifyToken();
}, []);

  // 🔐 LOGIN
  const login = async (credentials) => {
  try {
    setLoading(true);
    setError(null); // limpiamos error previo

    const res = await loginByApi(credentials);
    const { user, token } = res.data;
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  } catch (err) {
    console.error("Login error:", err);

    setIsAuthenticated(false);

    // 🔴 Detectar si el backend no responde
    if (!err.response) {
      setError("No se pudo conectar con el servidor. Intenta nuevamente.");
    } else if (err.response.status === 401) {
      setError("Usuario o contraseña incorrectos.");
    } else {
      setError("Ocurrió un error inesperado.");
    }

  } finally {
    setLoading(false);
  }
};

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      setLoading(true);

      await logoutByApi();

      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");

    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔎 VERIFY TOKEN (solo al iniciar app)
const verifyToken = async () => {
  setInitialLoading(true);

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    const res = await verifyTokenRequestByApi();

    if (res?.data?.user) {
      setUser(res.data.user);
      setIsAuthenticated(true);
    } else {
      throw new Error("Token inválido");
    }

  } catch (error) {
    console.error("Token verification error:", error);

    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);

  } finally {
    setInitialLoading(false);
  }
};

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      await registerByApi(userData);
    } catch (err) {
      console.error("Registration error:", err);
      if (!err.response) {
        setError("No se pudo conectar con el servidor. Intenta nuevamente.");
      } else {
        setError("Error al crear usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // user: {nombre: "Pablo", apellido: "Arce", empresa: "Arcentra"}, // solo para pruebas, eliminar luego
        user,
        login,
        logout,
        register,
        verifyToken,
        loading,        // para botón login
        initialLoading, // para loader global al iniciar app
        isAuthenticated,
        error,          // mensaje de error para mostrar en UI
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};