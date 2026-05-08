import React from 'react';
import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { FOOD_DATABASE, FOOD_CATEGORIES, MEALS } from '../data/foodDatabase';
import { getTodayKey, generateId } from '../utils/helpers';

export default function FoodLog({ addEntry, showToast }) {
  const [tab, setTab] = useState('search'); // 'search' | 'manual'
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState(100);
  const [meal, setMeal] = useState('breakfast');

  // Manual form
  const [manual, setManual] = useState({ name: '', calories: '', protein: '', fat: '', carbs: '', amount: 100, unit: 'г' });

  const filtered = useMemo(() => {
    return FOOD_DATABASE.filter(f => {
      const matchQ = f.name.toLowerCase().includes(query.toLowerCase());
      const matchC = category === 'all' || f.category === category;
      return matchQ && matchC;
    });
  }, [query, category]);

  const preview = useMemo(() => {
    if (!selected) return null;
    const ratio = amount / 100;
    return {
      calories: Math.round(selected.calories * ratio),
      protein: Math.round(selected.protein * ratio * 10) / 10,
      fat: Math.round(selected.fat * ratio * 10) / 10,
      carbs: Math.round(selected.carbs * ratio * 10) / 10,
    };
  }, [selected, amount]);

  const handleAdd = () => {
    if (!selected || !amount) return;
    if (Number(amount) <= 0 || isNaN(Number(amount))) return; 
    const ratio = amount / 100;
    addEntry(getTodayKey(), {
      id: generateId(),
      name: selected.name,
      amount: Number(amount),
      unit: selected.unit,
      meal,
      calories: selected.calories * ratio,
      protein: selected.protein * ratio,
      fat: selected.fat * ratio,
      carbs: selected.carbs * ratio,
    });
    showToast(`✓ ${selected.name} додано до ${MEALS.find(m => m.id === meal)?.label}`, 'success');
    setSelected(null);
    setAmount(100);
  };

  const handleManualAdd = () => {
    const { name, calories, protein, fat, carbs, amount: amt, unit } = manual;
    if (!name || !calories) return;
    addEntry(getTodayKey(), {
      id: generateId(),
      name,
      amount: Number(amt) || 100,
      unit: unit || 'г',
      meal,
      calories: Number(calories),
      protein: Number(protein) || 0,
      fat: Number(fat) || 0,
      carbs: Number(carbs) || 0,
    });
    showToast(`✓ ${name} додано`, 'success');
    setManual({ name: '', calories: '', protein: '', fat: '', carbs: '', amount: 100, unit: 'г' });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Додати їжу</h1>
        <p className="page-subtitle">Знайди продукт або введи вручну</p>
      </div>

      <div className="add-food-layout">
        {/* Left: search / manual */}
        <div>
          <div className="card" style={{ padding: '20px' }}>
            <div className="tabs">
              <button className={`tab-btn${tab === 'search' ? ' active' : ''}`} onClick={() => setTab('search')}>
                🔍 Пошук в базі
              </button>
              <button className={`tab-btn${tab === 'manual' ? ' active' : ''}`} onClick={() => setTab('manual')}>
                ✏️ Вручну
              </button>
            </div>

            {tab === 'search' && (
              <>
                <div className="search-bar">
                  <Search size={16} className="search-icon" />
                  <input
                    className="search-input"
                    placeholder="Пошук продуктів..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>

                <div className="category-filters">
                  <button className={`cat-btn${category === 'all' ? ' active' : ''}`} onClick={() => setCategory('all')}>
                    Всі
                  </button>
                  {FOOD_CATEGORIES.map(c => (
                    <button
                      key={c}
                      className={`cat-btn${category === c ? ' active' : ''}`}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="food-list">
                  {filtered.length === 0 && (
                    <div className="empty-state" style={{ padding: '24px' }}>
                      <div className="empty-state-icon">🔍</div>
                      <div className="empty-state-title">Нічого не знайдено</div>
                    </div>
                  )}
                  {filtered.map(food => (
                    <div
                      key={food.id}
                      className={`food-item${selected?.id === food.id ? ' selected' : ''}`}
                      onClick={() => { setSelected(food); setAmount(100); }}
                    >
                      <div>
                        <div className="food-item-name">{food.name}</div>
                        <div className="food-item-cat">{food.category}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="food-item-kcal">{food.calories} ккал</div>
                        <div className="food-item-unit">на 100{food.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'manual' && (
              <div>
                <div className="form-group">
                  <label className="form-label">Назва</label>
                  <input className="form-input" placeholder="Наприклад: Омлет" value={manual.name} onChange={e => setManual(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div className="form-group">
                    <label className="form-label">Ккал</label>
                    <input className="form-input" type="number" placeholder="0" value={manual.calories} onChange={e => setManual(p => ({ ...p, calories: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Кількість</label>
                    <input className="form-input" type="number" placeholder="100" value={manual.amount} onChange={e => setManual(p => ({ ...p, amount: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Білки, г</label>
                    <input className="form-input" type="number" placeholder="0" value={manual.protein} onChange={e => setManual(p => ({ ...p, protein: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Жири, г</label>
                    <input className="form-input" type="number" placeholder="0" value={manual.fat} onChange={e => setManual(p => ({ ...p, fat: e.target.value }))} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Вуглеводи, г</label>
                    <input className="form-input" type="number" placeholder="0" value={manual.carbs} onChange={e => setManual(p => ({ ...p, carbs: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Прийом їжі</label>
                  <select className="form-select" value={meal} onChange={e => setMeal(e.target.value)}>
                    {MEALS.map(m => <option key={m.id} value={m.id}>{m.icon} {m.label}</option>)}
                  </select>
                </div>
                <button className="btn-primary" onClick={handleManualAdd} disabled={!manual.name || !manual.calories}>
                  <Plus size={16} style={{ display: 'inline', marginRight: 6 }} />
                  Додати запис
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Add form */}
        <div>
          <div className="add-form-card">
            {!selected && tab === 'search' ? (
              <div className="empty-state">
                <div className="empty-state-icon">👈</div>
                <div className="empty-state-title">Обери продукт</div>
                <div className="empty-state-text">Натисни на продукт зліва щоб додати його</div>
              </div>
            ) : tab === 'search' && selected ? (
              <>
                <div className="selected-food-name">{selected.name}</div>
                <div className="selected-food-meta">{selected.category} · {selected.calories} ккал / 100{selected.unit}</div>

                <div className="form-group">
                  <label className="form-label">Кількість ({selected.unit})</label>
                  <input
                    className="form-input"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                  />
                </div>

                {preview && (
                  <div className="macro-preview">
                    {[
                      { label: 'Ккал', val: preview.calories },
                      { label: 'Білки', val: `${preview.protein}г` },
                      { label: 'Жири', val: `${preview.fat}г` },
                      { label: 'Вуглеводи', val: `${preview.carbs}г` },
                    ].map(({ label, val }) => (
                      <div className="preview-item" key={label}>
                        <div className="preview-label">{label}</div>
                        <div className="preview-val">{val}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Прийом їжі</label>
                  <select className="form-select" value={meal} onChange={e => setMeal(e.target.value)}>
                    {MEALS.map(m => <option key={m.id} value={m.id}>{m.icon} {m.label}</option>)}
                  </select>
                </div>

                <button className="btn-primary" onClick={handleAdd}>
                  <Plus size={16} style={{ display: 'inline', marginRight: 6 }} />
                  Додати до журналу
                </button>
              </>
            ) : null}

            {tab === 'manual' && (
              <div className="empty-state">
                <div className="empty-state-icon">✏️</div>
                <div className="empty-state-title">Ручний запис</div>
                <div className="empty-state-text">Заповни форму зліва і натисни «Додати»</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
