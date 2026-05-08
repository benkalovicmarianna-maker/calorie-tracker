import { describe, it, expect } from 'vitest';
import { calculateTotalCalories, calculateMealCalories, getProgressPercentage } from '../utils/helpers';

describe('Калькулятор калорій', () => {
  it('№1: правильно рахує загальну кількість калорій за день', () => {
    const foodLog = [
      { calories: 450, mealType: 'сніданок' },
      { calories: 650, mealType: 'обід' },
      { calories: 350, mealType: 'вечеря' },
      { calories: 120, mealType: 'перекус' },
    ];
    
    const total = calculateTotalCalories(foodLog);
    expect(total).toBe(1570);
  });

  it('№2: повертає 0, якщо список страв порожній', () => {
    const total = calculateTotalCalories([]);
    expect(total).toBe(0);
  });

  it('№3: правильно рахує калорії для конкретного прийому їжі', () => {
    const foodLog = [
      { calories: 450, mealType: 'сніданок' },
      { calories: 350, mealType: 'сніданок' },
      { calories: 650, mealType: 'обід' },
    ];
    
    const breakfastCalories = calculateMealCalories(foodLog, 'сніданок');
    expect(breakfastCalories).toBe(800);
  });

  it('№4: повертає 0, якщо немає страв для вказаного прийому', () => {
    const foodLog = [{ calories: 650, mealType: 'обід' }];
    const dinnerCalories = calculateMealCalories(foodLog, 'вечеря');
    expect(dinnerCalories).toBe(0);
  });

  it('№5: правильно рахує відсоток досягнення денної цілі', () => {
    const progress = getProgressPercentage(1500, 2000);
    expect(progress).toBe(75);
  });

  it('№6: не перевищує 100%, навіть якщо калорій більше за ціль', () => {
    const progress = getProgressPercentage(2500, 2000);
    expect(progress).toBe(100);
  });

  it('№7: повертає 0, якщо ціль не встановлена', () => {
    const progress = getProgressPercentage(1500, 0);
    expect(progress).toBe(0);
  });
});