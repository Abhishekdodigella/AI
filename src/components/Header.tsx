import React from 'react';
import { HeadphonesIcon, Search, User } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, currentUser } = useStore();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HeadphonesIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Support Center</h1>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{currentUser.name}</span>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            ) : (
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;