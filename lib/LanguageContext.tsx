'use client';

import React, { createContext, useContext, useState } from 'react';
import { Lang, translations, TranslationKey } from './i18n';

/**
 * Тип значения контекста языка.
 * Предоставляет текущий язык, функцию переключения
 * и функцию получения перевода по ключу.
 */
interface LanguageContextType {
  /** Текущий активный язык интерфейса */
  lang: Lang;
  /** Функция переключения языка между 'en' и 'ru' */
  toggle: () => void;
  /** Функция получения строки перевода по ключу */
  t: (key: TranslationKey) => string;
}

/**
 * React-контекст для хранения состояния языка.
 * Инициализируется null — до оборачивания в LanguageProvider.
 */
const LanguageContext = createContext<LanguageContextType | null>(null);

/**
 * Провайдер языкового контекста.
 * Оборачивает дочерние компоненты и обеспечивает им доступ
 * к текущему языку, функции переключения и переводам.
 *
 * @param children - дочерние React-узлы
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Текущий язык, по умолчанию — английский
  const [lang, setLang] = useState<Lang>('en');

  // Переключение между 'en' и 'ru'
  const toggle = () => setLang((prev) => (prev === 'en' ? 'ru' : 'en'));

  // Получение перевода строки по ключу для активного языка
  const t = (key: TranslationKey): string => translations[lang][key];

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Хук для получения доступа к языковому контексту.
 * Должен вызываться только внутри компонентов,
 * обёрнутых в LanguageProvider.
 *
 * @throws Error если хук используется вне LanguageProvider
 * @returns объект с lang, toggle и t
 */
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  // Если контекст не найден — компонент вызван вне провайдера
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
