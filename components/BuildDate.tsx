'use client';

import { useLanguage } from '@/lib/LanguageContext';

/**
 * Отображает дату последней сборки сайта, захваченную в момент деплоя.
 * Форматирует дату в зависимости от текущего языка интерфейса.
 */
export default function BuildDate({ isoDate }: { isoDate: string }) {
  const { t, lang } = useLanguage();

  // Форматируем дату по локали: «март 2026» или «March 2026»
  const formatted = new Date(isoDate)
    .toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' })
    .replace(/\s*г\.?$/, '');

  return (
    <span>
      {t('updated_at')}: {formatted}
    </span>
  );
}
