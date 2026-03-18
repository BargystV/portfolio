import { TranslationKey } from '@/lib/i18n';

/**
 * Интерфейс одной записи об опыте работы.
 * Текстовые поля (должность, формат работы, пункты) хранятся
 * как ключи i18n для поддержки локализации.
 */
export interface ExperienceItem {
  /** Название компании (не локализуется — одинаково на всех языках) */
  company: string;
  /** Ключ i18n для названия должности */
  roleKey: TranslationKey;
  /** Ключ i18n для формата работы (удалённо / офис) */
  typeKey: TranslationKey;
  /** Период работы на английском (отображается как есть) */
  period: string; // displayed as-is
  /** Период работы на русском (используется при lang === 'ru') */
  periodRu: string;
  /** Массив ключей i18n для пунктов достижений/обязанностей */
  bullets: TranslationKey[];
}

/**
 * Список мест работы для секции Experience.
 * Отсортирован от последнего к первому (хронология убывает сверху вниз).
 */
export const experiences: ExperienceItem[] = [
  {
    // Текущее место работы — Nadeks
    company: 'Nadeks',
    roleKey: 'exp_nadeks_role',
    typeKey: 'exp_nadeks_type',
    period: 'Mar 2025 – Present',
    periodRu: 'Март 2025 – н.в.',
    bullets: [
      'exp_nadeks_b1',
      'exp_nadeks_b2',
      'exp_nadeks_b3',
      'exp_nadeks_b4',
    ],
  },
  {
    // Предыдущее место работы — Mahuru (5+ лет)
    company: 'Mahuru',
    roleKey: 'exp_mahuru_role',
    typeKey: 'exp_mahuru_type',
    period: 'Aug 2019 – Mar 2025',
    periodRu: 'Авг 2019 – Март 2025',
    bullets: [
      'exp_mahuru_b1',
      'exp_mahuru_b2',
      'exp_mahuru_b3',
      'exp_mahuru_b4',
      'exp_mahuru_b5',
    ],
  },
  {
    // Ранний фриланс-опыт
    company: 'Freelance',
    roleKey: 'exp_freelance_role',
    typeKey: 'exp_freelance_type',
    period: 'May 2017 – Jan 2019',
    periodRu: 'Май 2017 – Янв 2019',
    bullets: ['exp_freelance_b1', 'exp_freelance_b2'],
  },
];
