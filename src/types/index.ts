export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  apiKeyPlaceholder: string;
  logoIcon: string;
}

export interface ChatSession {
  id: string;
  modelId: string;
  apiKey: string;
  messages: Message[];
  createdAt: number;
  expiresAt: number;
}