import { AIModel, Message } from '../types';
import { AI_MODELS } from '../utils/constants';
import { createMessage } from '../utils/helpers';

// Mock responses for different AI models
const mockResponses: Record<string, string[]> = {
  'gpt-4': [
    "I'm GPT-4, an advanced language model by OpenAI. How can I assist you today?",
    "That's an interesting question. Based on my training data, I can provide the following insights...",
    "I understand your request. Let me think about this systematically...",
  ],
  'claude-3': [
    "Hello! I'm Claude, developed by Anthropic to be helpful, harmless, and honest. How can I assist you?",
    "Thank you for your question. I'd be happy to explore this topic with you...",
    "I appreciate you sharing that. Here's my perspective based on what I know...",
  ],
  'gemini-pro': [
    "Hi, I'm Gemini Pro from Google. I'm designed to be helpful and informative. What can I do for you?",
    "Great question! Let me provide some information on that topic...",
    "I'm processing your request. Here's what I can tell you about that...",
  ],
  'mistral': [
    "Hello, I'm Mistral Large, a powerful language model. How may I help you today?",
    "I'd be happy to assist with your question. Here's what I know about this topic...",
    "Let me analyze your request and provide a thoughtful response...",
  ],
  'llama-3': [
    "Hi there! I'm Llama 3 by Meta. I'm here to have a helpful conversation with you.",
    "Thanks for your question. Here's my perspective based on my training...",
    "I'll do my best to provide a useful answer to your question...",
  ],
};

// In a real application, this would be an actual API call
export const sendMessage = async (
  message: string,
  modelId: string,
  apiKey: string
): Promise<Message> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this is where you'd make the API call
  // using the provided apiKey and model information
  
  // For demo purposes, we'll generate a mock response
  const responses = mockResponses[modelId] || mockResponses['gpt-4'];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return createMessage(randomResponse, 'assistant');
};

export const getModelById = (modelId: string): AIModel | undefined => {
  return AI_MODELS.find(model => model.id === modelId);
};

// Validate API key format based on the selected model
export const validateApiKey = (apiKey: string, modelId: string): boolean => {
  if (!apiKey) return false;
  
  // Simple validation based on expected key formats
  switch (modelId) {
    case 'gpt-4':
      return apiKey.startsWith('sk-') && apiKey.length > 20;
    case 'claude-3':
      return apiKey.startsWith('sk-ant-') && apiKey.length > 20;
    case 'gemini-pro':
      return apiKey.startsWith('AIza') && apiKey.length > 20;
    case 'mistral':
      return apiKey.startsWith('mst-') && apiKey.length > 20;
    case 'llama-3':
      return apiKey.startsWith('meta_llama_api_') && apiKey.length > 20;
    default:
      return apiKey.length > 10;
  }
};