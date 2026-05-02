import { useState } from "react";
import { registerByApi } from "../api/auth";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    empresa: "",
    nombre: "",
    apellido: "",
    tipoUsuario: "cliente",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await registerByApi(formData);

      setSuccess("Usuario creado correctamente.");
      setFormData({
        email: "",
        password: "",
        empresa: "",
        nombre: "",
        apellido: "",
        tipoUsuario: "cliente",
      });
    } catch (err) {
      if (!err.response) {
        setError("No se pudo conectar con el servidor.");
      } else {
        setError("Error al crear usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h1 className="brand">TC Control</h1>
        <h2 className="register-title">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="register-form">

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="empresa"
            placeholder="Empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="correo@empresa.cl"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
          >
            <option value="cliente">Cliente</option>
            <option value="colaborador">Colaborador</option>
            <option value="chofer">Chofer</option>
            <option value="operador">Operador</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Usuario"}
          </button>
        </form>
      </div>
    </div>
  );
}