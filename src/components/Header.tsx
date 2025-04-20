import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useChat();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-900">AI Chat Hub</h1>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={logout}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;