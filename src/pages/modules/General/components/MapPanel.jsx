import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const createClusterCustomIcon = (cluster) => {
  return L.divIcon({
    html: `
      <div class="truck-cluster">
        🚛
        <span>${cluster.getChildCount()}</span>
      </div>
    `,
    className: "custom-marker-cluster",
    iconSize: L.point(50, 50, true),
  });
};

const truckIcon = L.divIcon({
  className: "custom-truck-icon",
  html: `
    <div class="truck-cluster truck-single">
      🚛
      <span>1</span>
    </div>
  `,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -20],
});
const unidades = [
  // =========================
  // SAN ANTONIO (3 camiones)
  // =========================
  {
    id: 1,
    unidad: "TCLU 204215-2",
    chofer: "Mario Gonzalez",
    patente: "VV7049",
    carga: "Cerámica",
    lat: -33.5891,
    lng: -71.6180,
  },
  {
    id: 2,
    unidad: "BMOU 284116-3",
    chofer: "Pablo Apablaza",
    patente: "BSWC22",
    carga: "Cerámica",
    lat: -33.6005,
    lng: -71.6202,
  },
  {
    id: 3,
    unidad: "FSDU 114789-5",
    chofer: "Fabian Gonzalez",
    patente: "RV6905",
    carga: "Cerámica",
    lat: -33.5750,
    lng: -71.6050,
  },

  // =========================
  // MELIPILLA (Ruta 78)
  // =========================
{
  id: 4,
  unidad: "TLLU 110025-5",
  chofer: "Jose Apablaza",
  patente: "BKXC23",
  carga: "Sanitarios",
  lat: -33.672,
  lng: -71.2132,
},
  // =========================
  // MALLOCO (Ruta 78)
  // =========================
{
  id: 5,
  unidad: "MSCU 558520-5",
  chofer: "Reinaldo Diaz",
  patente: "HLGX81",
  carga: "Cerámica",
  lat: -33.66,
  lng: -70.9048,
},

  // =========================
  // QUILICURA (Lautaro 9202)
  // =========================
  {
    id: 6,
    unidad: "MSCU 558533-8",
    chofer: "Manuel Acevedo",
    patente: "HLGX82",
    carga: "Cerámica",
    lat: -33.3640,
    lng: -70.7340,
  },
  {
    id: 7,
    unidad: "TCLU 204215-2",
    chofer: "Pablo Arce",
    patente: "CXST20",
    carga: "Cerámica",
    lat: -33.3625,
    lng: -70.7305,
  },

  // =========================
  // RENCA (Alberto Pepper 1961)
  // =========================
  {
    id: 8,
    unidad: "BMOU 284116-3",
    chofer: "Hector Gonzalez",
    patente: "CXST20",
    carga: "Sanitarios",
    lat: -33.4069,
    lng: -70.7350,
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

          <MarkerClusterGroup
            chunkedLoading
            spiderfyOnMaxZoom
            showCoverageOnHover={false}
            iconCreateFunction={createClusterCustomIcon}
          >
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
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPanel;
