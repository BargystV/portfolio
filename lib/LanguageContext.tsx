'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
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
 * Определяет язык по IP-геолокации пользователя.
 * Возвращает 'ru' для России, 'en' для остальных стран.
 * При ошибке запроса возвращает 'en' как безопасный дефолт.
 */
async function detectLangByGeo(): Promise<Lang> {
  try {
    const res = await fetch('https://ipapi.co/country_code/', { signal: AbortSignal.timeout(3000) });
    const countryCode = (await res.text()).trim();
    return countryCode === 'RU' ? 'ru' : 'en';
  } catch {
    // При недоступности API или таймауте — английский по умолчанию
    return 'en';
  }
}

/**
 * Провайдер языкового контекста.
 * При монтировании определяет язык по IP-геолокации:
 * Россия → 'ru', остальные страны → 'en'.
 * Пользователь может вручную переключить язык.
 *
 * @param children - дочерние React-узлы
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Начальный язык 'en' до определения геолокации
  const [lang, setLang] = useState<Lang>('en');

  // Определяем язык по геолокации один раз при монтировании
  useEffect(() => {
    detectLangByGeo().then(setLang);
  }, []);

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
