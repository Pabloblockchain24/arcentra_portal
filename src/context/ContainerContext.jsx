import { createContext, useContext, useState } from "react";
import {
  searchContainersApi,
  getContainerByIdApi,
  getContainers
} from "../api/containers";

const ContainerContext = createContext();

export const useContainers = () => {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainers must be used within ContainerProvider");
  }
  return context;
};

export const ContainerProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [container, setContainer] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);

  // 🔎 SEARCH
const searchContainers = async (filters = {}) => {
  try {
    setLoading(true);

    setError(null);
    const res = await searchContainersApi(filters);
       console.log("Resultados de búsqueda:", res.data); // para depuración

    setResults(res.data);
  } catch (err) {
    console.error(err);
    setError("Error al buscar contenedores");
  } finally {
    setLoading(false);
  }
};

  // 📦 GET DETAIL
  const getContainer = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getContainerByIdApi(id);
      setContainer(res.data);
      setSelectedId(id);
    } catch (err) {
      console.error(err);
      setError("Error al obtener contenedor");
    } finally {
      setLoading(false);
    }
  };

  // ❌ cerrar modal
  const closeContainer = () => {
    setSelectedId(null);
    setContainer(null);
  };

  return (
    <ContainerContext.Provider
      value={{
        results,
        container,
        loading,
        error,
        selectedId,
        searchContainers,
        getContainer,
        closeContainer,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
};