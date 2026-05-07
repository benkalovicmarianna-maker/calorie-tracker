import { useState } from 'react';
import { foodDatabase } from '../data/foodDatabase';
import { getMealIcon, getMealLabel } from '../utils/helpers';
import { Search, Plus, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';

function AddFoodModal({ meal, onAdd, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState(100);
  const [tab, setTab] = useState('search');
  const [custom, setCustom] = useState({ name: '', calories: '', protein: '', fat: '', carbs: '' });

  const results = query.length >= 2
    ? foodDatabase.filter(f => f.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  const handleAdd = () => {
    if (tab === 'search' && selected) {
      onAdd(meal, selected, Number(grams));
      onClose();
    } else if (tab === 'custom' && custom.name && custom.calories) {
      onAdd(meal, {
        name: custom.name,
        emoji: '🍽️',
        calories: Number(custom.calories),
        protein: Number(custom.protein) || 0,
        fat: Number(custom.fat) || 0,
        carbs: Number(custom.carbs) || 0,
      }, Number(grams));
      onClose();
    }
  };

  const preview = selected && tab === 'search' ? {
    calories: Math.round(selected.calories * grams / 100),
    protein: Math.round(selected.protein * grams / 100 * 10) / 10,
    fat: Math.round(selected.fat * grams / 100 * 10) / 10,
    carbs: Math.round(selected.carbs * grams / 100 * 10) / 10,
  } : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Додати до: {getMealIcon(meal)} {getMealLabel(meal)}</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-tabs">
          <button className={`modal-tab ${tab === 'search' ? 'active' : ''}`} onClick={() => setTab('search')}>
            🔍 Пошук
          </button>
          <button className={`modal-tab ${tab === 'custom' ? 'active' : ''}`} onClick={() => setTab('custom')}>
            ✏️ Своя їжа
          </button>
        </div>

        {tab === 'search' && (
          <>
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Введіть назву продукту..."
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(null); }}
                autoFocus
              />
            </div>

            {results.length > 0 && (
              <div className="search-results">
                {results.map(food => (
                  <button
                    key={food.id}
                    className={`search-result-item ${selected?.id === food.id ? 'selected' : ''}`}
                    onClick={() => setSelected(food)}
                  >
                    <span className="result-emoji">{food.emoji}</span>
                    <div className="result-info">
                      <span className="result-name">{food.name}</span>
                      <span className="result-meta">{food.calories} ккал / 100г · Б:{food.protein}г Ж:{food.fat}г В:{food.carbs}г</span>
                    </div>
                    {selected?.id === food.id && <span className="result-check">✓</span>}
                  </button>
                ))}
              </div>
            )}

            {query.length >= 2 && results.length === 0 && (
              <div className="no-results">Нічого не знайдено 😔 Спробуй вкладку "Своя їжа"</div>
            )}
          </>
        )}

        {tab === 'custom' && (
          <div className="custom-form">
            <input className="form-input" placeholder="Назва страви *" value={custom.name}
              onChange={e => setCustom(p => ({ ...p, name: e.target.value }))} />
            <div className="form-row">
              <input className="form-input" placeholder="Ккал *" type="number" value={custom.calories}
                onChange={e => setCustom(p => ({ ...p, calories: e.target.value }))} />
              <input className="form-input" placeholder="Білки г" type="number" value={custom.protein}
                onChange={e => setCustom(p => ({ ...p, protein: e.target.value }))} />
            </div>
            <div className="form-row">
              <input className="form-input" placeholder="Жири г" type="number" value={custom.fat}
                onChange={e => setCustom(p => ({ ...p, fat: e.target.value }))} />
              <input className="form-input" placeholder="Вуглеводи г" type="number" value={custom.carbs}
                onChange={e => setCustom(p => ({ ...p, carbs: e.target.value }))} />
            </div>
          </div>
        )}

        {(selected || tab === 'custom') && (
          <div className="grams-section">
            <label>Грамів:</label>
            <div className="grams-input-wrap">
              <button onClick={() => setGrams(g => Math.max(10, g - 10))}>−</button>
              <input type="number" value={grams} onChange={e => setGrams(Number(e.target.value))} min="10" max="2000" />
              <button onClick={() => setGrams(g => g + 10)}>+</button>
            </div>
            <div className="gram-presets">
              {[50, 100, 150, 200].map(g => (
                <button key={g} className={`gram-preset ${grams === g ? 'active' : ''}`} onClick={() => setGrams(g)}>{g}г</button>
              ))}
            </div>
          </div>
        )}

        {preview && (
          <div className="preview-bar">
            <span>🔥 {preview.calories} ккал</span>
            <span>Б: {preview.protein}г</span>
            <span>Ж: {preview.fat}г</span>
            <span>В: {preview.carbs}г</span>
          </div>
        )}

        <button
          className="add-btn"
          onClick={handleAdd}
          disabled={tab === 'search' ? !selected : !custom.name || !custom.calories}
        >
          <Plus size={18} /> Додати
        </button>
      </div>
    </div>
  );
}

function MealSection({ type, items, onAdd, onRemove }) {
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const total = items.reduce((s, i) => s + i.calories, 0);

  return (
    <div className="meal-section">
      <div className="meal-section-header" onClick={() => setOpen(o => !o)}>
        <div className="meal-section-left">
          <span className="meal-icon">{getMealIcon(type)}</span>
          <span className="meal-name">{getMealLabel(type)}</span>
          <span className="meal-cal-badge">{total} ккал</span>
        </div>
        <div className="meal-section-right">
          <button className="add-food-btn" onClick={e => { e.stopPropagation(); setShowModal(true); }}>
            <Plus size={16} />
          </button>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {open && (
        <div className="meal-items">
          {items.length === 0 && (
            <div className="meal-empty" onClick={() => setShowModal(true)}>
              Натисни + щоб додати їжу
            </div>
          )}
          {items.map(item => (
            <div key={item.id} className="food-item">
              <span className="food-emoji">{item.emoji}</span>
              <div className="food-info">
                <span className="food-name">{item.name}</span>
                <span className="food-meta">{item.grams}г · Б:{item.protein} Ж:{item.fat} В:{item.carbs}</span>
              </div>
              <span className="food-cal">{item.calories} ккал</span>
              <button className="remove-btn" onClick={() => onRemove(type, item.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && <AddFoodModal meal={type} onAdd={onAdd} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default function FoodLog({ meals, onAddFood, onRemoveFood }) {
  const totalCal = Object.values(meals).flat().reduce((s, i) => s + i.calories, 0);

  return (
    <div className="food-log">
      <div className="food-log-header">
        <h2>Щоденник їжі</h2>
        <div className="total-today">
          <span className="total-label">Сьогодні:</span>
          <span className="total-value">{totalCal} ккал</span>
        </div>
      </div>

      <div className="meal-sections">
        {['breakfast', 'lunch', 'dinner', 'snack'].map(meal => (
          <MealSection
            key={meal}
            type={meal}
            items={meals[meal] || []}
            onAdd={onAddFood}
            onRemove={onRemoveFood}
          />
        ))}
      </div>
    </div>
  );
}
