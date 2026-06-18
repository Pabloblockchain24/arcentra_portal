import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useContainers } from "../context/ContainerContext";
import { Search, LogOut, User } from "lucide-react";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { results, searchContainers, getContainer } = useContainers();

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  // debounce search
  useEffect(() => {
    if (!query.trim()) {
      setShowResults(false);
      return;
    }

    const timeout = setTimeout(() => {
      searchContainers({ search: query });
      setShowResults(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar__left"></div>
      {/* CENTER SEARCH */}
      <div className="topbar__center">
        <div className="topbar__search" ref={searchRef}>
          <Search size={16} className="topbar__icon" />

          <input
            type="text"
            placeholder="Buscar contenedor (ej: MSCU1234567)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="topbar__input"
          />

          {showResults && (
            <div className="topbar__results">
              {results.length > 0 ? (
                results.map((item) => (
                  <div
                    key={item._id} // ✅ correcto
                    className="topbar__result-item"
                    onClick={() => {
                      getContainer(item._id); // ✅ correcto
                      setQuery("");
                      setShowResults(false);
                    }}
                  >
                    <strong>{item.unidad}</strong>{" "}
                    {/* 👈 antes usabas numero */}
                    <span>
                      {`${item.tipoContenedor}" - ${
                        item.producto?.charAt(0).toUpperCase() +
                        item.producto?.slice(1)
                      }`}
                    </span>
                  </div>
                ))
              ) : (
                <div className="topbar__result-item empty">Sin resultados</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PROFILE */}
      <div className="topbar__right">
        <div className="topbar__profile">
          <div className="topbar__avatar">
            <User size={16} />
          </div>

          <div className="topbar__info">
            <span className="topbar__name">
              {user?.nombre + " " + user?.apellido}
            </span>
            <span className="topbar__role">{user?.empresa}</span>
          </div>
        </div>

        <button className="topbar__logout" onClick={logout}>
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
