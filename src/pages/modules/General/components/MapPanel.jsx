const MapPanel = () => {
  return (
    <div className="map-card">
      <h4>Tracking Operacional</h4>
      <iframe
        title="Mapa"
        src="https://www.google.com/maps/embed?pb=..."
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
};

export default MapPanel;