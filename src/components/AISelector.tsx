import React from 'react';
import { useChat } from '../context/ChatContext';
import { AI_MODELS } from '../utils/constants';
import * as Icons from 'lucide-react';

type IconName = keyof typeof Icons;

const AISelector: React.FC = () => {
  const { selectedModel, setSelectedModel, isAuthenticated } = useChat();

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  // Find the selected model details
  const selectedModelDetails = AI_MODELS.find(model => model.id === selectedModel);
  const IconComponent = selectedModelDetails?.logoIcon 
    ? Icons[selectedModelDetails.logoIcon as IconName] 
    : Icons.Bot;

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select AI Model
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {IconComponent && <IconComponent className="h-5 w-5 text-gray-500" />}
        </div>
        
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          disabled={isAuthenticated}
          className={`block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm ${
            isAuthenticated ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        >
          {AI_MODELS.map(model => (
            <option key={model.id} value={model.id}>
              {model.provider} - {model.name}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Icons.ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
      
      {selectedModelDetails && (
        <p className="mt-2 text-sm text-gray-500">{selectedModelDetails.description}</p>
      )}
      
      {isAuthenticated && (
        <p className="mt-2 text-xs text-amber-600">
          <Icons.Info className="h-3 w-3 inline mr-1" />
          To change AI model, disconnect first
        </p>
      )}
    </div>
  );
};

export default AISelector;