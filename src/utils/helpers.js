export const getTodayKey = () => new Date().toISOString().split('T')[0];

export const getDateKey = (date) => date.toISOString().split('T')[0];

export const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      key: getDateKey(d),
      label: d.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric' }),
      short: d.toLocaleDateString('uk-UA', { weekday: 'short' }),
    });
  }
  return days;
};

export const formatCalories = (cal) => Math.round(cal);

export const getMacroColor = (macro) => {
  const colors = {
    protein: '#FF6B6B',
    fat: '#FFD93D',
    carbs: '#6BCB77',
  };
  return colors[macro] || '#ccc';
};

export const getMealIcon = (meal) => {
  const icons = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🍎',
  };
  return icons[meal] || '🍽️';
};

export const getMealLabel = (meal) => {
  const labels = {
    breakfast: 'Сніданок',
    lunch: 'Обід',
    dinner: 'Вечеря',
    snack: 'Перекус',
  };
  return labels[meal] || meal;
};
