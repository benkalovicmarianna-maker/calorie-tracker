import { useState } from 'react';
import { Save, Target, Flame, Beef, Droplets, Wheat } from 'lucide-react';

const presets = [
  { label: 'Схуднення', calories: 1500, protein: 120, fat: 50, carbs: 150, emoji: '🔥' },
  { label: 'Підтримка', calories: 2000, protein: 100, fat: 65, carbs: 250, emoji: '⚖️' },
  { label: 'Набір маси', calories: 2800, protein: 160, fat: 90, carbs: 350, emoji: '💪' },
  { label: 'Спортсменка', calories: 2400, protein: 180, fat: 70, carbs: 280, emoji: '🏋️' },
];

export default function GoalSettings({ goal, onSave }) {
  const [form, setForm] = useState(goal);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const applyPreset = (preset) => {
    const { label, emoji, ...values } = preset;
    setForm(values);
  };

  const fields = [
    { key: 'calories', label: 'Калорії', unit: 'ккал', icon: Flame, color: '#C8FF00', min: 800, max: 5000 },
    { key: 'protein', label: 'Білки', unit: 'г', icon: Beef, color: '#FF6B6B', min: 30, max: 300 },
    { key: 'fat', label: 'Жири', unit: 'г', icon: Droplets, color: '#FFD93D', min: 20, max: 200 },
    { key: 'carbs', label: 'Вуглеводи', unit: 'г', icon: Wheat, color: '#6BCB77', min: 50, max: 600 },
  ];

  return (
    <div className="goal-settings">
      <div className="settings-header">
        <Target size={24} />
        <h2>Мої цілі</h2>
      </div>

      <div className="presets-section">
        <h3>Готові пресети</h3>
        <div className="presets-grid">
          {presets.map(preset => (
            <button key={preset.label} className="preset-btn" onClick={() => applyPreset(preset)}>
              <span className="preset-emoji">{preset.emoji}</span>
              <span className="preset-label">{preset.label}</span>
              <span className="preset-cal">{preset.calories} ккал</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fields-section">
        <h3>Налаштувати вручну</h3>
        {fields.map(({ key, label, unit, icon: Icon, color, min, max }) => (
          <div key={key} className="field-row">
            <div className="field-label">
              <Icon size={18} style={{ color }} />
              <span>{label}</span>
            </div>
            <div className="field-input-wrap">
              <input
                type="range"
                min={min}
                max={max}
                step={key === 'calories' ? 50 : 5}
                value={form[key]}
                onChange={e => setForm(p => ({ ...p, [key]: Number(e.target.value) }))}
                style={{ '--thumb-color': color }}
              />
              <div className="field-value-wrap">
                <input
                  type="number"
                  value={form[key]}
                  onChange={e => setForm(p => ({ ...p, [key]: Number(e.target.value) }))}
                  min={min}
                  max={max}
                />
                <span className="field-unit">{unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bju-preview">
        <h3>Розподіл калорій</h3>
        <div className="bju-bar">
          {[
            { label: 'Б', value: form.protein * 4, color: '#FF6B6B' },
            { label: 'Ж', value: form.fat * 9, color: '#FFD93D' },
            { label: 'В', value: form.carbs * 4, color: '#6BCB77' },
          ].map(({ label, value, color }) => {
            const total = form.protein * 4 + form.fat * 9 + form.carbs * 4;
            const pct = Math.round((value / total) * 100);
            return (
              <div key={label} className="bju-segment" style={{ width: `${pct}%`, background: color }}>
                <span>{label} {pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
        <Save size={18} />
        {saved ? '✓ Збережено!' : 'Зберегти ціль'}
      </button>
    </div>
  );
}
