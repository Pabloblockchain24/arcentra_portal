import axios from "./axios";

// 🔎 buscar contenedores
export const searchContainersApi = (filters) =>
  axios.get("/containers/search", {
    params: filters,
  });

// 📦 obtener detalle
export const getContainerByIdApi = (id) =>
  axios.get(`/containers/${id}`);

export const getContainers = (code) =>
  axios.get(`/containers/${code}`);
