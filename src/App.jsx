import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getTodayKey, getLast7Days } from './utils/helpers';
import Dashboard from './components/Dashboard';
import FoodLog from './components/FoodLog';
import WeeklyChart from './components/WeeklyChart';
import WaterTracker from './components/WaterTracker';
import GoalSettings from './components/GoalSettings';
import Navigation from './components/Navigation';
import './index.css';

const defaultGoal = { calories: 2000, protein: 120, fat: 65, carbs: 250 };

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goal, setGoal] = useLocalStorage('nutritrack-goal', defaultGoal);
  const [allDays, setAllDays] = useLocalStorage('nutritrack-days', {});
  const [waterData, setWaterData] = useLocalStorage('nutritrack-water', {});

  const todayKey = getTodayKey();
  const todayMeals = allDays[todayKey] || { breakfast: [], lunch: [], dinner: [], snack: [] };
  const todayWater = waterData[todayKey] || 0;

  const updateTodayMeals = (meals) => {
    setAllDays(prev => ({ ...prev, [todayKey]: meals }));
  };

  const updateTodayWater = (amount) => {
    setWaterData(prev => ({ ...prev, [todayKey]: amount }));
  };

  const addFood = (meal, foodItem, grams) => {
    const multiplier = grams / 100;
    const entry = {
      id: Date.now(),
      name: foodItem.name,
      emoji: foodItem.emoji,
      grams,
      calories: Math.round(foodItem.calories * multiplier),
      protein: Math.round(foodItem.protein * multiplier * 10) / 10,
      fat: Math.round(foodItem.fat * multiplier * 10) / 10,
      carbs: Math.round(foodItem.carbs * multiplier * 10) / 10,
    };
    const updated = {
      ...todayMeals,
      [meal]: [...(todayMeals[meal] || []), entry],
    };
    updateTodayMeals(updated);
  };

  const removeFood = (meal, id) => {
    const updated = {
      ...todayMeals,
      [meal]: todayMeals[meal].filter(item => item.id !== id),
    };
    updateTodayMeals(updated);
  };

  const getTotals = (meals) => {
    const all = Object.values(meals).flat();
    return {
      calories: all.reduce((s, i) => s + i.calories, 0),
      protein: Math.round(all.reduce((s, i) => s + i.protein, 0) * 10) / 10,
      fat: Math.round(all.reduce((s, i) => s + i.fat, 0) * 10) / 10,
      carbs: Math.round(all.reduce((s, i) => s + i.carbs, 0) * 10) / 10,
    };
  };

  const weekData = getLast7Days().map(day => {
    const meals = allDays[day.key] || { breakfast: [], lunch: [], dinner: [], snack: [] };
    return {
      ...day,
      ...getTotals(meals),
      water: waterData[day.key] || 0,
    };
  });

  const todayTotals = getTotals(todayMeals);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">NutriTrack</span>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'dashboard' && (
          <Dashboard
            totals={todayTotals}
            goal={goal}
            meals={todayMeals}
            water={todayWater}
            onUpdateWater={updateTodayWater}
          />
        )}
        {activeTab === 'log' && (
          <FoodLog
            meals={todayMeals}
            onAddFood={addFood}
            onRemoveFood={removeFood}
          />
        )}
        {activeTab === 'chart' && (
          <WeeklyChart weekData={weekData} goal={goal} />
        )}
        {activeTab === 'water' && (
          <WaterTracker water={todayWater} onUpdate={updateTodayWater} />
        )}
        {activeTab === 'settings' && (
          <GoalSettings goal={goal} onSave={setGoal} />
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
