# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: calorie-tracker.spec.js >> Calorie Tracker - Наскрізне тестування >> №4: Додавання води через водний трекер
- Location: tests\e2e\calorie-tracker.spec.js:76:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Water/i })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: "[plugin:vite:import-analysis] Failed to resolve import \"lucide-react\" from \"src/components/GoalSettings.jsx\". Does the file exist?"
  - generic [ref=e5]: D:/marianna/calorie-tracker/src/components/GoalSettings.jsx:2:22
  - generic [ref=e6]: "17 | var _s = $RefreshSig$(); 18 | import { useState } from \"react\"; 19 | import { Check } from \"lucide-react\"; | ^ 20 | const GOAL_FIELDS = [ 21 | { key: \"calories\", label: \"Денна ціль калорій\", icon: \"🔥\", unit: \"ккал\", min: 1e3, max: 5e3, desc: \"Рекомендовано: 1600–2400 ккал для жінок\" },"
  - generic [ref=e7]: at TransformPluginContext._formatError (file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49258:41) at TransformPluginContext.error (file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49253:16) at normalizeUrl (file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64307:23) at process.processTicksAndRejections (node:internal/process/task_queues:103:5) at async file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64439:39 at async Promise.all (index 4) at async TransformPluginContext.transform (file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:64366:7) at async PluginContainer.transform (file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:49099:18) at async loadAndTransform (file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:51978:27) at async viteTransformMiddleware (file:///D:/marianna/calorie-tracker/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:62106:24
  - generic [ref=e8]:
    - text: Click outside, press Esc key, or fix the code to dismiss.
    - text: You can also disable this overlay by setting
    - code [ref=e9]: server.hmr.overlay
    - text: to
    - code [ref=e10]: "false"
    - text: in
    - code [ref=e11]: vite.config.js
    - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Calorie Tracker - Наскрізне тестування', () => {
  4  | 
  5  |   test('№1: Запуск додатку та відображення основних елементів', async ({ page }) => {
  6  |     // Відкриваємо головну сторінку
  7  |     await page.goto('http://localhost:5173');
  8  |     
  9  |     // Перевіряємо, що заголовок додатку відображається
  10 |     await expect(page.getByText('Calorie Tracker')).toBeVisible();
  11 |     
  12 |     // Перевіряємо наявність навігації
  13 |     await expect(page.getByRole('button', { name: /Dashboard/i })).toBeVisible();
  14 |     await expect(page.getByRole('button', { name: /Food Log/i })).toBeVisible();
  15 |     await expect(page.getByRole('button', { name: /Water/i })).toBeVisible();
  16 |     
  17 |     // Перевіряємо, що відображається денна ціль калорій
  18 |     await expect(page.getByText(/Daily Goal/i)).toBeVisible();
  19 |     
  20 |     // Перевіряємо, що графік або статистика відображаються
  21 |     await expect(page.getByText(/Progress/i)).toBeVisible();
  22 |   });
  23 | 
  24 |   test('№2: Додавання страви до щоденника', async ({ page }) => {
  25 |     // Відкриваємо сторінку
  26 |     await page.goto('http://localhost:5173');
  27 |     
  28 |     // Переходимо на вкладку Food Log
  29 |     await page.getByRole('button', { name: /Food Log/i }).click();
  30 |     
  31 |     // Перевіряємо, що форма додавання відображається
  32 |     await expect(page.getByPlaceholder(/Search food/i)).toBeVisible();
  33 |     
  34 |     // Вводимо назву страви (наприклад, "Кава")
  35 |     await page.getByPlaceholder(/Search food/i).fill('Кава');
  36 |     
  37 |     // Натискаємо кнопку пошуку або додавання
  38 |     await page.getByRole('button', { name: /Search/i }).click();
  39 |     
  40 |     // Перевіряємо, що результат пошуку з'явився
  41 |     await expect(page.getByText(/Кава/i)).toBeVisible();
  42 |     
  43 |     // Додаємо страву
  44 |     await page.getByRole('button', { name: /Add/i }).first().click();
  45 |     
  46 |     // Перевіряємо, що страва з'явилась у списку
  47 |     await expect(page.getByText(/Кава/i)).toBeVisible();
  48 |   });
  49 | 
  50 |   test('№3: Перегляд та зміна денної цілі калорій', async ({ page }) => {
  51 |     // Відкриваємо сторінку
  52 |     await page.goto('http://localhost:5173');
  53 |     
  54 |     // Переходимо на вкладку Settings
  55 |     await page.getByRole('button', { name: /Settings/i }).click();
  56 |     
  57 |     // Перевіряємо, що поле для введення цілі відображається
  58 |     await expect(page.getByPlaceholder(/Enter daily goal/i)).toBeVisible();
  59 |     
  60 |     // Отримуємо поточне значення
  61 |     const currentGoal = await page.getByPlaceholder(/Enter daily goal/i).inputValue();
  62 |     
  63 |     // Змінюємо ціль
  64 |     await page.getByPlaceholder(/Enter daily goal/i).fill('2000');
  65 |     
  66 |     // Натискаємо кнопку збереження
  67 |     await page.getByRole('button', { name: /Save/i }).click();
  68 |     
  69 |     // Переходимо назад на Dashboard
  70 |     await page.getByRole('button', { name: /Dashboard/i }).click();
  71 |     
  72 |     // Перевіряємо, що нова ціль відображається
  73 |     await expect(page.getByText(/2000/i)).toBeVisible();
  74 |   });
  75 | 
  76 |   test('№4: Додавання води через водний трекер', async ({ page }) => {
  77 |     // Відкриваємо сторінку
  78 |     await page.goto('http://localhost:5173');
  79 |     
  80 |     // Переходимо на вкладку Water
> 81 |     await page.getByRole('button', { name: /Water/i }).click();
     |                                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  82 |     
  83 |     // Перевіряємо, що водний трекер відображається
  84 |     await expect(page.getByText(/Water Tracker/i)).toBeVisible();
  85 |     
  86 |     // Натискаємо кнопку додавання води (+250 ml)
  87 |     await page.getByRole('button', { name: /\+250/i }).click();
  88 |     
  89 |     // Перевіряємо, що кількість води збільшилась
  90 |     await expect(page.getByText(/250/i)).toBeVisible();
  91 |     
  92 |     // Додаємо ще води
  93 |     await page.getByRole('button', { name: /\+250/i }).click();
  94 |     
  95 |     // Перевіряємо, що тепер 500 ml
  96 |     await expect(page.getByText(/500/i)).toBeVisible();
  97 |   });
  98 | });
```