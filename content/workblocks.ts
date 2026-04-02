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
        stack: ['Kotlin', 'Android', 'Coroutines', 'Retrofit', 'Room', 'Koin', 'Moxy'],
        period: 'Aug 2019 – Jun 2021',
        periodRu: 'Авг 2019 – Июнь 2021',
        isPrivate: true,
        screenshots: [
          '/screenshots/mrm/1.png',
          '/screenshots/mrm/2.png',
          '/screenshots/mrm/3.png',
          '/screenshots/mrm/4.png',
          '/screenshots/mrm/5.png',
          '/screenshots/mrm/6.png',
          '/screenshots/mrm/7.png',
          '/screenshots/mrm/8.png',
          '/screenshots/mrm/9.png',
          '/screenshots/mrm/10.png',
          '/screenshots/mrm/11.png',
          '/screenshots/mrm/12.png',
        ],
      },
      {
        // PvP игра с криптовалютой
        nameKey: 'proj_gamecash_name',
        descKey: 'proj_gamecash_desc',
        stack: ['Java', 'Android', 'OkHttp', 'SQLite'],
        period: 'Aug 2019 – Mar 2020',
        periodRu: 'Авг 2019 – Март 2020',
        isPrivate: true,
        screenshots: [
          '/screenshots/gamecash/1.jpg',
          '/screenshots/gamecash/2.jpg',
          '/screenshots/gamecash/3.jpg',
          '/screenshots/gamecash/4.jpg',
          '/screenshots/gamecash/5.jpg',
          '/screenshots/gamecash/6.jpg',
        ],
      },
    ],
  },
  {
    // Ранний фриланс-опыт
    id: 'freelance',
    company: 'Freelance',
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
        // Персональный сайт-портфолио на Next.js
        nameKey: 'proj_portfolio_name',
        descKey: 'proj_portfolio_desc',
        stack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
        period: 'Mar 2026 – Present',
        periodRu: 'Март 2026 – н.в.',
        githubUrl: 'https://github.com/BargystV/portfolio',
      },
      {
        // Приватный AI-агент для управления личными делами через n8n
        nameKey: 'proj_aiagent_name',
        descKey: 'proj_aiagent_desc',
        stack: ['Python', 'n8n'],
        period: 'Apr 2025 – Present',
        periodRu: 'Апр 2025 – н.в.',
        isPrivate: true,
        screenshotWide: true,
        screenshots: [
          '/screenshots/aiagents/1.png',
          '/screenshots/aiagents/2.png',
          '/screenshots/aiagents/3.png',
        ],
      },
      {
        // Симуляция жизненного цикла растений с эволюционным алгоритмом
        nameKey: 'proj_lifesim_name',
        descKey: 'proj_lifesim_desc',
        stack: ['Kotlin', 'LibGDX'],
        period: 'Sep 2025 – Present',
        periodRu: 'Сент 2025 – н.в.',
        githubUrl: 'https://github.com/BargystV/simulation-of-life',
      },
      {
        // Self-hosted MTProto-прокси для Telegram
        nameKey: 'proj_mtproxy_name',
        descKey: 'proj_mtproxy_desc',
        stack: ['Bash', 'Docker', 'Docker Compose'],
        period: 'Apr 2025 – Apr 2025',
        periodRu: 'Апр 2025 – Апр 2025',
        githubUrl: 'https://github.com/BargystV/my-mtproxy',
      },
      {
        // Android-приложение Amazonica (открытый репозиторий)
        nameKey: 'proj_amazonica_name',
        descKey: 'proj_amazonica_desc',
        stack: ['Kotlin', 'Android', 'Jetpack Compose', 'Navigation Compose', 'Coroutines', 'Retrofit', 'Room', 'Koin', 'Coil'],
        period: 'Dec 2024 – Jan 2025',
        periodRu: 'Дек 2024 – Янв 2025',
        githubUrl: 'https://github.com/BargystV/Amazonica',
      },
      {
        // Дипломный проект — помощник поэта, опубликован на Google Play
        nameKey: 'proj_poet_name',
        descKey: 'proj_poet_desc',
        stack: ['Java', 'Android', 'SQLite'],
        period: 'May 2017 – Nov 2017',
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
