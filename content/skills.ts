/**
 * Интерфейс группы навыков.
 * Каждая группа имеет уникальный ключ для получения заголовка через i18n
 * и список строк с конкретными технологиями/инструментами.
 */
export interface SkillGroup {
  /** Ключ группы — используется для получения локализованного заголовка */
  key: 'languages' | 'mobile' | 'arch' | 'ai';
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
    // Мобильная разработка и Android-библиотеки
    key: 'mobile',
    items: [
      'Jetpack Compose',
      'Room',
      'Retrofit',
      'OkHttp',
      'Koin',
      'Moxy',
      'Glide',
      'Proguard',
      'AirWatch SDK',
      'Zxing',
      'LibGDX',
    ],
  },
  {
    // Архитектурные паттерны, инструменты сборки и инфраструктура
    key: 'arch',
    items: [
      'MVVM',
      'Clean Architecture',
      'SOLID',
      'Git',
      'Gradle',
      'JUnit',
      'SQLite',
      'Spring Boot',
      'Kafka',
      'PostgreSQL',
    ],
  },
  {
    // AI-инструменты, специализированные технологии и прочее
    key: 'ai',
    items: [
      'Claude Code',
      'n8n',
      'LLM API',
      'NFC',
      'QR',
      'VisionLabs',
      'JavaPoet',
      'Bouncycastle',
    ],
  },
];
