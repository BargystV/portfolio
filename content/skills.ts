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
    items: ['Kotlin', 'Java', 'C/C++'],
  },
  {
    // Мобильная разработка и Android-библиотеки
    key: 'mobile',
    items: ['Android', 'HCE', 'Room', 'Retrofit', 'OkHttp', 'Gson', 'Coroutines', 'Koin', 'Moxy', 'EventBus', 'JavaPoet', 'ZXing', 'VisionLabs', 'Bouncy Castle', 'BER-TLV', 'DataBinding', 'Hilt', 'RxJava', 'ProGuard', 'Firebase', 'Google Maps', 'SQLite', 'Glide', 'Facebook Shimmer'],
  },
  {
    // Архитектурные паттерны
    key: 'architecture',
    items: ['MVVM', 'MVP', 'Command Pattern', 'State machine', 'Microservices', 'API Gateway', 'ECS', 'Data-Oriented Design'],
  },
  {
    // Инструменты разработки и мониторинга
    key: 'tools',
    items: ['Gradle', 'Sentry', 'DexProtector', 'LibGDX'],
  },
  {
    // Backend-разработка
    key: 'backend',
    items: ['Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'JPA', 'Liquibase', 'Testcontainers'],
  },
];
