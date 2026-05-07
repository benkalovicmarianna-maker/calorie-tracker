import { getMealIcon, getMealLabel } from '../utils/helpers';

function MacroRing({ value, max, color, label, unit = 'г' }) {
  const pct = Math.min((value / max) * 100, 100);
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="macro-ring-wrap">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        <text x="40" y="44" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          {value}{unit}
        </text>
      </svg>
      <span className="macro-ring-label">{label}</span>
    </div>
  );
}

function CalorieArc({ consumed, goal }) {
  const pct = Math.min((consumed / goal) * 100, 100);
  const r = 80;
  const circ = Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const remaining = Math.max(goal - consumed, 0);
  const over = consumed > goal;

  return (
    <div className="calorie-arc-wrap">
      <svg width="220" height="130" viewBox="0 0 220 130">
        <path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round"
        />
        <path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none"
          stroke={over ? '#FF6B6B' : '#C8FF00'}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="calorie-arc-text">
        <div className="calorie-number">{consumed}</div>
        <div className="calorie-label">ккал з'їдено</div>
        <div className={`calorie-remaining ${over ? 'over' : ''}`}>
          {over ? `+${consumed - goal} зайвих` : `${remaining} залишилось`}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ totals, goal, meals, water, onUpdateWater }) {
  const mealTotals = Object.entries(meals).map(([type, items]) => ({
    type,
    calories: items.reduce((s, i) => s + i.calories, 0),
    count: items.length,
  }));

  const waterGoal = 2500;
  const waterPct = Math.min((water / waterGoal) * 100, 100);

  return (
    <div className="dashboard">
      <section className="calorie-section">
        <CalorieArc consumed={totals.calories} goal={goal.calories} />
        <div className="calorie-goal-text">Ціль: {goal.calories} ккал</div>
      </section>

      <section className="macros-section">
        <h3 className="section-title">Макронутрієнти</h3>
        <div className="macro-rings">
          <MacroRing value={totals.protein} max={goal.protein} color="#FF6B6B" label="Білки" />
          <MacroRing value={totals.fat} max={goal.fat} color="#FFD93D" label="Жири" />
          <MacroRing value={totals.carbs} max={goal.carbs} color="#6BCB77" label="Вуглев." />
        </div>
      </section>

      <section className="meals-summary">
        <h3 className="section-title">Прийоми їжі</h3>
        <div className="meal-cards">
          {mealTotals.map(({ type, calories, count }) => (
            <div key={type} className="meal-card-small">
              <span className="meal-card-icon">{getMealIcon(type)}</span>
              <span className="meal-card-name">{getMealLabel(type)}</span>
              <span className="meal-card-cal">{calories} ккал</span>
              {count > 0 && <span className="meal-card-count">{count} страв</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="water-mini">
        <div className="water-mini-header">
          <h3 className="section-title">💧 Вода</h3>
          <span className="water-mini-amount">{water} / {waterGoal} мл</span>
        </div>
        <div className="water-bar-bg">
          <div className="water-bar-fill" style={{ width: `${waterPct}%` }} />
        </div>
        <div className="water-quick-btns">
          {[150, 250, 500].map(ml => (
            <button key={ml} className="water-quick-btn" onClick={() => onUpdateWater(Math.min(water + ml, waterGoal))}>
              +{ml}мл
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
