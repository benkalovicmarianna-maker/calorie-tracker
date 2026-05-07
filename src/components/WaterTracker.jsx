export default function WaterTracker({ water, setWater, goal = 8 }) {
  const glasses = Array.from({ length: goal }, (_, i) => i < water);

  return (
    <div className="water-card">
      <div className="water-title">💧 Трекер води</div>
      <div className="water-subtitle">Натисни на склянку щоб відмітити</div>

      <div className="water-glasses">
        {glasses.map((filled, i) => (
          <div
            key={i}
            className={`water-glass${filled ? ' filled' : ''}`}
            onClick={() => setWater(i < water ? i : i + 1)}
            title={`${(i + 1) * 250} мл`}
          >
            {filled ? '💧' : '○'}
          </div>
        ))}
      </div>

      <div className="water-info">
        <span>{water * 250} мл випито</span>
        <span className="water-count">{water}<span style={{ fontSize: '0.8rem', opacity: 0.6 }}>/{goal}</span></span>
      </div>
    </div>
  );
}
