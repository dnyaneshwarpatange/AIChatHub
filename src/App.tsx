import React from 'react';
import { ChatProvider } from './context/ChatContext';
import Header from './components/Header';
import AISelector from './components/AISelector';
import ApiKeyInput from './components/ApiKeyInput';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';

function App() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <AISelector />
              <ApiKeyInput />
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-2">About</h3>
                <p className="text-sm text-gray-500">
                  This platform allows you to chat with various AI models using your own API keys.
                  Your keys are stored locally in your browser and expire after 7 days of inactivity.
                </p>
              </div>
            </div>
            
            {/* Main chat area */}
            <div className="md:col-span-2">
              <ChatInterface />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ChatProvider>
  );
}

export default App;