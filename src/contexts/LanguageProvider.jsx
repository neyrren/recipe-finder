// LanguageProvider.jsx - Contains only React component
import React, { useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from './translations';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}