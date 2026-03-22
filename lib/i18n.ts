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
      'Senior Android Developer with over 8 years of commercial experience — from POS terminal payment systems and enterprise MRM solutions to consumer apps and games.',
    about_p2:
      'I\'m fascinated by the intersection of mobile development and AI. I actively use AI tools (Claude Code, n8n, LLM APIs) in my daily workflow.',
    about_p3:
      'I love automating and organizing — I have several Telegram bots for personal databases: books, movies, recipes, shopping.',
    about_p4:
      'I\'m writing a life simulation: cells, rules, emergent behavior — it\'s fascinating how simple algorithms give rise to complex systems.',
    about_p5:
      'Outside of code, I play guitar, jaw harp, and hang drum, write poetry, and travel. I climbed Elbrus, did mountaineering, rock climbing, and flew a paraglider. Curious about space, philosophy, and psychology. Learning English (B1) and Spanish (A2) — I want to visit Peru.',

    // Skills
    skills_title: 'Skills',
    skills_languages: 'Languages',
    skills_mobile: 'Mobile & Android',
    skills_architecture: 'Architecture',
    skills_tools: 'Tools',
    skills_backend: 'Backend / Infra',
    skills_ai: 'AI',

    // Work & Projects (объединённая секция)
    work_title: 'Work & Projects',
    work_pet_title: 'Personal Projects',

    proj_github: 'GitHub',
    proj_gplay: 'Google Play',
    proj_private: 'Private',
    proj_contributions: 'My contributions',
    proj_toast_private: 'Private repository',
    proj_toast_no_link: 'No link available',
    proj_toast_gplay: 'Available on Google Play',

    // Nadeks projects
    proj_pos_nadeks_name: 'ARIASOFT.POS / ARIASOFT.T2P',
    proj_pos_nadeks_desc:
      'Corporate payment application for 9+ hardware platforms with unified business logic and a public SDK for third-party integrators.\n• Designed Multihal architecture, eliminating separate builds per terminal — single APK for the entire device fleet\n• Integrated server-side JSON offline flow and implemented client-side state handling for logic management without network\n• Introduced JavaPoet-based code generation system to standardise security auditing at compile time\n• Extended JNI layer when adding new Java classes, implemented tasks in C++\n• Integrated biometric transaction authorisation\n• Implemented support for several POS protocols\n• Refactored command processing subsystem and logical core\n• Configured ProGuard obfuscation to protect payment protocols from reverse engineering',

    // Mahuru projects
    proj_gamecash_name: 'GameCash',
    proj_gamecash_desc: 'PvP crypto mini-games app built from scratch with cryptocurrency integration.',

    proj_magnitMRM_name: 'Magnit MRM',
    proj_magnitMRM_desc:
      'Enterprise MRM application for Magnit corporation: calendar, tasks, file constructor (analog Google Sheets), notifications feed, search, drafts, archive. Stack: Kotlin, Retrofit, Room, Koin, Moxy.',

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

    proj_lifesim_name: 'Life Simulation',
    proj_lifesim_desc:
      'Plant lifecycle simulation: growth, seed reproduction, death. Each offspring inherits a genome with mutations — evolutionary algorithm based on genetic variability.',

    proj_amazonica_name: 'Amazonica',
    proj_amazonica_desc:
      'Android application built with Kotlin.',

    proj_aiagent_name: 'AI Personal Agent',
    proj_aiagent_desc:
      'Automated AI agent for personal life management: Notion Calendar, purchases & movies database, books. Orchestrated via n8n with LLM integration for natural language control.',

    proj_poet_name: 'Poet Helper',
    proj_poet_desc:
      'Android app that suggests rhymes and synonyms. Published on Google Play. Diploma project.',

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
    contact_subtitle: 'Open to new opportunities — feel free to reach out.',
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
      'Senior Android Developer с более чем 8 годами коммерческого опыта — от платёжных систем для POS-терминалов и корпоративных MRM-решений до пользовательских приложений и игр.',
    about_p2:
      'Меня увлекает пересечение мобильной разработки и AI. Активно использую AI-инструменты (Claude Code, n8n, LLM API) в ежедневной работе.',
    about_p3:
      'Люблю автоматизировать и систематизировать — у меня есть несколько Telegram-ботов для личных баз данных: книги, фильмы, рецепты, покупки.',
    about_p4:
      'Пишу симуляцию жизни: клетки, правила, эмерджентное поведение — интересно наблюдать, как простые алгоритмы порождают сложные системы.',
    about_p5:
      'В свободное время играю на гитаре, варгане и ханге, пишу стихи, путешествую. Восходил на Эльбрус, занимался альпинизмом и скалолазанием, летал на параплане. Увлекаюсь космосом, философией и психологией. Изучаю английский (B1) и испанский (A2) — хочу в Перу.',

    // Skills
    skills_title: 'Навыки',
    skills_languages: 'Языки',
    skills_mobile: 'Mobile & Android',
    skills_architecture: 'Архитектура',
    skills_tools: 'Инструменты',
    skills_backend: 'Backend / Инфра',
    skills_ai: 'AI',

    // Work & Projects (объединённая секция)
    work_title: 'Работа и проекты',
    work_pet_title: 'Личные проекты',

    proj_github: 'GitHub',
    proj_gplay: 'Google Play',
    proj_private: 'Приватный',
    proj_contributions: 'Мой вклад',
    proj_toast_private: 'Приватный репозиторий',
    proj_toast_no_link: 'Ссылка недоступна',
    proj_toast_gplay: 'Доступно на Google Play',

    // Nadeks projects
    proj_pos_nadeks_name: 'ARIASOFT.POS / ARIASOFT.T2P',
    proj_pos_nadeks_desc:
      'Корпоративное платёжное приложение для 9+ аппаратных платформ с единой бизнес-логикой и публичным SDK для сторонних интеграторов.\n• Спроектировал Multihal-архитектуру, устранив необходимость отдельных сборок под каждый терминал — единый APK для всего парка устройств\n• Интегрировал серверный offline-флоу на базе JSON и реализовал клиентскую обработку состояний для управления логикой без подключения к сети\n• Ввёл систему кодогенерации на базе JavaPoet для стандартизации security-аудита на уровне компиляции\n• Расширял JNI-слой при добавлении новых Java-классов, реализовывал задачи на C++\n• Интегрировал биометрическую авторизацию транзакций\n• Реализовал поддержку нескольких кассовых протоколов\n• Провёл рефакторинг подсистемы процессинга команд и логического ядра\n• Настроил ProGuard-обфускацию для защиты платёжных протоколов от реверс-инжиниринга',

    // Mahuru projects
    proj_gamecash_name: 'GameCash',
    proj_gamecash_desc: 'Приложение PvP мини-игр на криптовалюту, написанное с нуля.',

    proj_magnitMRM_name: 'Magnit MRM',
    proj_magnitMRM_desc:
      'Корпоративное MRM-приложение для сети «Магнит»: календарь, задачи, файловый конструктор (аналог Google Sheets), лента уведомлений, поиск, черновики, архив. Стек: Kotlin, Retrofit, Room, Koin, Moxy.',

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

    proj_lifesim_name: 'Life Simulation',
    proj_lifesim_desc:
      'Симуляция жизненного цикла растений: рост, размножение через семена, смерть. Геном каждого потомка наследуется с мутациями — эволюционный алгоритм на основе генетического наследования.',

    proj_amazonica_name: 'Amazonica',
    proj_amazonica_desc:
      'Android-приложение на Kotlin.',

    proj_aiagent_name: 'AI Personal Agent',
    proj_aiagent_desc:
      'Автоматизированный AI-агент для управления личной жизнью: Notion Calendar, база данных покупок, фильмов, книг. Оркестрация через n8n, интеграция LLM для естественного языкового управления.',

    proj_poet_name: 'Помощник поэта',
    proj_poet_desc:
      'Android-приложение для подбора рифм и синонимов. Опубликовано на Google Play. Дипломный проект.',

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
    contact_subtitle: 'Открыт к новым возможностям — пишите.',
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
