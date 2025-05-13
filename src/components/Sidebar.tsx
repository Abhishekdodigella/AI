import React from 'react';
import { Ticket, BookOpen, BarChart } from 'lucide-react';
import { useStore } from '../store/useStore';

const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, currentUser } = useStore();

  const navigation = [
    {
      name: 'Tickets',
      icon: Ticket,
      view: 'tickets' as const,
    },
    {
      name: 'Knowledge Base',
      icon: BookOpen,
      view: 'knowledge-base' as const,
    },
  ];

  if (currentUser?.role === 'agent' || currentUser?.role === 'admin') {
    navigation.push({
      name: 'Analytics',
      icon: BarChart,
      view: 'analytics' as const,
    });
  }

  return (
    <aside className="w-64 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
      <nav className="space-y-2">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentView(item.view)}
            className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
              currentView === item.view
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;