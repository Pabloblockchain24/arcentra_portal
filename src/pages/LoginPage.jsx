import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-header">
          <img src="/Arcentralogo2.png" alt="Logo Transcurrin" className="login-logo"/>
          <p className="subtitle">
            Plataforma de Gestión Logística de Arcentra
          </p>
        </div>

        <div className="divider"></div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Iniciar sesión</h2>

          <input
            type="email"
            placeholder="nombre@empresa.cl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <a href="/forgot-password" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </a>

          {error && <div className="login-error">{error}</div>}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <div className="login-footer">
          <p>© {new Date().getFullYear()} Arcentra Spa · Todos los derechos reservados</p>
        </div>

      </div>
    </div>
  );
}