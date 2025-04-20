import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChatSession, Message } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createMessage, createNewSession, isSessionExpired, refreshSession } from '../utils/helpers';
import { sendMessage } from '../services/aiService';

interface ChatContextType {
  session: ChatSession | null;
  isAuthenticated: boolean;
  selectedModel: string;
  isLoading: boolean;
  error: string | null;
  setSelectedModel: (modelId: string) => void;
  authenticate: (apiKey: string) => void;
  logout: () => void;
  sendUserMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useLocalStorage<ChatSession | null>('chat-session', null);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check session expiration on load and set interval
  useEffect(() => {
    const checkSession = () => {
      if (session && isSessionExpired(session)) {
        setSession(null);
      }
    };

    // Check immediately
    checkSession();
    
    // Set interval to check periodically
    const interval = setInterval(checkSession, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [session, setSession]);

  const authenticate = (apiKey: string) => {
    try {
      if (!apiKey.trim()) {
        setError('API key is required');
        return;
      }
      
      const newSession = createNewSession(selectedModel, apiKey);
      setSession(newSession);
      setError(null);
    } catch (err) {
      setError('Failed to authenticate');
      console.error(err);
    }
  };

  const logout = () => {
    setSession(null);
  };

  const sendUserMessage = async (content: string) => {
    if (!session) {
      setError('Not authenticated');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Create and add user message
      const userMessage = createMessage(content, 'user');
      
      // Update session with new message
      const updatedSession = {
        ...refreshSession(session),
        messages: [...session.messages, userMessage]
      };
      
      setSession(updatedSession);
      
      // Send to AI service and get response
      const assistantMessage = await sendMessage(
        content, 
        session.modelId, 
        session.apiKey
      );
      
      // Update session with AI response
      setSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, assistantMessage]
        };
      });
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (!session) return;
    
    setSession({
      ...session,
      messages: []
    });
  };

  const isAuthenticated = Boolean(session && !isSessionExpired(session));

  return (
    <ChatContext.Provider
      value={{
        session,
        isAuthenticated,
        selectedModel,
        isLoading,
        error,
        setSelectedModel,
        authenticate,
        logout,
        sendUserMessage,
        clearChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};