import React, { useState, useCallback, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import FoodLog from './components/FoodLog';
import Stats from './components/Stats';
import GoalSettings from './components/GoalSettings';
import ToastContainer from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getTodayKey } from './utils/helpers';
import posthog from 'posthog-js';
import * as Sentry from "@sentry/react";
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
  const [isNewTheme, setIsNewTheme] = useState(false);

   // Генерація або отримання унікального ID користувача
   const getUserId = () => {
    let userId = localStorage.getItem('calorie_tracker_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem('calorie_tracker_user_id', userId);
    }
    return userId;
  };
  // Налаштування контексту користувача в Sentry
  useEffect(() => {
    const userId = getUserId();
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
    
    Sentry.setUser({
      id: userId,
      segment: isMobile ? 'mobile_user' : 'desktop_user',
      device_type: isMobile ? 'mobile' : 'desktop',
    });
    
    // Також додаємо теги для кращої фільтрації
    Sentry.setTag('app_version', '1.0.0');
    Sentry.setTag('user_type', 'anonymous');
    
    console.log('✅ Sentry user context set:', userId);
  }, []);
  // Перевірка прапорця feature flag - ПРИМУСОВА
  useEffect(() => {
    // Функція для перевірки прапорця
    const checkFeatureFlag = () => {
      if (posthog) {
        try {
          const flag = posthog.isFeatureEnabled('new_visual_theme');
          console.log('Feature flag new_visual_theme:', flag);
          setIsNewTheme(flag);
          
          // Додаємо/видаляємо клас напряму для надійності
          const appWrapper = document.querySelector('.app-wrapper');
          if (appWrapper) {
            if (flag) {
              appWrapper.classList.add('new-theme');
            } else {
              appWrapper.classList.remove('new-theme');
            }
          }
        } catch (e) {
          console.error('Error checking feature flag:', e);
        }
      }
    };

    // Перевіряємо одразу
    checkFeatureFlag();
    
    // Перевіряємо ще раз через 1 секунду
    const timer = setTimeout(checkFeatureFlag, 1000);
    
    // Перевіряємо ще раз через 3 секунди
    const timer2 = setTimeout(checkFeatureFlag, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  // Слідкуємо за зміною isNewTheme і оновлюємо клас
  useEffect(() => {
    const appWrapper = document.querySelector('.app-wrapper');
    if (appWrapper) {
      if (isNewTheme) {
        appWrapper.classList.add('new-theme');
        console.log('✅ New theme applied');
      } else {
        appWrapper.classList.remove('new-theme');
        console.log('❌ New theme removed');
      }
    }
  }, [isNewTheme]);

  // Скидання контексту користувача (для тестування)
const resetUserContext = () => {
  localStorage.removeItem('calorie_tracker_user_id');
  Sentry.setUser(null);
  window.location.reload();
};

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
    // Відправляємо подію в PostHog
  posthog.capture('food_added', {
    food_name: entry.name,
    calories: entry.calories,
    meal_type: entry.meal,
    amount: entry.amount,
    unit: entry.unit,
  });
  }, [setEntries]);

  const removeEntry = useCallback((dateKey, entryId) => {
    // Знаходимо запис перед видаленням
  const entry = entries[dateKey]?.find(e => e.id === entryId);
    setEntries(prev => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter(e => e.id !== entryId),
    }));
    // Відправляємо подію в PostHog
  if (entry) {
    posthog.capture('food_removed', {
      food_name: entry.name,
      calories: entry.calories,
      meal_type: entry.meal,
    });
  }
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
<footer style={{
  textAlign: 'center',
  padding: '15px',
  marginTop: '20px',
  borderTop: '1px solid #e0e0e0',
  fontSize: '12px',
  color: import.meta.env.VITE_APP_STATUS === 'PRODUCTION' ? '#22c55e' : '#f59e0b'
}}>
  📱 Calorie Tracker | Режим: <strong>{import.meta.env.VITE_APP_STATUS}</strong>
</footer>
   {/* Візуальний індикатор ID користувача */}
   <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      fontSize: '10px',
      background: 'rgba(0,0,0,0.5)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      ID: {localStorage.getItem('calorie_tracker_user_id')?.slice(-8)}
    </div>
  </div>
);
}
