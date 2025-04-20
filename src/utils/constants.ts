import { AIModel } from '../types';

// 7 days in milliseconds
export const SESSION_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'OpenAI\'s most advanced model with improved reasoning',
    apiKeyPlaceholder: 'sk-...',
    logoIcon: 'Brain',
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    provider: 'Anthropic',
    description: 'Anthropic\'s conversational AI assistant',
    apiKeyPlaceholder: 'sk-ant-...',
    logoIcon: 'Sparkles',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google\'s advanced large language model',
    apiKeyPlaceholder: 'AIza...',
    logoIcon: 'Stars',
  },
  {
    id: 'mistral',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    description: 'Powerful and efficient open-weight model',
    apiKeyPlaceholder: 'mst-...',
    logoIcon: 'Wind',
  },
  {
    id: 'llama-3',
    name: 'Llama 3',
    provider: 'Meta',
    description: 'Meta\'s open source large language model',
    apiKeyPlaceholder: 'meta_llama_api_...',
    logoIcon: 'FlaskConical',
  },
];