import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: boolean;
}

export default function ChatMessage({ role, content, timestamp, thinking }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${role === 'user' ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            {role === 'assistant' ? (
              <Bot className="w-5 h-5 text-blue-600" />
            ) : (
              <User className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>
        
        <div>
          <div className={`rounded-2xl px-4 py-2 ${
            role === 'assistant' 
              ? 'bg-blue-50 rounded-tl-none' 
              : 'bg-gray-100 rounded-tr-none'
          } ${thinking ? 'animate-pulse' : ''}`}>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {content}
            </p>
          </div>
          <div className={`mt-1 text-xs text-gray-500 ${
            role === 'user' ? 'text-right' : 'text-left'
          }`}>
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}