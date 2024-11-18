import React from 'react';
import { FileText, MessageSquare, Book, DollarSign, Settings } from 'lucide-react';

export default function EditorSidebar() {
  return (
    <div className="w-16 bg-[#1E2024] flex flex-col items-center py-4">
      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mb-8">
        <span className="text-white font-bold">S</span>
      </div>
      
      <nav className="flex-1 flex flex-col items-center space-y-4">
        <button className="p-3 rounded-lg text-white bg-blue-600">
          <FileText className="w-5 h-5" />
        </button>
        <button className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
          <Book className="w-5 h-5" />
        </button>
      </nav>

      <div className="mt-auto flex flex-col items-center space-y-4">
        <button className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
          <DollarSign className="w-5 h-5" />
        </button>
        <button className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}