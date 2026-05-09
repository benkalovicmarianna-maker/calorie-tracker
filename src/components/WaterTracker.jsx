import React, { useState } from 'react';
import posthog from 'posthog-js';

export default function WaterTracker({ water, setWater, goal = 8 }) {
  const glasses = Array.from({ length: goal }, (_, i) => i < water);

  const handleGlassClick = (index, newWaterValue) => {
    const wasFilled = index < water;
    const newWater = wasFilled ? index : index + 1;
    
    setWater(newWater);
    
    // Відправляємо подію в PostHog тільки коли додаємо воду (не видаляємо)
    if (!wasFilled) {
      posthog.capture('water_added', {
        amount_ml: 250,
        total_ml: newWater * 250,
        glass_number: index + 1,
        total_glasses: goal,
      });
    }
  };

  return (
    <div className="water-card">
      <div className="water-title">💧 Трекер води</div>
      <div className="water-subtitle">Натисни на склянку щоб відмітити</div>

      <div className="water-glasses">
        {glasses.map((filled, i) => (
          <div
            key={i}
            className={`water-glass${filled ? ' filled' : ''}`}
            onClick={() => handleGlassClick(i, water)}
            title={`${(i + 1) * 250} мл`}
          >
            {filled ? '💧' : '○'}
          </div>
        ))}
      </div>

      <div className="water-info">
        <span>{water * 250} мл випито</span>
        <span className="water-count">{water}<span style={{ fontSize: '0.8rem', opacity: 0.6 }}>/{goal}</span></span>
      </div>
    </div>
  );
}