import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { getModelById, validateApiKey } from '../services/aiService';
import { Key, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const ApiKeyInput: React.FC = () => {
  const { selectedModel, authenticate, error, isAuthenticated } = useChat();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  
  const selectedModelDetails = getModelById(selectedModel);
  const isValidFormat = apiKey ? validateApiKey(apiKey, selectedModel) : false;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticate(apiKey);
  };
  
  if (isAuthenticated) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-green-100">
        <div className="flex items-center text-green-600 mb-2">
          <ShieldCheck className="h-5 w-5 mr-2" />
          <span className="font-medium">Connected securely</span>
        </div>
        <p className="text-sm text-gray-600">
          Your API key is securely stored for this session only and will expire after 7 days of inactivity.
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your {selectedModelDetails?.provider || 'API'} API Key
        </label>
        
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Key className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type={showKey ? 'text' : 'password'}
            id="api-key"
            className={`block w-full pl-10 pr-12 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={selectedModelDetails?.apiKeyPlaceholder || 'Enter API key'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
          
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showKey ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        
        {!isValidFormat && apiKey.length > 0 && (
          <p className="mt-2 text-sm text-amber-600">
            This doesn't look like a valid {selectedModelDetails?.provider} API key format
          </p>
        )}
        
        <p className="mt-2 text-xs text-gray-500">
          Your API key is stored locally in your browser and never sent to our servers.
        </p>
        
        <button
          type="submit"
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Connect
        </button>
      </form>
    </div>
  );
};

export default ApiKeyInput;