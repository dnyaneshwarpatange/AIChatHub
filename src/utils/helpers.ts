import { SESSION_EXPIRY_TIME } from './constants';
import { ChatSession, Message } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const createNewSession = (modelId: string, apiKey: string): ChatSession => {
  const now = Date.now();
  return {
    id: generateId(),
    modelId,
    apiKey,
    messages: [],
    createdAt: now,
    expiresAt: now + SESSION_EXPIRY_TIME,
  };
};

export const createMessage = (content: string, role: 'user' | 'assistant'): Message => {
  return {
    id: generateId(),
    content,
    role,
    timestamp: Date.now(),
  };
};

export const isSessionExpired = (session: ChatSession | null): boolean => {
  if (!session) return true;
  return Date.now() > session.expiresAt;
};

export const refreshSession = (session: ChatSession): ChatSession => {
  return {
    ...session,
    expiresAt: Date.now() + SESSION_EXPIRY_TIME,
  };
};