import React from 'react';
import { Message } from '../types';
import { formatTimestamp } from '../utils/helpers';
import { useChat } from '../context/ChatContext';
import { getModelById } from '../services/aiService';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { selectedModel } = useChat();
  const model = getModelById(selectedModel);
  const isUser = message.role === 'user';
  
  // Animation classes based on message type
  const containerClasses = isUser
    ? 'ml-auto bg-indigo-100 border-indigo-200'
    : 'mr-auto bg-white border-gray-200';
  
  // Calculate animation delay based on timestamp
  const timestamp = formatTimestamp(message.timestamp);
  
  return (
    <div
      className={`group flex max-w-[85%] md:max-w-[75%] animate-fade-in-up rounded-lg border p-3 shadow-sm transition-all duration-300 hover:shadow-md ${containerClasses}`}
    >
      <div className="mr-3 flex-shrink-0">
        {isUser ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white">
            <User className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <Bot className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex justify-between">
          <span className="text-xs font-medium text-gray-500">
            {isUser ? 'You' : model?.name || 'AI'}
          </span>
          <span className="text-xs text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {timestamp}
          </span>
        </div>
        
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
          {message.content}
        </div>
      </div>
    </div>
  );
};

// Apply a staggered fade-in animation
export default ChatMessage;