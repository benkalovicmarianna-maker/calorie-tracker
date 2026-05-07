import { format, subDays, startOfDay, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';

export const getTodayKey = () => format(new Date(), 'yyyy-MM-dd');

export const formatDate = (dateStr) => {
  try {
    const date = parseISO(dateStr);
    return format(date, 'd MMM', { locale: uk });
  } catch {
    return dateStr;
  }
};

export const formatDateFull = (dateStr) => {
  try {
    const date = parseISO(dateStr);
    return format(date, 'EEEE, d MMMM', { locale: uk });
  } catch {
    return dateStr;
  }
};

export const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return format(date, 'yyyy-MM-dd');
  });
};

export const calcDayTotals = (entries = []) => {
  return entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + (entry.calories || 0),
      protein: acc.protein + (entry.protein || 0),
      fat: acc.fat + (entry.fat || 0),
      carbs: acc.carbs + (entry.carbs || 0),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
};

export const calcMealTotals = (entries = [], mealId) => {
  return calcDayTotals(entries.filter(e => e.meal === mealId));
};

export const calcPercentage = (value, goal) => {
  if (!goal || goal <= 0) return 0;
  return Math.min(100, Math.round((value / goal) * 100));
};

export const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
