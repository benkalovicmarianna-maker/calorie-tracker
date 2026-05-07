import { useState } from 'react';
import { Droplets, Plus, Minus, RotateCcw } from 'lucide-react';

const WATER_GOAL = 2500;
const GLASS_SIZE = 250;

export default function WaterTracker({ water, onUpdate }) {
  const [customMl, setCustomMl] = useState('');
  const glasses = Math.floor(water / GLASS_SIZE);
  const totalGlasses = Math.ceil(WATER_GOAL / GLASS_SIZE);
  const pct = Math.min((water / WATER_GOAL) * 100, 100);

  const add = (ml) => onUpdate(Math.min(water + ml, WATER_GOAL + 500));
  const remove = (ml) => onUpdate(Math.max(water - ml, 0));

  const getMessage = () => {
    if (pct >= 100) return '🎉 Чудово! Норму виконано!';
    if (pct >= 75) return '💪 Майже! Ще трохи!';
    if (pct >= 50) return '👍 Половину вже!';
    if (pct >= 25) return '☕ Непогано, продовжуй!';
    return '💧 Почни пити воду!';
  };

  return (
    <div className="water-tracker">
      <h2 className="water-title">Трекер води</h2>

      <div className="water-bottle">
        <div className="bottle-outer">
          <div className="bottle-fill" style={{ height: `${pct}%` }}>
            <div className="water-wave" />
          </div>
          <div className="bottle-text">
            <div className="water-amount">{water}</div>
            <div className="water-unit">мл</div>
          </div>
        </div>
        <div className="water-goal-label">з {WATER_GOAL} мл</div>
      </div>

      <div className="water-message">{getMessage()}</div>

      <div className="glasses-row">
        {Array.from({ length: totalGlasses }).map((_, i) => (
          <div
            key={i}
            className={`glass-icon ${i < glasses ? 'filled' : ''}`}
            onClick={() => i < glasses ? remove(GLASS_SIZE) : add(GLASS_SIZE)}
            title={i < glasses ? 'Прибрати склянку' : 'Додати склянку'}
          >
            {i < glasses ? '🥤' : '🫙'}
          </div>
        ))}
      </div>
      <div className="glasses-label">{glasses} / {totalGlasses} склянок</div>

      <div className="water-btns">
        {[150, 250, 350, 500].map(ml => (
          <button key={ml} className="water-btn" onClick={() => add(ml)}>
            <Droplets size={16} />
            +{ml}мл
          </button>
        ))}
      </div>

      <div className="water-custom">
        <input
          type="number"
          placeholder="Своя кількість мл"
          value={customMl}
          onChange={e => setCustomMl(e.target.value)}
          min="1"
          max="2000"
        />
        <button onClick={() => { if (customMl) { add(Number(customMl)); setCustomMl(''); } }}>
          <Plus size={18} />
        </button>
      </div>

      <div className="water-controls">
        <button className="water-control-btn" onClick={() => remove(250)}>
          <Minus size={16} /> -250мл
        </button>
        <button className="water-control-btn reset" onClick={() => onUpdate(0)}>
          <RotateCcw size={16} /> Скинути
        </button>
      </div>

      <div className="water-progress-bar">
        <div className="water-progress-fill" style={{ width: `${pct}%` }} />
        <span className="water-progress-pct">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}
