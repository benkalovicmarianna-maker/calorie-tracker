import { describe, it, expect } from 'vitest';
import { searchFoods } from '../data/foodDatabase';

describe('Пошук продуктів', () => {
  it('№8: знаходить продукти за назвою', () => {
    const results = searchFoods('кава'); // або будь-який продукт, який точно є в базі
    expect(results.length).toBeGreaterThan(0);
  });

  it('№9: повертає порожній масив, якщо нічого не знайдено', () => {
    const results = searchFoods('неіснуючийпродукт123');
    expect(results).toEqual([]);
  });
});