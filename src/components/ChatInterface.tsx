import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '../context/ChatContext';
import ChatMessage from './ChatMessage';
import { Bot, RefreshCw, Send } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const { session, sendUserMessage, clearChat, isLoading } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendUserMessage(input);
    setInput('');
  };

  if (!session) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
        <Bot className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700">Connect your API key to start chatting</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-md text-center">
          Select an AI model and enter your API key to begin a conversation
        </p>
      </div>
    );
  }

  const messages = session.messages;
  const isEmpty = messages.length === 0;
  
  return (
    <div className="w-full h-[60vh] flex flex-col bg-gray-50 rounded-lg shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Conversation</h3>
        
        {!isEmpty && (
          <button
            onClick={clearChat}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            title="Clear chat"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Bot className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500 max-w-xs">
              Send a message to start a conversation
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-w-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isLoading || !input.trim()
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;