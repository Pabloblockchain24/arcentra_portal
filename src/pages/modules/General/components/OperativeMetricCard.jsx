const OperativeMetricCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="operative-card">
      <div className="operative-card__icon">{icon}</div>
      <div>
        <span className="operative-card__title">{title}</span>
        <strong className="operative-card__value">{value}</strong>
        <small>{subtitle}</small>
      </div>
    </div>
  );
};

export default OperativeMetricCard;