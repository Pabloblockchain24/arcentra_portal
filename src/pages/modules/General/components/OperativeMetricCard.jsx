const OperativeMetricCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="operative-card">
      <div className="operative-card__icon">{icon}</div>
      <div>
        <span className="operative-card__title">{title}</span>
        <small>{subtitle}</small>
      </div>
      <strong className="operative-card__value">{value}</strong>
    </div>
  );
};

export default OperativeMetricCard;
