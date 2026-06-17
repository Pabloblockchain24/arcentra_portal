import { useContainers } from "../../../context/ContainerContext";

const ContainerDetailModal = () => {
  const { selectedId, container, closeContainer } = useContainers();

  if (!selectedId) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={closeContainer}>Cerrar</button>

        <h2>{container?.numero || "Cargando..."}</h2>
      </div>
    </div>
  );
};

export default ContainerDetailModal;