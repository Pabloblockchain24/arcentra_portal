import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const truckIcon = L.divIcon({
  className: "custom-truck-icon",
  html: `
    <div class="truck-marker">
      <svg viewBox="0 0 90 60" width="30" height="22">
        
        <!-- Remolque -->
        <rect x="2" y="26" width="48" height="14" rx="3" fill="#1e2a38"/>

        <!-- Cabina (más alta) -->
        <rect x="50" y="18" width="20" height="22" rx="4" fill="#1e2a38"/>

        <!-- Ventana -->
        <rect x="54" y="20" width="10" height="6" rx="2" fill="#ffffff"/>

        <!-- Ruedas -->
        <circle cx="18" cy="44" r="5" fill="#0f172a"/>
        <circle cx="60" cy="44" r="5" fill="#0f172a"/>
      </svg>
    </div>
  `,
  iconSize: [36, 30],
  iconAnchor: [18, 26],
  popupAnchor: [0, -25],
});

const EstatusMap = ({ data }) => {
  return (
    <div className="estatus__map-wrapper">
      <MapContainer
        center={[-33.5891, -71.2153]}
        zoom={9}
        scrollWheelZoom={false}
        className="estatus__map"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((unidad) => (
          <Marker
            key={unidad.id}
            position={[unidad.lat, unidad.lng]}
            icon={truckIcon}
          >
            {" "}
            <Popup>
              <strong>{unidad.unidad}</strong>
              <br />
              Chofer: {unidad.chofer}
              <br />
              Patente: {unidad.patente}
              <br />
              Producto: {unidad.producto}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EstatusMap;
