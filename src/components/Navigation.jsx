
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import React from 'react';
import { LayoutDashboard, PlusCircle, BarChart2, Settings, Leaf } from 'lucide-react';
const navItems = [
  { id: 'dashboard', label: 'Огляд', icon: LayoutDashboard },
  { id: 'food-log', label: 'Додати їжу', icon: PlusCircle },
  { id: 'stats', label: 'Статистика', icon: BarChart2 },
  { id: 'goals', label: 'Цілі', icon: Settings },
];

export default function Navigation({ activeTab, setActiveTab }) {
  const today = format(new Date(), 'EEEE, d MMMM', { locale: uk });

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon"><Leaf size={20} color="#fff" /></div>
        <span className="logo-text">NutriTrack</span>
      </div>

      <nav className="sidebar-nav">
      {navItems.map(({ id, label, icon: Icon }) => (
 <button
 key={id}
 className={`nav-btn${activeTab === id ? ' active' : ''}`}
 onClick={() => setActiveTab(id)}
>
 <Icon size={18} />
 {label}
</button>
))}
      </nav>

      <div className="sidebar-date">
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, opacity: 0.5 }}>Сьогодні</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>{today}</div>
      </div>
    </aside>
  );
}
