import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const truckIcon = L.divIcon({
  className: "custom-truck-icon",
  html: `
    <div class="truck-marker">
      <svg viewBox="0 0 64 64" width="36" height="36">
        <rect x="4" y="24" width="30" height="16" rx="2" fill="#1e293b"/>
        <rect x="34" y="18" width="16" height="22" rx="2" fill="#334155"/>
        <rect x="38" y="21" width="8" height="7" fill="#e2e8f0"/>
        <circle cx="16" cy="44" r="5" fill="#0f172a"/>
        <circle cx="42" cy="44" r="5" fill="#0f172a"/>
      </svg>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});
const unidades = [
  {
    id: 1,
    unidad: "TRK-01",
    chofer: "Juan Pérez",
    patente: "ABCD12",
    carga: "Contenedor 40' Maersk",
    lat: -33.45,
    lng: -70.66,
  },
  {
    id: 2,
    unidad: "TRK-02",
    chofer: "Carlos Soto",
    patente: "EFGH34",
    carga: "Cobre Refinado",
    lat: -33.59,
    lng: -71.61,
  },
  {
    id: 3,
    unidad: "TRK-03",
    chofer: "Pedro Díaz",
    patente: "JKLM56",
    carga: "Carga Refrigerada",
    lat: -33.03,
    lng: -71.55,
  },
];

const MapPanel = () => {
  return (
    <div className="map-card">
      <h4>Tracking operaciones</h4>

      <div className="map-card__container">
        <MapContainer
          center={[-33.45, -70.66]}
          zoom={8}
          scrollWheelZoom={false}
          className="map-card__map"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {unidades.map((unidad) => (
          <Marker
  key={unidad.id}
  position={[unidad.lat, unidad.lng]}
  icon={truckIcon}
>
  <Popup>
    <div className="truck-popup">
      <h4>{unidad.unidad}</h4>

      <p>
        <strong>Chofer:</strong> {unidad.chofer}
      </p>

      <p>
        <strong>Patente:</strong> {unidad.patente}
      </p>

      <p>
        <strong>Carga:</strong> {unidad.carga}
      </p>
    </div>
  </Popup>
</Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPanel;