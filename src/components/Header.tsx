import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, PenTool, DollarSign } from 'lucide-react';
import LanguageSwitch from './LanguageSwitch';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="ml-2 text-xl font-semibold">SciHelp</span>
                <span className="text-xs text-gray-500 ml-2">AI Research Assistant</span>
              </div>
            </div>
          </div>
          
          <nav className="flex space-x-8">
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
              <Home className="w-5 h-5 mr-1" />
              <span>{t('header.home')}</span>
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
              <PenTool className="w-5 h-5 mr-1" />
              <span>{t('header.editor')}</span>
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
              <BookOpen className="w-5 h-5 mr-1" />
              <span>{t('header.library')}</span>
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
              <DollarSign className="w-5 h-5 mr-1" />
              <span>{t('header.pricing')}</span>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              {t('header.signIn')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}