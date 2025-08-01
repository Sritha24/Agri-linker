
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '@/lib/translations';

type Language = 'en' | 'te';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKey) => string;
    isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('en');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('agrilink_language') as Language | null;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'te')) {
            setLanguageState(savedLanguage);
        }
        setIsHydrated(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('agrilink_language', lang);
    };

    const t = (key: TranslationKey): string => {
        return translations[language][key] || translations['en'][key];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isHydrated }}>
            {children}
        </LanguageContext.Provider>
    );
};
