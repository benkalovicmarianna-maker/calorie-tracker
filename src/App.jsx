import { useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import FoodLog from './components/FoodLog';
import Stats from './components/Stats';
import GoalSettings from './components/GoalSettings';
import ToastContainer from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getTodayKey } from './utils/helpers';

const DEFAULT_GOALS = {
  calories: 2000,
  protein: 120,
  fat: 65,
  carbs: 250,
  water: 8,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [entries, setEntries] = useLocalStorage('nutritrack-entries', {});
  const [goals, setGoals] = useLocalStorage('nutritrack-goals', DEFAULT_GOALS);
  const [water, setWater] = useLocalStorage('nutritrack-water-' + getTodayKey(), 0);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = '') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addEntry = useCallback((dateKey, entry) => {
    setEntries(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), entry],
    }));
  }, [setEntries]);

  const removeEntry = useCallback((dateKey, entryId) => {
    setEntries(prev => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter(e => e.id !== entryId),
    }));
    showToast('Запис видалено');
  }, [setEntries, showToast]);

  const pages = {
    dashboard: <Dashboard entries={entries} goals={goals} water={water} setWater={setWater} removeEntry={removeEntry} />,
    'food-log': <FoodLog addEntry={addEntry} showToast={showToast} />,
    stats: <Stats entries={entries} goals={goals} />,
    goals: <GoalSettings goals={goals} setGoals={setGoals} showToast={showToast} />,
  };

  return (
    <div className="app-wrapper">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {pages[activeTab]}
      </main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
