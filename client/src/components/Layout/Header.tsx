import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {Search, Bell, Settings, Menu, LogOut} from 'lucide-react';

const Header: React.FC = () => {
  const {setSearchTerm, logout} = useApp();
  const [searchInput, setSearchInput] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <button className="lg:hidden mr-2 text-gray-500 hover:text-gray-700">
          <Menu size={20} />
        </button>
        <div className="flex items-center">
          <img 
            src="/logo_kandal_province_transperant.png"
            alt="DocTrack Logo" 
            className="h-8 w-8 rounded-full mr-2"
          />
          <span className="text-xl font-bold text-blue-600">DocTrack</span>
        </div>
      </div>
      
      <div className="flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 sm:text-sm transition-colors"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Settings size={20} />
        </button>
        <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700"
        >
          <LogOut size={20}/>
        </button>
      </div>
    </header>
  );
};

export default Header;