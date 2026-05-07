import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { MEALS } from '../data/foodDatabase';
import { calcDayTotals, calcMealTotals, calcPercentage, formatDateFull, getTodayKey } from '../utils/helpers';
import WaterTracker from './WaterTracker';

export default function Dashboard({ entries, goals, water, setWater, removeEntry }) {
  const [openMeals, setOpenMeals] = useState({ breakfast: true, lunch: true, dinner: true, snack: true });

  const todayKey = getTodayKey();
  const todayEntries = entries[todayKey] || [];
  const totals = calcDayTotals(todayEntries);
  const remaining = Math.max(0, goals.calories - totals.calories);
  const calPct = calcPercentage(totals.calories, goals.calories);

  const macros = [
    { key: 'protein', label: 'Білки', icon: '🥩', color: '#4A7C59', paleBg: '#D4EAD9', goal: goals.protein, unit: 'г' },
    { key: 'fat', label: 'Жири', icon: '🫒', color: '#C2783C', paleBg: '#F5E6D8', goal: goals.fat, unit: 'г' },
    { key: 'carbs', label: 'Вуглеводи', icon: '🌾', color: '#3B6B8A', paleBg: '#D0E4EF', goal: goals.carbs, unit: 'г' },
  ];

  const toggleMeal = (mealId) => setOpenMeals(prev => ({ ...prev, [mealId]: !prev[mealId] }));

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Харчовий щоденник</h1>
        <p className="page-subtitle">{formatDateFull(todayKey)} · {todayEntries.length} записів</p>
      </div>

      {/* Top row: calories + macros */}
      <div className="dashboard-grid">
        <div className="calorie-card">
          <div className="calorie-label">Калорії сьогодні</div>
          <div className="calorie-value">{Math.round(totals.calories)}</div>
          <div className="calorie-goal-text">
            Залишилось <span>{remaining} ккал</span> з {goals.calories}
          </div>
          <div className="calorie-progress-wrap">
            <div className="calorie-progress-fill" style={{ width: `${calPct}%` }} />
          </div>
        </div>

        {macros.map(m => {
          const val = totals[m.key];
          const pct = calcPercentage(val, m.goal);
          return (
            <div className="macro-card" key={m.key}>
              <div className="macro-icon" style={{ background: m.paleBg }}>{m.icon}</div>
              <div className="macro-label">{m.label}</div>
              <div className="macro-value" style={{ color: m.color }}>{Math.round(val)}<span style={{ fontSize: '1rem', fontWeight: 400 }}>{m.unit}</span></div>
              <div className="macro-bar">
                <div className="macro-bar-fill" style={{ width: `${pct}%`, background: m.color }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', marginTop: 6 }}>
                {pct}% від {m.goal}{m.unit}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom: meals list + right col */}
      <div className="dashboard-bottom">
        <div className="meals-card">
          <div className="meals-header">
            <span className="card-title" style={{ marginBottom: 0 }}>Прийоми їжі</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>{Math.round(totals.calories)} ккал</span>
          </div>

          {MEALS.map(meal => {
            const mealEntries = todayEntries.filter(e => e.meal === meal.id);
            const mealTotals = calcMealTotals(todayEntries, meal.id);
            const isOpen = openMeals[meal.id];

            return (
              <div className="meal-section" key={meal.id}>
                <div className="meal-section-header" onClick={() => toggleMeal(meal.id)}>
                  <div className="meal-section-left">
                    <div className="meal-icon">{meal.icon}</div>
                    <div>
                      <div className="meal-name">{meal.label}</div>
                      <div className="meal-kcal">{Math.round(mealTotals.calories)} ккал · {mealEntries.length} продуктів</div>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={16} color="var(--ink-faint)" /> : <ChevronDown size={16} color="var(--ink-faint)" />}
                </div>

                {isOpen && (
                  <div className="meal-entries">
                    {mealEntries.length === 0 ? (
                      <div style={{ padding: '14px 16px', color: 'var(--ink-faint)', fontSize: '0.83rem' }}>
                        Поки нічого не додано
                      </div>
                    ) : (
                      mealEntries.map(entry => (
                        <div className="meal-entry-row" key={entry.id}>
                          <div>
                            <div className="entry-name">{entry.name}</div>
                            <div className="entry-meta">
                              {entry.amount}{entry.unit} · Б: {Math.round(entry.protein)}г · Ж: {Math.round(entry.fat)}г · В: {Math.round(entry.carbs)}г
                            </div>
                          </div>
                          <div className="entry-right">
                            <div className="entry-kcal">{Math.round(entry.calories)} ккал</div>
                            <button className="entry-delete" onClick={() => removeEntry(todayKey, entry.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {todayEntries.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🥗</div>
              <div className="empty-state-title">Ще нічого не додано</div>
              <div className="empty-state-text">Перейди в «Додати їжу» щоб розпочати</div>
            </div>
          )}
        </div>

        {/* Right: water + quick stats */}
        <div className="right-col">
          <WaterTracker water={water} setWater={setWater} goal={goals.water} />

          <div className="card">
            <div className="card-title">Підсумок дня</div>
            {[
              { label: 'Записів усього', val: `${todayEntries.length} шт` },
              { label: 'Білки', val: `${Math.round(totals.protein)} г` },
              { label: 'Жири', val: `${Math.round(totals.fat)} г` },
              { label: 'Вуглеводи', val: `${Math.round(totals.carbs)} г` },
              { label: 'Вода', val: `${water * 0.25} л / ${goals.water * 0.25} л` },
            ].map(({ label, val }) => (
              <div className="quick-stat" key={label}>
                <span className="stat-label">{label}</span>
                <span className="stat-val">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
