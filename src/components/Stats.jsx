import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { getLast7Days, formatDate, calcDayTotals } from '../utils/helpers';

const COLORS = ['#4A7C59', '#C2783C', '#3B6B8A'];

export default function Stats({ entries, goals }) {
  const days = getLast7Days();

  const weekData = days.map(day => {
    const totals = calcDayTotals(entries[day] || []);
    return {
      date: formatDate(day),
      calories: Math.round(totals.calories),
      protein: Math.round(totals.protein),
      fat: Math.round(totals.fat),
      carbs: Math.round(totals.carbs),
      goal: goals.calories,
    };
  });

  // Average
  const avgCal = Math.round(weekData.reduce((s, d) => s + d.calories, 0) / 7);
  const avgDays = weekData.filter(d => d.calories > 0).length;

  // Today macro pie
  const todayTotals = calcDayTotals(entries[days[days.length - 1]] || []);
  const pieData = [
    { name: 'Білки', value: Math.round(todayTotals.protein * 4) },
    { name: 'Жири', value: Math.round(todayTotals.fat * 9) },
    { name: 'Вуглеводи', value: Math.round(todayTotals.carbs * 4) },
  ].filter(d => d.value > 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--warm-white)', border: '1px solid var(--sand)', borderRadius: 10, padding: '10px 14px', boxShadow: 'var(--shadow)' }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>{label}</p>
          {payload.map(p => (
            <p key={p.dataKey} style={{ fontSize: '0.8rem', color: p.color }}>{p.name}: {p.value}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Статистика</h1>
        <p className="page-subtitle">Останні 7 днів · Середнє: {avgCal} ккал/день</p>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Середньо/день', val: `${avgCal} ккал`, icon: '📊' },
          { label: 'Активних днів', val: `${avgDays} з 7`, icon: '📅' },
          { label: 'Ціль', val: `${goals.calories} ккал`, icon: '🎯' },
          { label: 'Виконання', val: `${Math.round((avgCal / goals.calories) * 100)}%`, icon: '✅' },
        ].map(({ label, val, icon }) => (
          <div className="card" key={label} style={{ padding: '18px' }}>
            <div style={{ fontSize: '24px', marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600 }}>{val}</div>
          </div>
        ))}
      </div>

      <div className="stats-grid">
        {/* Calories bar chart */}
        <div className="chart-card" style={{ gridColumn: '1/-1' }}>
          <div className="card-title">Калорії за тиждень</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--sand)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="calories" name="Ккал" fill="var(--accent)" radius={[6, 6, 0, 0]} maxBarSize={48} />
              <Bar dataKey="goal" name="Ціль" fill="var(--sand)" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Macros line chart */}
        <div className="chart-card">
          <div className="card-title">Макронутрієнти за тиждень</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weekData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sand)" />
              <XAxis dataKey="date" tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--ink-faint)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
              <Line type="monotone" dataKey="protein" name="Білки" stroke="#4A7C59" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="fat" name="Жири" stroke="#C2783C" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="carbs" name="Вуглеводи" stroke="#3B6B8A" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Macro pie */}
        <div className="chart-card">
          <div className="card-title">Розподіл калорій сьогодні</div>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v} ккал`} />
                <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-state" style={{ padding: '40px 0' }}>
              <div className="empty-state-icon">📊</div>
              <div className="empty-state-text">Додай їжу щоб побачити графік</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
