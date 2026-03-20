import { TranslationKey } from '@/lib/i18n';

/**
 * Карточка проекта внутри рабочего блока.
 * Текстовые поля хранятся как ключи i18n для поддержки локализации.
 */
export interface WorkProject {
  /** Ключ i18n для локализованного названия проекта */
  nameKey: TranslationKey;
  /** Ключ i18n для локализованного описания проекта */
  descKey: TranslationKey;
  /** Список технологий/стека проекта */
  stack: string[];
  /** Период работы над проектом */
  period?: string;
  /** URL репозитория на GitHub */
  githubUrl?: string;
  /** Флаг наличия публикации на Google Play */
  googlePlayUrl?: boolean;
  /** Флаг приватности проекта */
  isPrivate?: boolean;
}

/**
 * Блок компании/периода с вложенными проектами.
 * Поля company/role/type/period опциональны —
 * блок "Личные проекты" не имеет работодателя.
 */
export interface WorkBlock {
  /** Уникальный идентификатор блока (используется как React key) */
  id: string;
  /** Название компании (не локализуется) — отсутствует у личных проектов */
  company?: string;
  /** Ключ i18n для должности */
  roleKey?: TranslationKey;
  /** Ключ i18n для формата работы */
  typeKey?: TranslationKey;
  /** Период работы на английском */
  period?: string;
  /** Период работы на русском */
  periodRu?: string;
  /** Ссылка на сайт компании */
  url?: string;
  /** Список проектов, разработанных в рамках этого блока */
  projects: WorkProject[];
}

/**
 * Данные объединённой секции "Работа и проекты".
 * Порядок блоков: от текущего места работы к личным проектам.
 */
export const workBlocks: WorkBlock[] = [
  {
    // Текущее место работы — Nadeks
    id: 'nadeks',
    company: 'Nadeks',
    url: 'https://nadeks.ru/',
    roleKey: 'exp_nadeks_role',
    typeKey: 'exp_nadeks_type',
    period: 'Mar 2025 – Present',
    periodRu: 'Март 2025 – н.в.',
    projects: [
      {
        // Основное приложение для POS-терминалов в Nadeks
        nameKey: 'proj_pos_nadeks_name',
        descKey: 'proj_pos_nadeks_desc',
        stack: ['Kotlin', 'Android', 'C/C++', 'VisionLabs'],
        period: 'Mar 2025 – Present',
        isPrivate: true,
      },
    ],
  },
  {
    // Предыдущее место работы — Mahuru (5+ лет)
    id: 'mahuru',
    company: 'Mahuru',
    url: 'http://mahuru.com/',
    roleKey: 'exp_mahuru_role',
    typeKey: 'exp_mahuru_type',
    period: 'Aug 2019 – Mar 2025',
    periodRu: 'Авг 2019 – Март 2025',
    projects: [
      {
        // PvP игра с криптовалютой
        nameKey: 'proj_gamecash_name',
        descKey: 'proj_gamecash_desc',
        stack: ['Kotlin', 'Android', 'Retrofit', 'Room'],
        isPrivate: true,
      },
      {
        // Корпоративное MRM-приложение для Магнит
        nameKey: 'proj_magnitMRM_name',
        descKey: 'proj_magnitMRM_desc',
        stack: ['Kotlin', 'Android', 'Retrofit', 'Room', 'Koin', 'Moxy'],
        isPrivate: true,
      },
      {
        // Платёжное приложение для POS-терминалов
        nameKey: 'proj_paymentPos_name',
        descKey: 'proj_paymentPos_desc',
        stack: ['Kotlin', 'Android', 'JavaPoet', 'VisionLabs'],
        isPrivate: true,
      },
      {
        // Кошелёк с NFC/QR и кастомным транспортом
        nameKey: 'proj_walletNFC_name',
        descKey: 'proj_walletNFC_desc',
        stack: ['Kotlin', 'Android', 'NFC', 'QR'],
        isPrivate: true,
      },
      {
        // Backend-разработка в рамках Mahuru (июнь–сентябрь 2024)
        nameKey: 'proj_mahuru_backend_name',
        descKey: 'proj_mahuru_backend_desc',
        stack: ['Kotlin', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Liquibase'],
        period: 'Jun – Sep 2024',
        isPrivate: true,
      },
    ],
  },
  {
    // Ранний фриланс-опыт
    id: 'freelance',
    company: 'Freelance',
    url: 'https://freelance.ru/',
    roleKey: 'exp_freelance_role',
    typeKey: 'exp_freelance_type',
    period: 'May 2017 – Jan 2019',
    periodRu: 'Май 2017 – Янв 2019',
    projects: [
      {
        // Приложение для знакомств в кофейнях
        nameKey: 'proj_maybecoffee_name',
        descKey: 'proj_maybecoffee_desc',
        stack: ['Kotlin', 'Android', 'Retrofit'],
        isPrivate: true,
      },
      {
        // Переводчик иврит → английский
        nameKey: 'proj_hebrewTrans_name',
        descKey: 'proj_hebrewTrans_desc',
        stack: ['Kotlin', 'Android'],
        isPrivate: true,
      },
    ],
  },
  {
    // Личные/pet-проекты без работодателя
    id: 'personal',
    projects: [
      {
        // Приватный AI-агент для управления личными делами через n8n
        nameKey: 'proj_aiagent_name',
        descKey: 'proj_aiagent_desc',
        stack: ['n8n', 'Python', 'LLM API', 'Notion'],
        period: 'Apr 2025 – Present',
        isPrivate: true,
      },
      {
        // Симуляция жизненного цикла растений с эволюционным алгоритмом
        nameKey: 'proj_lifesim_name',
        descKey: 'proj_lifesim_desc',
        stack: ['Kotlin', 'LibGDX'],
        period: 'Sep 2025 – Jan 2026',
        githubUrl: 'https://github.com/BargystV/simulation-of-life',
      },
      {
        // Дипломный проект — помощник поэта, опубликован на Google Play
        nameKey: 'proj_poet_name',
        descKey: 'proj_poet_desc',
        stack: ['Kotlin', 'Android'],
        period: 'May – Nov 2017',
        googlePlayUrl: true,
      },
      {
        // Android-приложение Amazonica (открытый репозиторий)
        nameKey: 'proj_amazonica_name',
        descKey: 'proj_amazonica_desc',
        stack: ['Kotlin', 'Android'],
        githubUrl: 'https://github.com/BargystV/Amazonica',
      },
      {
        // Android-приложение ReviroApp (открытый репозиторий)
        nameKey: 'proj_reviro_name',
        descKey: 'proj_reviro_desc',
        stack: ['Android', 'Kotlin'],
        githubUrl: 'https://github.com/BargystV/ReviroApp',
      },
    ],
  },
];
