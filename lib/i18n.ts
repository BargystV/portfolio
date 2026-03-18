export type Lang = 'en' | 'ru';

export const translations = {
  en: {
    // Navbar
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_experience: 'Experience',
    nav_blog: 'Blog',
    nav_contact: 'Contact',

    // Hero
    hero_role: 'Senior Android Developer',
    hero_tagline: '8+ years building Android apps. Passionate about mobile × AI.',
    hero_download: 'Download Resume',
    hero_contact: 'Contact Me',

    // About
    about_title: 'About',
    about_p1:
      'I\'m a Senior Android Developer with over 8 years of commercial experience building production-grade Android applications — from POS terminal payment systems and enterprise MRM solutions to consumer apps and games.',
    about_p2:
      'I\'m fascinated by the intersection of mobile development and AI. I actively use AI tools (Claude Code, n8n, LLM APIs) in my daily workflow to boost productivity and build smarter products. Currently also expanding into backend development with Kotlin and Spring Boot.',
    about_p3:
      'Outside of code, I play guitar, write poetry, and travel. I\'m curious about space, philosophy, and psychology. Always learning — English B1, Spanish A2.',

    // Skills
    skills_title: 'Skills',
    skills_languages: 'Languages',
    skills_mobile: 'Mobile & Android',
    skills_arch: 'Architecture & Infra',
    skills_ai: 'AI & Other',

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

    // Blog
    blog_title: 'Blog',
    blog_coming: 'Coming soon',
    blog_desc: 'Articles about Android development, AI tools, and software engineering.',

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
    nav_blog: 'Блог',
    nav_contact: 'Контакты',

    // Hero
    hero_role: 'Senior Android Developer',
    hero_tagline: '8+ лет разработки Android-приложений. Увлечён пересечением мобайла и AI.',
    hero_download: 'Скачать резюме',
    hero_contact: 'Написать мне',

    // About
    about_title: 'Обо мне',
    about_p1:
      'Senior Android Developer с более чем 8 годами коммерческого опыта разработки production-приложений — от платёжных систем для POS-терминалов и корпоративных MRM-решений до пользовательских приложений и игр.',
    about_p2:
      'Меня увлекает пересечение мобильной разработки и AI. Активно использую AI-инструменты (Claude Code, n8n, LLM API) в ежедневной работе для повышения продуктивности. Параллельно развиваюсь в бэкенд-разработке на Kotlin и Spring Boot.',
    about_p3:
      'В свободное время играю на гитаре, пишу стихи и путешествую. Увлекаюсь космосом, философией и психологией. Продолжаю изучать английский (B1) и испанский (A2).',

    // Skills
    skills_title: 'Навыки',
    skills_languages: 'Языки',
    skills_mobile: 'Mobile & Android',
    skills_arch: 'Архитектура & Инфра',
    skills_ai: 'AI & Прочее',

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

    // Blog
    blog_title: 'Блог',
    blog_coming: 'Скоро',
    blog_desc: 'Статьи об Android-разработке, AI-инструментах и инженерии.',

    // Contact
    contact_title: 'Контакты',
    contact_subtitle: 'Открыт к новым возможностям — пишите.',
    contact_location: 'Пятигорск, Россия',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
