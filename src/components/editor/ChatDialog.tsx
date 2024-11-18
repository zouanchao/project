import React, { useState, useRef, useEffect } from 'react';
import { chatService } from '../../services/api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: boolean;
}

interface ChatDialogProps {
  onOutlineGenerated?: (outline: string, isStreaming: boolean) => void;
}

export default function ChatDialog({ onOutlineGenerated }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI research assistant. I can help you generate an outline for your research paper. Just tell me your topic or paste your abstract.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (userMessage: string) => {
    if (isLoading) return;
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date()
    }]);

    // Add thinking message
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Thinking...',
      timestamp: new Date(),
      thinking: true
    }]);

    try {
      const stream = await chatService.sendMessage(userMessage);
      let accumulatedContent = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          accumulatedContent += content;
          
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.thinking) {
              lastMessage.content = accumulatedContent;
              lastMessage.thinking = false;
            }
            return newMessages;
          });

          if (onOutlineGenerated) {
            onOutlineGenerated(accumulatedContent, true);
          }
        }
      }

      if (onOutlineGenerated) {
        onOutlineGenerated('', false);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = prev.filter(msg => !msg.thinking);
        return [...newMessages, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}