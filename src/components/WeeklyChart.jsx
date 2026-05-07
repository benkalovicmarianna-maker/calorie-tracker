import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, LineChart, Line, Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function WeeklyChart({ weekData, goal }) {
  return (
    <div className="weekly-chart">
      <div className="chart-header">
        <h2>Статистика тижня</h2>
        <div className="chart-legend">
          <span style={{ color: '#C8FF00' }}>■ Калорії</span>
          <span style={{ color: '#4ECDC4' }}>— Ціль</span>
        </div>
      </div>

      <div className="chart-card">
        <h3>Калорії по днях</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="short" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={goal.calories} stroke="#4ECDC4" strokeDasharray="4 4" />
            <Bar dataKey="calories" fill="#C8FF00" radius={[6, 6, 0, 0]} name="Ккал" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Макронутрієнти</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="short" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
            <Line type="monotone" dataKey="protein" stroke="#FF6B6B" strokeWidth={2} dot={{ r: 4 }} name="Білки г" />
            <Line type="monotone" dataKey="fat" stroke="#FFD93D" strokeWidth={2} dot={{ r: 4 }} name="Жири г" />
            <Line type="monotone" dataKey="carbs" stroke="#6BCB77" strokeWidth={2} dot={{ r: 4 }} name="Вуглев. г" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Вода (мл)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="short" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={2500} stroke="#4ECDC4" strokeDasharray="4 4" />
            <Bar dataKey="water" fill="#4FC3F7" radius={[6, 6, 0, 0]} name="Вода мл" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="week-summary">
        <h3>Середнє за тиждень</h3>
        <div className="summary-grid">
          {[
            { label: 'Калорії', value: Math.round(weekData.reduce((s, d) => s + d.calories, 0) / 7), unit: 'ккал', color: '#C8FF00' },
            { label: 'Білки', value: Math.round(weekData.reduce((s, d) => s + d.protein, 0) / 7), unit: 'г', color: '#FF6B6B' },
            { label: 'Жири', value: Math.round(weekData.reduce((s, d) => s + d.fat, 0) / 7), unit: 'г', color: '#FFD93D' },
            { label: 'Вуглев.', value: Math.round(weekData.reduce((s, d) => s + d.carbs, 0) / 7), unit: 'г', color: '#6BCB77' },
            { label: 'Вода', value: Math.round(weekData.reduce((s, d) => s + d.water, 0) / 7), unit: 'мл', color: '#4FC3F7' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="summary-item">
              <div className="summary-value" style={{ color }}>{value}</div>
              <div className="summary-unit">{unit}</div>
              <div className="summary-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
