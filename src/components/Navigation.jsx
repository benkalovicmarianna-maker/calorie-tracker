import { LayoutDashboard, UtensilsCrossed, BarChart3, Droplets, Settings } from 'lucide-react';

const tabs = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Головна' },
  { id: 'log', icon: UtensilsCrossed, label: 'Їжа' },
  { id: 'chart', icon: BarChart3, label: 'Графік' },
  { id: 'water', icon: Droplets, label: 'Вода' },
  { id: 'settings', icon: Settings, label: 'Ціль' },
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={22} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
