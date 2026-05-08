export const calculateTotalCalories = (foodLog) => {
  if (!foodLog || foodLog.length === 0) return 0;
  return foodLog.reduce((sum, item) => sum + (item.calories || 0), 0);
};

// Розрахунок калорій за прийомом їжі
export const calculateMealCalories = (foodLog, mealType) => {
  if (!foodLog || foodLog.length === 0) return 0;
  return foodLog
    .filter(item => item.mealType === mealType)
    .reduce((sum, item) => sum + (item.calories || 0), 0);
};

// Розрахунок відсотка прогресу
export const getProgressPercentage = (current, goal) => {
  if (!goal || goal <= 0) return 0;
  const percentage = (current / goal) * 100;
  return percentage > 100 ? 100 : Math.round(percentage);
};

export const getTodayKey = () => {
  return new Date().toISOString().split('T')[0];
};

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const calcDayTotals = (entries = []) => {
  if (!Array.isArray(entries)) return { calories: 0, protein: 0, fat: 0, carbs: 0 };
  return entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + (Number(entry.calories) || 0),
      protein: acc.protein + (Number(entry.protein) || 0),
      fat: acc.fat + (Number(entry.fat) || 0),
      carbs: acc.carbs + (Number(entry.carbs) || 0),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
};

export const calcMealTotals = (foodLog, meals) => {
  // Перевіряємо, що meals - це масив
  if (!foodLog || !meals) return {};
  if (!Array.isArray(meals)) return {};
  
  const result = {};
  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    result[meal] = foodLog
      .filter(item => item.mealType === meal)
      .reduce((sum, item) => sum + (item.calories || 0), 0);
  }
  return result;
};

export const calcPercentage = (current, total) => {
  if (!total || total <= 0) return 0;
  const percentage = (current / total) * 100;
  return percentage > 100 ? 100 : Math.round(percentage);
};

export const formatDateFull = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'short'
  });
};

export const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};