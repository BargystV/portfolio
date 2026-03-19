/**
 * Интерфейс группы навыков.
 * Каждая группа имеет уникальный ключ для получения заголовка через i18n
 * и список строк с конкретными технологиями/инструментами.
 */
export interface SkillGroup {
  /** Ключ группы — используется для получения локализованного заголовка */
  key: 'languages' | 'mobile' | 'architecture' | 'tools' | 'backend' | 'ai';
  /** Список технологий или инструментов в данной группе */
  items: string[];
}

/**
 * Массив групп навыков, отображаемых в секции Skills.
 * Порядок элементов определяет порядок отображения на странице.
 */
export const skillGroups: SkillGroup[] = [
  {
    // Языки программирования
    key: 'languages',
    items: ['Kotlin', 'Java', 'Python', 'C/C++'],
  },
  {
    // Мобильная разработка и Android-библиотеки (сортировка по категориям)
    key: 'mobile',
    items: [
      // UI
      'Jetpack Compose',
      'Compose Multiplatform',
      // Async
      'Coroutines',
      // Network
      'Retrofit',
      'OkHttp',
      // DB
      'Room',
      // DI
      'Koin',
      // Image
      'Glide',
      // Build
      'Proguard',
      // Scan / Hardware
      'ZXing',
      'NFC',
      'Biometrics',
      // Code generation / Security
      'JavaPoet',
      'BouncyCastle',
      // Game / Graphics
      'LibGDX',
    ],
  },
  {
    // Архитектурные паттерны
    key: 'architecture',
    items: ['MVVM', 'Clean Architecture', 'SOLID'],
  },
  {
    // Инструменты разработки и тестирования
    key: 'tools',
    items: ['Git', 'Gradle', 'JUnit', 'Sentry', 'Jenkins'],
  },
  {
    // Backend-технологии и инфраструктура
    key: 'backend',
    items: ['Spring Boot', 'Ktor', 'Kafka', 'PostgreSQL'],
  },
  {
    // AI-инструменты
    key: 'ai',
    items: ['Claude Code', 'n8n', 'LLM API'],
  },
];
