/**
 * Тип для поддерживаемых языков интерфейса.
 * 'en' — английский, 'ru' — русский.
 */
export type Lang = 'en' | 'ru';

/**
 * Объект со всеми переводами интерфейса.
 * Разделён по языкам: en (английский) и ru (русский).
 * Ключи одинаковые для обоих языков — это позволяет
 * получать перевод через translations[lang][key].
 */
export const translations = {
  en: {
    // Navbar
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_work: 'Work & Projects',
    nav_contact: 'Contact',

    // Hero
    hero_name: 'Boris Varshaver',
    hero_role: 'Senior Android Developer',
    hero_tagline: 'Android — 9+ years of commercial development.',
    hero_tagline2: 'Backend — REST APIs & event streaming.',
    hero_tagline3: 'Desktop — plant evolution simulator.',
    hero_tagline4: 'AI — agents for personal task automation.',
    hero_download: 'Download Resume',
    hero_contact: 'Contact Me',

    // About
    about_title: 'About',
    about_p1:
      'Senior Android Developer with over 9 years of commercial experience — from POS terminal payment systems and enterprise MRM solutions to consumer apps and games.',
    about_p2:
      'I\'m fascinated by the intersection of mobile development and AI. I actively use AI tools (Claude Code, n8n, LLM APIs) in my daily workflow.',
    about_p3:
      'I love automating and organizing — I have several Telegram bots for personal databases: calendar, recipes, shopping.',
    about_p4:
      'I\'m writing a life simulation: cells, rules, emergent behavior — it\'s fascinating how simple algorithms give rise to complex systems.',
    about_p5:
      'Outside of code, I play guitar, jaw harp, and hang drum, write poetry, and travel. I climbed Elbrus, did mountaineering, rock climbing, and flew a paraglider. Curious about space, philosophy, and psychology. Learning English (B1) and Spanish (A2) — I want to visit Peru.',

    // Skills
    skills_title: 'Skills',
    skills_languages: 'Languages',
    skills_android: 'Mobile',
    skills_networking: 'Networking & Serialization',
    skills_security: 'Security & Cryptography',
    skills_backend: 'Backend',
    skills_frontend: 'Frontend & Web',
    skills_architecture: 'Architecture & Patterns',
    skills_infra: 'Infrastructure & DevOps',
    skills_ai: 'AI & Automation',

    // Work & Projects (объединённая секция)
    work_title: 'Work & Projects',
    work_pet_title: 'Personal Projects',
    work_projects_one: '1 project',
    work_projects_few: '{count} projects',
    work_projects_many: '{count} projects',

    proj_github: 'GitHub',
    proj_gplay: 'Google Play',
    proj_private: 'Private',
    proj_contributions: 'My contributions',
    proj_toast_private: 'Private repository',
    proj_toast_no_link: 'No link available',
    proj_toast_gplay: 'Available on Google Play',
    proj_btn_screenshots: 'Screenshots',

    // Nadeks projects
    proj_pos_nadeks_name: 'ARIASOFT.POS / ARIASOFT.T2P',
    proj_pos_nadeks_desc:
      'Corporate payment application for 9+ hardware platforms with unified business logic and a public SDK for third-party integrators.\n• Designed Multihal architecture, eliminating separate builds per terminal — single APK for the entire device fleet\n• Integrated server-side JSON offline flow and implemented client-side state handling for logic management without network\n• Introduced JavaPoet-based code generation system to standardise security auditing at compile time\n• Extended JNI layer when adding new Java classes, implemented tasks in C++\n• Integrated biometric transaction authorisation\n• Implemented support for several POS protocols\n• Refactored command processing subsystem and logical core\n• Configured ProGuard obfuscation to protect payment protocols from reverse engineering',

    // Mahuru projects
    proj_gamecash_name: 'GameCash',
    proj_gamecash_desc:
      'Crypto gaming platform with lobby system and BTC/ETH wagering — built the Android app from scratch to production.\n• Designed and implemented full client: game lobbies with configurable parameters, crypto wallet management (deposit/withdrawal), authentication with 2FA\n• Built the network layer on OkHttp and local storage on SQLite: game state sync, transaction history\n• Independently shipped the product to production — from first commit to release',

    proj_magnitMRM_name: 'Enterprise MRM',
    proj_magnitMRM_desc:
      'Enterprise MRM application for one of the largest retailers in Russia; client-side development from scratch within a mobile team.\n• Designed and built 15+ screens: task/meeting/assembly management, custom calendar (year/month/week), file constructor with spreadsheet editor, search across tasks/attachments/people\n• Integrated enterprise MDM to secure the communication channel and enforce access control in an enterprise environment\n• Implemented offline-first architecture with local cache (Room) and synchronization via Retrofit/OkHttp',

    proj_paymentPos_name: 'Payment App',
    proj_paymentPos_desc:
      'Payment application for POS terminals: anti-fraud checks (root/emulator/antidebug), JavaPoet code generation, VisionLabs biometrics, 7 vendor SDKs.',

    proj_halkpay_name: 'HALK-Pay',
    proj_halkpay_desc:
      'Digital wallet Android app for a large bank with NFC payments via HCE.\n• Designed and implemented NFC HCE service — the core business feature: implemented the interaction protocol with payment terminals\n• Introduced independent native security modules (NDK/C): implemented a modular system for detecting compromised environments — shipped as independent Android libraries\n• Implemented multi-layer security: channel protection, secure data storage, protected payment data handling at UI level, user data encryption\n• Configured obfuscation and code protection for production builds — which enabled the app to be published on Google Play\n• Refactored MVVM architecture: extracted shared logic into base ViewModels and fragments, added card data validation',

    proj_walletNFC_name: 'Wallet / NFC',
    proj_walletNFC_desc:
      'NFC/QR wallet, cash register emulator, custom ASAP SDK transport for inter-process communication.',

    proj_mahuru_backend_name: 'Insurance Backend',
    proj_mahuru_backend_desc:
      'Corporate backend for a large insurance group — microservice system on Kotlin/Spring; contributed to domain service development.\n• Fixed a race condition in the service layer: parallelized independent data processing, eliminating thread blocking\n• Implemented a full vertical slice: Controller → Service → Repository with JPA/PostgreSQL',

    // Freelance projects
    proj_maybecoffee_name: 'MaybeCoffee',
    proj_maybecoffee_desc:
      'Two Android applications for a dating service with a "meet for coffee" concept — user app and coffee shop staff app.\n• Implemented end-to-end user flow: profiles, partner search on map, geo-based mini-chats\n• Developed in-chat order and payment module, including history and status tracking\n• Implemented coffee shop staff app: order queue, status management, loyalty programme\n• Brought both apps to production-ready state',

    proj_hebrewTrans_name: 'Hebrew → English Translator',
    proj_hebrewTrans_desc: 'Android translator app for Hebrew to English.',

    proj_lifesim_name: 'Simulation of Life',
    proj_lifesim_desc:
      'Desktop evolutionary simulation — full cycle from architecture to multiplatform build.\n• Designed Data-Oriented ECS from scratch: flat primitive arrays instead of objects, stateless engines, O(1) entity creation/destruction without allocations in hot path\n• Developed genomic system with inheritance and mutation (~3% per byte), modeling natural selection through competition for light',

    proj_amazonica_name: 'Amazonica',
    proj_amazonica_desc:
      'Android e-commerce app: catalog, cart, auth — built from scratch as a Jetpack Compose learning platform.\n• Designed single-module Clean Architecture with data / di / ui layers and a shared BaseViewModel with centralised error handling\n• Implemented nested navigation across three NavGraphs (Main / Auth / Catalog) and the Container/Stateless pattern for Compose Preview support\n• Introduced RepositoryResult<T> wrapper to isolate UI from data sources (Retrofit + Room + SharedPreferences)',

    proj_portfolio_name: 'Boris Portfolio',
    proj_portfolio_desc:
      'Personal portfolio website: single-page SPA with bilingual interface (EN/RU).\n• Built a custom i18n system on React Context without external libraries\n• Developed animated particle background with scroll and mouse reactivity (Canvas API) + scroll-triggered section animations (Framer Motion)\n• Added full test coverage (Vitest + React Testing Library): 61 unit and integration tests with Husky pre-push hook\n• Configured deployment on Vercel with SEO meta tags, Open Graph and built-in analytics',

    proj_aiagent_name: 'AI Personal Agent',
    proj_aiagent_desc:
      'Private AI assistant for everyday life — manages calendar, purchases, and recipes in Notion via natural language.\n• Built multi-step n8n workflows: intent classification → tool routing → Notion API calls\n• Integrated LLM as the orchestration layer: the agent parses free-form messages, extracts structured data, and dispatches CRUD operations across multiple Notion databases',

    proj_mtproxy_name: 'My-MTProxy',
    proj_mtproxy_desc:
      'Self-hosted Telegram proxy server with HTTPS traffic masking, designed for private use by a small group.\n• Designed a provisioning script (Bash) that deploys a fully ready service on a clean VPS with a single command: OS update, Docker installation, firewall configuration, container launch\n• Implemented transport-level traffic masking — the connection is visually indistinguishable from regular HTTPS\n• Automatic secret generation and ready-to-use connection link output immediately after installation',

    proj_poet_name: 'Poet Helper',
    proj_poet_desc:
      'Android app for selecting rhymes and synonyms — diploma project, published on Google Play.\n• Designed a rhyme and synonym matching algorithm from scratch: parsed multiple open dictionaries, populated a local SQLite database, and built search logic on top of it\n• Independently learned Android development: UI architecture, Activity/Fragment lifecycle, multithreading, and data persistence',

    // Experience bullets (переиспользуются в workblocks)
    exp_nadeks_role: 'Android Developer',
    exp_nadeks_type: 'Remote',
    exp_nadeks_b1: 'Android app for POS terminals (continuation from Mahuru)',
    exp_nadeks_b2: 'Vendor SDKs: card reading, encryption, receipt printing, transport setup',
    exp_nadeks_b3: 'Native code (C/C++), biometrics (VisionLabs), offline JSON-flow mode',
    exp_nadeks_b4: 'Core refactoring: command processing pipeline and processing abstractions',

    exp_mahuru_role: 'Android Developer',
    exp_mahuru_type: 'Moscow / Remote',
    exp_mahuru_b1: 'GameCash app from scratch: PvP crypto mini-games',
    exp_mahuru_b2: 'MRM app for Magnit corporation (Kotlin, Retrofit, Room, Koin, Moxy)',
    exp_mahuru_b3: 'Payment app for POS terminals: antifraud checks, JavaPoet codegen, VisionLabs biometrics, 7 vendor SDKs',
    exp_mahuru_b4: 'Wallet (NFC/QR), cash register emulator, custom ASAP SDK transport for IPC',
    exp_mahuru_b5: 'Backend (Jun–Sep 2024): Kotlin, Spring Boot, Kafka, PostgreSQL, Liquibase, Prometheus',

    exp_freelance_role: 'Android Developer',
    exp_freelance_type: 'Remote',
    exp_freelance_b1: 'MaybeCoffee: dating app for coffee shops (client-server)',
    exp_freelance_b2: 'Hebrew → English translator app',

    // Contact
    contact_title: 'Contact',
    contact_location: 'Pyatigorsk, Russia',
    updated_at: 'Updated',
  },

  ru: {
    // Navbar
    nav_about: 'Обо мне',
    nav_skills: 'Навыки',
    nav_work: 'Работа и проекты',
    nav_contact: 'Контакты',

    // Hero
    hero_name: 'Борис Варшавер',
    hero_role: 'Senior Android Developer',
    hero_tagline: 'Android — 9+ лет коммерческой разработки.',
    hero_tagline2: 'Backend — REST API и событийные сервисы.',
    hero_tagline3: 'Desktop — симулятор эволюции растений.',
    hero_tagline4: 'AI — агенты для автоматизации персональных задач.',
    hero_download: 'Скачать резюме',
    hero_contact: 'Написать мне',

    // About
    about_title: 'Обо мне',
    about_p1:
      'Senior Android Developer с более чем 9 годами коммерческого опыта — от платёжных систем для POS-терминалов и корпоративных MRM-решений до пользовательских приложений и игр.',
    about_p2:
      'Меня увлекает пересечение мобильной разработки и AI. Активно использую AI-инструменты (Claude Code, n8n, LLM API) в ежедневной работе.',
    about_p3:
      'Люблю автоматизировать и систематизировать — у меня есть несколько Telegram-ботов для личных баз данных: календарь, рецепты, покупки.',
    about_p4:
      'Пишу симуляцию жизни: клетки, правила, эмерджентное поведение — интересно наблюдать, как простые алгоритмы порождают сложные системы.',
    about_p5:
      'В свободное время играю на гитаре, варгане и ханге, пишу стихи, путешествую. Восходил на Эльбрус, занимался альпинизмом и скалолазанием, летал на параплане. Увлекаюсь космосом, философией и психологией. Изучаю английский (B1) и испанский (A2) — хочу в Перу.',

    // Skills
    skills_title: 'Навыки',
    skills_languages: 'Языки',
    skills_android: 'Мобильная разработка',
    skills_networking: 'Сеть и сериализация',
    skills_security: 'Безопасность и криптография',
    skills_backend: 'Backend',
    skills_frontend: 'Фронтенд и веб',
    skills_architecture: 'Архитектура и паттерны',
    skills_infra: 'Инфраструктура и DevOps',
    skills_ai: 'AI и автоматизация',

    // Work & Projects (объединённая секция)
    work_title: 'Работа и проекты',
    work_pet_title: 'Личные проекты',
    work_projects_one: '1 проект',
    work_projects_few: '{count} проекта',
    work_projects_many: '{count} проектов',

    proj_github: 'GitHub',
    proj_gplay: 'Google Play',
    proj_private: 'Приватный',
    proj_contributions: 'Мой вклад',
    proj_toast_private: 'Приватный репозиторий',
    proj_toast_no_link: 'Ссылка недоступна',
    proj_toast_gplay: 'Доступно на Google Play',
    proj_btn_screenshots: 'Скриншоты',

    // Nadeks projects
    proj_pos_nadeks_name: 'ARIASOFT.POS / ARIASOFT.T2P',
    proj_pos_nadeks_desc:
      'Корпоративное платёжное приложение для 9+ аппаратных платформ с единой бизнес-логикой и публичным SDK для сторонних интеграторов.\n• Спроектировал Multihal-архитектуру, устранив необходимость отдельных сборок под каждый терминал — единый APK для всего парка устройств\n• Интегрировал серверный offline-флоу на базе JSON и реализовал клиентскую обработку состояний для управления логикой без подключения к сети\n• Ввёл систему кодогенерации на базе JavaPoet для стандартизации security-аудита на уровне компиляции\n• Расширял JNI-слой при добавлении новых Java-классов, реализовывал задачи на C++\n• Интегрировал биометрическую авторизацию транзакций\n• Реализовал поддержку нескольких кассовых протоколов\n• Провёл рефакторинг подсистемы процессинга команд и логического ядра\n• Настроил ProGuard-обфускацию для защиты платёжных протоколов от реверс-инжиниринга',

    // Mahuru projects
    proj_gamecash_name: 'GameCash',
    proj_gamecash_desc:
      'Криптовалютная игровая платформа с лобби-системой и ставками в BTC/ETH — разработал Android-приложение с нуля до production.\n• Спроектировал и реализовал полный клиент: игровые лобби с настраиваемыми параметрами, управление криптокошельком (депозит/вывод), аутентификация с 2FA\n• Реализовал сетевой слой на OkHttp и локальное хранилище на SQLite: синхронизация состояния игр, история транзакций\n• Самостоятельно вывел продукт в production — от первого коммита до релиза',

    proj_magnitMRM_name: 'Enterprise MRM',
    proj_magnitMRM_desc:
      'Корпоративное MRM-приложение для одного из крупнейших ритейлеров России; разработка client-side с нуля в составе мобильной команды.\n• Спроектировал и разработал 15+ экранов: управление поручениями/встречами/собраниями, кастомный календарь (год/месяц/неделя), файл-конструктор с табличным редактором, поиск по делам/вложениям/людям\n• Внедрил корпоративную MDM-интеграцию для защиты канала связи и контроля доступа в рамках enterprise-окружения\n• Реализовал offline-first архитектуру с локальным кэшем (Room) и синхронизацией через Retrofit/OkHttp',

    proj_paymentPos_name: 'Платёжное приложение',
    proj_paymentPos_desc:
      'Платёжное приложение для POS-терминалов: антифрод-проверки (root/эмулятор/antidebug), кодогенерация через JavaPoet, биометрия VisionLabs, 7 вендорских SDK.',

    proj_halkpay_name: 'HALK-Pay',
    proj_halkpay_desc:
      'Android-приложение цифрового кошелька для крупного банка с NFC-платежами через HCE.\n• Спроектировал и реализовал NFC HCE-сервис — ключевую бизнес-функцию приложения: реализовал протокол взаимодействия с платёжным терминалом\n• Внедрил независимые нативные security-модули (NDK/C): реализовал модульную систему обнаружения скомпрометированного окружения — вынесена в независимые Android-библиотеки\n• Реализовал многоуровневый security-слой: защита канала связи, безопасное хранение данных, защищённая работа с платёжными данными на уровне UI, шифрование пользовательских данных\n• Настроил обфускацию и защиту кода для продакшн-сборки — что вывело проект в Google Play\n• Рефакторил архитектуру MVVM: вынес общую логику в базовые ViewModel и фрагменты, добавил валидацию карточных данных',

    proj_walletNFC_name: 'Кошелёк / NFC',
    proj_walletNFC_desc:
      'Кошелёк с поддержкой NFC/QR, эмулятор кассы, кастомный ASAP SDK-транспорт для межпроцессного взаимодействия.',

    proj_mahuru_backend_name: 'Insurance Backend',
    proj_mahuru_backend_desc:
      'Корпоративный backend крупной страховой группы — микросервисная система на Kotlin/Spring; участие в разработке domain-сервисов.\n• Устранил race condition в сервисном слое: распараллелил обработку независимых данных, устранив блокировки между потоками\n• Разработал полный вертикальный срез: Controller → Service → Repository с JPA/PostgreSQL',

    // Freelance projects
    proj_maybecoffee_name: 'MaybeCoffee',
    proj_maybecoffee_desc:
      'Два Android-приложения для сервиса знакомств с концепцией «познакомься и выпей кофе» — пользовательское и для персонала кофеен.\n• Реализовал end-to-end пользовательский флоу: профили, поиск партнёров на карте, мини-чаты по геолокации\n• Разработал модуль заказа и оплаты внутри чата, включая историю и отслеживание статусов\n• Реализовал приложение для персонала кофеен: очередь заказов, управление статусами, программа лояльности\n• Довёл оба приложения до production-ready состояния',

    proj_hebrewTrans_name: 'Переводчик иврит → английский',
    proj_hebrewTrans_desc: 'Android-приложение-переводчик с иврита на английский.',

    proj_lifesim_name: 'Simulation of Life',
    proj_lifesim_desc:
      'Десктопная эволюционная симуляция — полный цикл от архитектуры до мультиплатформенной сборки.\n• Спроектировал Data-Oriented ECS с нуля: плоские примитивные массивы вместо объектов, stateless-движки, O(1) создание/уничтожение сущностей без аллокаций в hot path\n• Разработал геномную систему с наследованием и мутацией (~3% на байт), моделирующую естественный отбор через конкуренцию за свет',

    proj_amazonica_name: 'Amazonica',
    proj_amazonica_desc:
      'Android-приложение интернет-магазина: каталог, корзина, авторизация — разработано с нуля как площадка для освоения Jetpack Compose.\n• Спроектировал одномодульную Clean Architecture с разбивкой на слои data / di / ui и общим BaseViewModel с централизованной обработкой ошибок\n• Реализовал вложенную навигацию из трёх NavGraph (Main / Auth / Catalog) и паттерн Container/Stateless для поддержки Compose Preview\n• Внедрил обёртку RepositoryResult<T> для изоляции UI от источников данных (Retrofit + Room + SharedPreferences)',

    proj_portfolio_name: 'Boris Portfolio',
    proj_portfolio_desc:
      'Персональный сайт-портфолио: одностраничное SPA с двуязычным интерфейсом (EN/RU).\n• Реализовал i18n-систему на React Context без внешних библиотек\n• Разработал анимированный частицевый фон с реакцией на скролл и мышь (Canvas API) + scroll-triggered анимации секций (Framer Motion)\n• Добавил полное тестовое покрытие (Vitest + React Testing Library): 61 юнит- и интеграционный тест с Husky pre-push hook\n• Настроил деплой на Vercel с SEO-метатегами, Open Graph и встроенной аналитикой',

    proj_aiagent_name: 'AI Personal Agent',
    proj_aiagent_desc:
      'Приватный AI-ассистент для повседневной жизни — управляет календарём, покупками и рецептами в Notion через естественный язык.\n• Построил многошаговые n8n-воркфлоу: классификация интента → маршрутизация инструментов → вызовы Notion API\n• Интегрировал LLM как слой оркестрации: агент разбирает произвольные сообщения, извлекает структурированные данные и диспатчит CRUD-операции по нескольким базам Notion',

    proj_mtproxy_name: 'My-MTProxy',
    proj_mtproxy_desc:
      'Self-hosted прокси-сервер для Telegram с маскировкой трафика под HTTPS, рассчитанный на приватное использование малой группой пользователей.\n• Спроектировал провижининг-скрипт (Bash), разворачивающий полностью готовый сервис на чистом VPS одной командой: обновление ОС, установка Docker, настройка фаервола, запуск контейнера\n• Реализовал маскировку трафика на уровне транспорта — соединение визуально неотличимо от обычного HTTPS\n• Автоматическая генерация секрета и вывод готовой ссылки подключения сразу после установки',

    proj_poet_name: 'Помощник поэта',
    proj_poet_desc:
      'Android-приложение для подбора рифм и синонимов — дипломный проект, опубликован на Google Play.\n• Разработал алгоритм подбора рифм и синонимов с нуля: спарсил несколько открытых словарей, наполнил локальную SQLite-базу и реализовал поиск на её основе\n• Самостоятельно освоил разработку под Android: UI-архитектура, жизненный цикл Activity/Fragment, многопоточность, работа с данными',

    // Experience bullets (переиспользуются в workblocks)
    exp_nadeks_role: 'Android Developer',
    exp_nadeks_type: 'Удалённо',
    exp_nadeks_b1: 'Разработка и поддержка Android-приложения для POS-терминалов',
    exp_nadeks_b2: 'Вендорские SDK: чтение карт, шифрование, печать чеков, настройка транспортов',
    exp_nadeks_b3: 'Нативный код (C/C++), биометрия (VisionLabs), offline-режим на базе JSON-flow',
    exp_nadeks_b4: 'Рефакторинг ядра обработки команд и абстракций процессинга',

    exp_mahuru_role: 'Android Developer',
    exp_mahuru_type: 'Москва / Удалённо',
    exp_mahuru_b1: 'Разработка приложения-игры GameCash с нуля: PvP мини-игры на криптовалюту',
    exp_mahuru_b2: 'Корпоративное MRM-приложение для «Магнит» (Kotlin, Retrofit, Room, Koin, Moxy)',
    exp_mahuru_b3: 'Платёжное приложение для POS-терминалов: антифрод, JavaPoet, VisionLabs, 7 SDK',
    exp_mahuru_b4: 'Кошелёк (NFC/QR), эмулятор кассы, кастомный ASAP SDK-транспорт для IPC',
    exp_mahuru_b5: 'Backend (июнь–сент 2024): Kotlin, Spring Boot, Kafka, PostgreSQL, Liquibase, Prometheus',

    exp_freelance_role: 'Android Developer',
    exp_freelance_type: 'Удалённо',
    exp_freelance_b1: 'MaybeCoffee: клиент-серверное приложение для знакомств в кофейнях',
    exp_freelance_b2: 'Приложение-переводчик иврит → английский',

    // Contact
    contact_title: 'Контакты',
    contact_location: 'Пятигорск, Россия',
    updated_at: 'Обновлено',
  },
} as const;

/**
 * Тип, объединяющий все допустимые ключи переводов.
 * Формируется автоматически на основе английской локали,
 * чтобы TypeScript мог проверять корректность ключей при вызове t().
 */
export type TranslationKey = keyof typeof translations.en;
