const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="summary-card">
      <div className="summary-card__icon">{icon}</div>
      <div className="summary-card__info">
        <span>{title}</span>
      </div>
      <div className="summary-card__info">
        <strong>{value}</strong>
      </div>
    </div>
  );
};

export default SummaryCard;
