import { useState } from 'react';
import { Edit2, Check } from 'lucide-react';
const GOAL_FIELDS = [
  { key: 'calories', label: 'Денна ціль калорій', icon: '🔥', unit: 'ккал', min: 1000, max: 5000, desc: 'Рекомендовано: 1600–2400 ккал для жінок' },
  { key: 'protein', label: 'Білки', icon: '🥩', unit: 'г', min: 30, max: 300, desc: 'Рекомендовано: 0.8–1.6 г на кг ваги' },
  { key: 'fat', label: 'Жири', icon: '🫒', unit: 'г', min: 20, max: 200, desc: 'Рекомендовано: 20–35% від калорій' },
  { key: 'carbs', label: 'Вуглеводи', icon: '🌾', unit: 'г', min: 50, max: 500, desc: 'Рекомендовано: 45–65% від калорій' },
  { key: 'water', label: 'Вода (склянки по 250 мл)', icon: '💧', unit: 'скл', min: 4, max: 16, desc: 'Рекомендовано: 8 склянок = 2 літри' },
];

const PRESETS = [
  { label: 'Схуднення', calories: 1500, protein: 110, fat: 50, carbs: 150, water: 8 },
  { label: 'Підтримка', calories: 2000, protein: 90, fat: 65, carbs: 250, water: 8 },
  { label: 'Набір маси', calories: 2600, protein: 140, fat: 85, carbs: 320, water: 10 },
  { label: 'Спортсменка', calories: 2200, protein: 160, fat: 70, carbs: 240, water: 12 },
];

export default function GoalSettings({ goals, setGoals, showToast }) {
  const [local, setLocal] = useState({ ...goals });

  const handleSave = () => {
    setGoals(local);
    showToast('✓ Цілі збережено', 'success');
  };

  const applyPreset = (preset) => {
    const next = { ...local, ...preset };
    delete next.label;
    setLocal(next);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Налаштування цілей</h1>
        <p className="page-subtitle">Встанови індивідуальні цілі по нутрієнтам</p>
      </div>

      {/* Presets */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Швидкі пресети</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {PRESETS.map(preset => (
            <button
              key={preset.label}
              className="btn-secondary"
              onClick={() => applyPreset(preset)}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {preset.label}
              <span style={{ fontSize: '0.75rem', color: 'var(--ink-faint)' }}>{preset.calories} ккал</span>
            </button>
          ))}
        </div>
      </div>

      <div className="goals-layout">
        <div className="card">
          <div className="card-title">Мої цілі</div>
          {GOAL_FIELDS.map(({ key, label, icon, unit, desc }) => (
            <div key={key}>
              <div className="goal-row">
                <div className="goal-icon" style={{ background: 'var(--cream-dark)' }}>{icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="goal-label">{label}</div>
                  <input
                    className="goal-input"
                    type="number"
                    value={local[key]}
                    onChange={e => setLocal(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                  />
                </div>
                <div className="goal-unit">{unit}</div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', marginBottom: 8, marginLeft: 4 }}>{desc}</p>
            </div>
          ))}

          <button className="btn-primary" style={{ marginTop: 8 }} onClick={handleSave}>
            <Check size={16} style={{ display: 'inline', marginRight: 6 }} />
            Зберегти цілі
          </button>
        </div>

        {/* Info panel */}
        <div>
          <div className="card">
            <div className="card-title">Поточні цілі</div>
            {GOAL_FIELDS.map(({ key, label, icon, unit }) => (
              <div className="quick-stat" key={key}>
                <span className="stat-label">{icon} {label}</span>
                <span className="stat-val">{goals[key]} {unit}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <div className="card-title">💡 Поради</div>
            <ul style={{ listStyle: 'none', fontSize: '0.83rem', color: 'var(--ink-mid)', lineHeight: 1.8 }}>
              <li>• Вживай білок рівномірно протягом дня</li>
              <li>• Не менше 1.5–2 л води щодня</li>
              <li>• Зменшення на 500 ккал = -0.5 кг на тиждень</li>
              <li>• Складні вуглеводи дають довгу енергію</li>
              <li>• Здорові жири важливі для гормонів</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
