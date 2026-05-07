export const FOOD_DATABASE = [
  // Зернові та злаки
  { id: 1, name: 'Вівсянка', calories: 371, protein: 13, fat: 7, carbs: 67, unit: 'г', category: 'Зернові' },
  { id: 2, name: 'Гречка варена', calories: 92, protein: 3.4, fat: 0.6, carbs: 20, unit: 'г', category: 'Зернові' },
  { id: 3, name: 'Рис білий варений', calories: 130, protein: 2.7, fat: 0.3, carbs: 28, unit: 'г', category: 'Зернові' },
  { id: 4, name: 'Хліб цільнозерновий', calories: 247, protein: 9, fat: 3.5, carbs: 43, unit: 'г', category: 'Зернові' },
  { id: 5, name: 'Макарони варені', calories: 158, protein: 5.8, fat: 0.9, carbs: 31, unit: 'г', category: 'Зернові' },
  { id: 6, name: 'Кукурудзяна крупа', calories: 340, protein: 8, fat: 1.2, carbs: 73, unit: 'г', category: 'Зернові' },

  // Білкові
  { id: 7, name: 'Куряча грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0, unit: 'г', category: 'М\'ясо' },
  { id: 8, name: 'Яловичина (фарш)', calories: 218, protein: 20, fat: 15, carbs: 0, unit: 'г', category: 'М\'ясо' },
  { id: 9, name: 'Лосось', calories: 208, protein: 20, fat: 13, carbs: 0, unit: 'г', category: 'Риба' },
  { id: 10, name: 'Тунець консервований', calories: 132, protein: 29, fat: 1, carbs: 0, unit: 'г', category: 'Риба' },
  { id: 11, name: 'Яйце куряче', calories: 155, protein: 13, fat: 11, carbs: 1.1, unit: 'шт', category: 'Яйця' },
  { id: 12, name: 'Яєчний білок', calories: 52, protein: 11, fat: 0.2, carbs: 0.7, unit: 'г', category: 'Яйця' },
  { id: 13, name: 'Свинина (корейка)', calories: 242, protein: 27, fat: 14, carbs: 0, unit: 'г', category: 'М\'ясо' },
  { id: 14, name: 'Курка гомілка', calories: 185, protein: 28, fat: 8, carbs: 0, unit: 'г', category: 'М\'ясо' },
  { id: 15, name: 'Індичка', calories: 135, protein: 29, fat: 1, carbs: 0, unit: 'г', category: 'М\'ясо' },
  { id: 16, name: 'Тілапія', calories: 96, protein: 20, fat: 2, carbs: 0, unit: 'г', category: 'Риба' },

  // Молочні
  { id: 17, name: 'Творог 5%', calories: 121, protein: 17, fat: 5, carbs: 1.8, unit: 'г', category: 'Молочні' },
  { id: 18, name: 'Грецький йогурт', calories: 97, protein: 9, fat: 5, carbs: 3.6, unit: 'г', category: 'Молочні' },
  { id: 19, name: 'Молоко 2.5%', calories: 52, protein: 2.8, fat: 2.5, carbs: 4.7, unit: 'мл', category: 'Молочні' },
  { id: 20, name: 'Кефір 1%', calories: 40, protein: 3.2, fat: 1, carbs: 4.1, unit: 'мл', category: 'Молочні' },
  { id: 21, name: 'Сир моцарела', calories: 280, protein: 28, fat: 17, carbs: 3.1, unit: 'г', category: 'Молочні' },
  { id: 22, name: 'Сир чеддер', calories: 402, protein: 25, fat: 33, carbs: 1.3, unit: 'г', category: 'Молочні' },
  { id: 23, name: 'Масло вершкове', calories: 717, protein: 0.9, fat: 81, carbs: 0.1, unit: 'г', category: 'Молочні' },

  // Овочі
  { id: 24, name: 'Броколі', calories: 34, protein: 2.8, fat: 0.4, carbs: 7, unit: 'г', category: 'Овочі' },
  { id: 25, name: 'Огірок', calories: 15, protein: 0.7, fat: 0.1, carbs: 3.6, unit: 'г', category: 'Овочі' },
  { id: 26, name: 'Помідор', calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9, unit: 'г', category: 'Овочі' },
  { id: 27, name: 'Шпинат', calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6, unit: 'г', category: 'Овочі' },
  { id: 28, name: 'Морква', calories: 41, protein: 0.9, fat: 0.2, carbs: 10, unit: 'г', category: 'Овочі' },
  { id: 29, name: 'Картопля варена', calories: 87, protein: 1.9, fat: 0.1, carbs: 20, unit: 'г', category: 'Овочі' },
  { id: 30, name: 'Солодкий перець', calories: 31, protein: 1, fat: 0.3, carbs: 6, unit: 'г', category: 'Овочі' },
  { id: 31, name: 'Цибуля ріпчаста', calories: 40, protein: 1.1, fat: 0.1, carbs: 9, unit: 'г', category: 'Овочі' },
  { id: 32, name: 'Часник', calories: 149, protein: 6.4, fat: 0.5, carbs: 33, unit: 'г', category: 'Овочі' },
  { id: 33, name: 'Авокадо', calories: 160, protein: 2, fat: 15, carbs: 9, unit: 'г', category: 'Овочі' },

  // Фрукти
  { id: 34, name: 'Банан', calories: 89, protein: 1.1, fat: 0.3, carbs: 23, unit: 'г', category: 'Фрукти' },
  { id: 35, name: 'Яблуко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14, unit: 'г', category: 'Фрукти' },
  { id: 36, name: 'Апельсин', calories: 47, protein: 0.9, fat: 0.1, carbs: 12, unit: 'г', category: 'Фрукти' },
  { id: 37, name: 'Полуниця', calories: 32, protein: 0.7, fat: 0.3, carbs: 8, unit: 'г', category: 'Фрукти' },
  { id: 38, name: 'Виноград', calories: 69, protein: 0.7, fat: 0.2, carbs: 18, unit: 'г', category: 'Фрукти' },
  { id: 39, name: 'Чорниця', calories: 57, protein: 0.7, fat: 0.3, carbs: 14, unit: 'г', category: 'Фрукти' },

  // Горіхи та насіння
  { id: 40, name: 'Мигдаль', calories: 579, protein: 21, fat: 50, carbs: 22, unit: 'г', category: 'Горіхи' },
  { id: 41, name: 'Волоський горіх', calories: 654, protein: 15, fat: 65, carbs: 14, unit: 'г', category: 'Горіхи' },
  { id: 42, name: 'Арахісова паста', calories: 588, protein: 25, fat: 50, carbs: 20, unit: 'г', category: 'Горіхи' },
  { id: 43, name: 'Насіння чіа', calories: 486, protein: 17, fat: 31, carbs: 42, unit: 'г', category: 'Горіхи' },
  { id: 44, name: 'Гарбузове насіння', calories: 559, protein: 30, fat: 49, carbs: 11, unit: 'г', category: 'Горіхи' },

  // Напої
  { id: 45, name: 'Протеїновий коктейль', calories: 120, protein: 25, fat: 2, carbs: 5, unit: 'мл', category: 'Напої' },
  { id: 46, name: 'Апельсиновий сік', calories: 45, protein: 0.7, fat: 0.2, carbs: 10, unit: 'мл', category: 'Напої' },
  { id: 47, name: 'Зелений чай', calories: 1, protein: 0, fat: 0, carbs: 0.2, unit: 'мл', category: 'Напої' },
  { id: 48, name: 'Кава чорна', calories: 2, protein: 0.3, fat: 0, carbs: 0, unit: 'мл', category: 'Напої' },
];

export const FOOD_CATEGORIES = [...new Set(FOOD_DATABASE.map(f => f.category))];

export const MEALS = [
  { id: 'breakfast', label: 'Сніданок', icon: '🌅', color: '#F59E0B' },
  { id: 'lunch', label: 'Обід', icon: '☀️', color: '#10B981' },
  { id: 'dinner', label: 'Вечеря', icon: '🌙', color: '#6366F1' },
  { id: 'snack', label: 'Перекус', icon: '🍎', color: '#EC4899' },
];
