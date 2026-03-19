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
    nav_projects: 'Projects',
    nav_experience: 'Experience',
    nav_contact: 'Contact',

    // Hero
    hero_name: 'Boris Varshaver',
    hero_role: 'Senior Android Developer',
    hero_tagline: 'Android — 8+ years of commercial development.',
    hero_tagline2: 'Backend — Kotlin, Spring Boot, Kafka.',
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
    skills_other: 'Other',

    // Projects
    projects_title: 'Projects',
    proj_github: 'GitHub',
    proj_gplay: 'Google Play',
    proj_private: 'Private',

    proj_lifesim_name: 'Life Simulation',
    proj_lifesim_desc:
      'Plant lifecycle simulation: growth, seed reproduction, death. Each offspring inherits a genome with mutations — evolutionary algorithm based on genetic variability.',

    proj_amazonica_name: 'Amazonica',
    proj_amazonica_desc:
      'Android application built with Kotlin.',

    proj_reviro_name: 'ReviroApp',
    proj_reviro_desc:
      'Android application.',

    proj_aiagent_name: 'AI Personal Agent',
    proj_aiagent_desc:
      'Automated AI agent for personal life management: Notion Calendar, purchases & movies database, books. Orchestrated via n8n with LLM integration for natural language control.',

    proj_poet_name: 'Poet Helper',
    proj_poet_desc:
      'Android app that suggests rhymes and synonyms. Published on Google Play. Diploma project.',

    // Experience
    experience_title: 'Experience',
    exp_present: 'Present',

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
  },

  ru: {
    // Navbar
    nav_about: 'Обо мне',
    nav_skills: 'Навыки',
    nav_projects: 'Проекты',
    nav_experience: 'Опыт',
    nav_contact: 'Контакты',

    // Hero
    hero_name: 'Борис Варшавер',
    hero_role: 'Senior Android Developer',
    hero_tagline: 'Android — 8+ лет коммерческой разработки.',
    hero_tagline2: 'Backend — Kotlin, Spring Boot, Kafka.',
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
    skills_other: 'Прочее',

    // Projects
    projects_title: 'Проекты',
    proj_github: 'GitHub',
    proj_gplay: 'Google Play',
    proj_private: 'Приватный',

    proj_lifesim_name: 'Life Simulation',
    proj_lifesim_desc:
      'Симуляция жизненного цикла растений: рост, размножение через семена, смерть. Геном каждого потомка наследуется с мутациями — эволюционный алгоритм на основе генетического наследования.',

    proj_amazonica_name: 'Amazonica',
    proj_amazonica_desc:
      'Android-приложение на Kotlin.',

    proj_reviro_name: 'ReviroApp',
    proj_reviro_desc:
      'Android-приложение.',

    proj_aiagent_name: 'AI Personal Agent',
    proj_aiagent_desc:
      'Автоматизированный AI-агент для управления личной жизнью: Notion Calendar, база данных покупок, фильмов, книг. Оркестрация через n8n, интеграция LLM для естественного языкового управления.',

    proj_poet_name: 'Помощник поэта',
    proj_poet_desc:
      'Android-приложение для подбора рифм и синонимов. Опубликовано на Google Play. Дипломный проект.',

    // Experience
    experience_title: 'Опыт работы',
    exp_present: 'н.в.',

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
  },
} as const;

/**
 * Тип, объединяющий все допустимые ключи переводов.
 * Формируется автоматически на основе английской локали,
 * чтобы TypeScript мог проверять корректность ключей при вызове t().
 */
export type TranslationKey = keyof typeof translations.en;
