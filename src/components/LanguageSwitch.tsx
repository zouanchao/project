import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center p-2 hover:bg-gray-100 rounded-md text-gray-700"
      title={i18n.language === 'en' ? '切换到中文' : 'Switch to English'}
    >
      <Globe className="w-5 h-5" />
      <span className="ml-2 text-sm font-medium">
        {i18n.language === 'en' ? '中文' : 'EN'}
      </span>
    </button>
  );
}