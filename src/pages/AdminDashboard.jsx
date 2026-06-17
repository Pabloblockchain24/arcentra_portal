import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/Topbar";

import General from "./modules/General/General";
import Programación from "./modules/Programacion/Programación";
import Stock from "./modules/Stock/Stock";
import Estatus from "./modules/Estatus/Estatus";
import Vacíos from "./modules/Vacios/Vacíos";
import Métricas from "./modules/Metricas/Métricas";
import Facturación from "./modules/Facturacion/Facturación";
import Tarifas from "./modules/Tarifas/Tarifas";

import ContainerDetailModal from "../pages/modules/ContainerDetailModal/ContainerDetailModal";
import { ContainerProvider } from "../context/ContainerContext";

function AdminDashboard() {
  const [activeModule, setActiveModule] = useState("general");

  const renderModule = () => {
    switch (activeModule) {
      case "general":
        return <General />;
      case "programación":
        return <Programación />;
      case "stock":
        return <Stock />;
      case "estatus":
        return <Estatus />;
      case "vacíos":
        return <Vacíos />;
      case "métricas":
        return <Métricas />;
      case "facturación":
        return <Facturación />;
      case "tarifas":
        return <Tarifas />;
      default:
        return <General />;
    }
  };

  return (
    <ContainerProvider>
      <div className="admin-dashboard">
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
        />

        <div className="right-side">
          <TopBar />
          {renderModule()}
        </div>

        {/* 🔥 SIEMPRE GLOBAL */}
        <ContainerDetailModal />
      </div>
    </ContainerProvider>
  );
}

export default AdminDashboard;