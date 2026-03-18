import { TranslationKey } from '@/lib/i18n';

/**
 * Интерфейс одного проекта в портфолио.
 * Текстовые поля (название, описание) хранятся как ключи i18n,
 * чтобы поддерживать мультиязычность через хук useLanguage.
 */
export interface Project {
  /** Ключ i18n для локализованного названия проекта */
  nameKey: TranslationKey;
  /** Ключ i18n для локализованного описания проекта */
  descKey: TranslationKey;
  /** Список технологий/стека проекта */
  stack: string[];
  /** Период работы над проектом (отображается как есть) */
  period?: string;
  /** URL репозитория на GitHub, если проект открытый */
  githubUrl?: string;
  /** Флаг наличия публикации на Google Play */
  googlePlayUrl?: boolean;
  /** Флаг приватности проекта (не имеет публичных ссылок) */
  isPrivate?: boolean;
}

/**
 * Список проектов для секции Projects.
 * Порядок элементов определяет порядок карточек на странице.
 */
export const projects: Project[] = [
  {
    // Симуляция жизненного цикла растений с эволюционным алгоритмом
    nameKey: 'proj_lifesim_name',
    descKey: 'proj_lifesim_desc',
    stack: ['Kotlin', 'LibGDX'],
    period: 'Sep 2025 – Jan 2026',
    githubUrl: 'https://github.com/BargystV/simulation-of-life',
  },
  {
    // Приватный AI-агент для управления личными делами через n8n
    nameKey: 'proj_aiagent_name',
    descKey: 'proj_aiagent_desc',
    stack: ['n8n', 'Python', 'LLM API', 'Notion'],
    period: 'Apr 2025 – Present',
    isPrivate: true,
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
  {
    // Дипломный проект — помощник поэта, опубликован на Google Play
    nameKey: 'proj_poet_name',
    descKey: 'proj_poet_desc',
    stack: ['Kotlin', 'Android'],
    period: 'May – Nov 2017',
    googlePlayUrl: true,
  },
];
