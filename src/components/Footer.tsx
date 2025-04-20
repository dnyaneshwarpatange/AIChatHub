import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto w-full py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          AI Chat Hub — Use your own API keys to chat with various AI models
        </p>
        
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          
          <span className="text-sm text-gray-500 flex items-center">
            Built with <Heart className="h-3 w-3 mx-1 text-red-500" /> using React
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;