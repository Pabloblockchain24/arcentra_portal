import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Search, User, LogOut } from "lucide-react";

const Topbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  // cerrar si hace click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      
      {/* Input centrado */}
      <div className="topbar__search">
        <Search size={18} className="topbar__search-icon" />
        <input
          type="text"
          placeholder="Buscar contenedor..."
          className="topbar__input"
        />
      </div>

      {/* Perfil derecha */}
      <div
        className="topbar__profile"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <div className="topbar__avatar">
          <User size={18} />
        </div>

        <div className="topbar__profile-info">
          <span className="topbar__name">
            {user?.nombre} {user?.apellido}
          </span>
          <span className="topbar__role">
            {user?.empresa}
          </span>
        </div>

        {open && (
          <div className="topbar__dropdown">
            <button className="topbar__dropdown-item" onClick={logout}>
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;