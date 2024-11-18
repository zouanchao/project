import React, { useState } from 'react';
import { PenLine } from 'lucide-react';

interface HeroProps {
  onStartWriting: (text: string) => void;
}

export default function Hero({ onStartWriting }: HeroProps) {
  const [inputText, setInputText] = useState('');

  const handleStartWriting = () => {
    onStartWriting(inputText || 'Untitled Document');
  };

  return (
    <div className="bg-blue-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Write Better Research Papers
        </h1>
        <p className="text-gray-600 mb-8">
          Transform your research into professional papers with AI assistance
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <textarea
            className="w-full h-32 p-4 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your research topic or paste your abstract here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleStartWriting}
              className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              <PenLine className="w-5 h-5 mr-2" />
              Start Writing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}