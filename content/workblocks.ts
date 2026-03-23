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
  /** Период работы над проектом на английском */
  period?: string;
  /** Период работы над проектом на русском */
  periodRu?: string;
  /** URL репозитория на GitHub */
  githubUrl?: string;
  /** URL приложения в RuStore */
  rustoreUrl?: string;
  /** URL приложения на Google Play (строка) или флаг наличия без прямой ссылки (boolean) */
  googlePlayUrl?: string | boolean;
  /** Флаг приватности проекта */
  isPrivate?: boolean;
  /** Пути к скриншотам в /public — при наличии открывает галерею по клику */
  screenshots?: string[];
  /** Флаг широкоформатных скриншотов (16:9 / 4:3) — меняет ориентацию модального окна */
  screenshotWide?: boolean;
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
        stack: ['Kotlin', 'Java', 'C/C++', 'Android', 'Room', 'Retrofit', 'Sentry'],
        period: 'Feb 2020 – Present (started at Mahuru)',
        periodRu: 'Февр 2020 – н.в. (начинал в Mahuru)',
        rustoreUrl: 'https://www.rustore.ru/catalog/app/com.ariasoft.cardterminal.t2p',
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
        // Backend-разработка в рамках Mahuru (июнь–сентябрь 2024)
        nameKey: 'proj_mahuru_backend_name',
        descKey: 'proj_mahuru_backend_desc',
        stack: ['Kotlin', 'Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'JPA'],
        period: 'Jun 2024 – Sep 2024',
        periodRu: 'Июнь 2024 – Сент 2024',
        isPrivate: true,
      },
      {
        // Цифровой кошелёк с NFC HCE-платежами для Halk Bank (Туркменистан)
        nameKey: 'proj_halkpay_name',
        descKey: 'proj_halkpay_desc',
        stack: ['Kotlin', 'C/C++', 'Android', 'Hilt', 'Retrofit', 'RxJava', 'DexProtector'],
        period: 'May 2021 – Dec 2023',
        periodRu: 'Май 2021 – Дек 2023',
        googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.tactilion.wallet.halkpay',
      },
      {
        // Корпоративное MRM-приложение для Магнит
        nameKey: 'proj_magnitMRM_name',
        descKey: 'proj_magnitMRM_desc',
        stack: ['Kotlin', 'Android', 'Retrofit', 'Room', 'Koin', 'Moxy'],
        isPrivate: true,
      },
      {
        // PvP игра с криптовалютой
        nameKey: 'proj_gamecash_name',
        descKey: 'proj_gamecash_desc',
        stack: ['Kotlin', 'Android', 'Retrofit', 'Room'],
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
    period: 'Nov 2017 – Jan 2019',
    periodRu: 'Нояб 2017 – Янв 2019',
    projects: [
      {
        // Два Android-приложения для сервиса знакомств в кофейнях
        nameKey: 'proj_maybecoffee_name',
        descKey: 'proj_maybecoffee_desc',
        stack: ['Java', 'Android', 'Firebase', 'Google Maps', 'Retrofit', 'SQLite'],
        period: 'Nov 2017 – Jan 2019',
        periodRu: 'Нояб 2017 – Янв 2019',
        isPrivate: true,
        screenshots: [
          '/screenshots/maybecoffee/1.jpg',
          '/screenshots/maybecoffee/2.jpg',
          '/screenshots/maybecoffee/3.jpg',
          '/screenshots/maybecoffee/4.jpg',
          '/screenshots/maybecoffee/5.jpg',
          '/screenshots/maybecoffee/6.jpg',
        ],
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
        periodRu: 'Апр 2025 – н.в.',
        isPrivate: true,
      },
      {
        // Симуляция жизненного цикла растений с эволюционным алгоритмом
        nameKey: 'proj_lifesim_name',
        descKey: 'proj_lifesim_desc',
        stack: ['Kotlin', 'LibGDX'],
        period: 'Sep 2025 – Jan 2026',
        periodRu: 'Сент 2025 – Янв 2026',
        githubUrl: 'https://github.com/BargystV/simulation-of-life',
      },
      {
        // Android-приложение Amazonica (открытый репозиторий)
        nameKey: 'proj_amazonica_name',
        descKey: 'proj_amazonica_desc',
        stack: ['Kotlin', 'Android'],
        githubUrl: 'https://github.com/BargystV/Amazonica',
      },
      {
        // Дипломный проект — помощник поэта, опубликован на Google Play
        nameKey: 'proj_poet_name',
        descKey: 'proj_poet_desc',
        stack: ['Java', 'Android', 'SQLite'],
        period: 'May – Nov 2017',
        periodRu: 'Май 2017 – Нояб 2017',
        googlePlayUrl: true,
        screenshotWide: true,
        screenshots: [
          '/screenshots/poet/slide-01.png',
          '/screenshots/poet/slide-02.png',
          '/screenshots/poet/slide-03.png',
          '/screenshots/poet/slide-04.png',
          '/screenshots/poet/slide-05.png',
          '/screenshots/poet/slide-06.png',
          '/screenshots/poet/slide-07.png',
          '/screenshots/poet/slide-08.png',
          '/screenshots/poet/slide-09.png',
          '/screenshots/poet/slide-10.png',
          '/screenshots/poet/slide-11.png',
          '/screenshots/poet/slide-12.png',
          '/screenshots/poet/slide-13.png',
          '/screenshots/poet/slide-14.png',
        ],
      },
    ],
  },
];
