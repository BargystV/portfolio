/**
 * Интерфейс группы навыков.
 * Каждая группа имеет уникальный ключ для получения заголовка через i18n
 * и список строк с конкретными технологиями/инструментами.
 */
export interface SkillGroup {
  /** Ключ группы — используется для получения локализованного заголовка */
  key: 'languages' | 'android' | 'networking' | 'security' | 'backend' | 'frontend' | 'architecture' | 'infra' | 'ai';
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
    items: ['Kotlin', 'Java', 'C/C++', 'Python', 'TypeScript', 'Bash'],
  },
  {
    // Android-разработка и библиотеки
    key: 'android',
    items: ['Android', 'Jetpack Compose', 'Navigation Compose', 'DataBinding', 'HCE', 'Room', 'Hilt', 'Koin', 'Moxy', 'Coroutines', 'RxJava', 'EventBus', 'Glide', 'Coil', 'Facebook Shimmer', 'ZXing', 'VisionLabs', 'LibGDX'],
  },
  {
    // Сетевое взаимодействие и сериализация
    key: 'networking',
    items: ['Retrofit', 'OkHttp', 'Gson'],
  },
  {
    // Безопасность и криптография
    key: 'security',
    items: ['Bouncy Castle', 'BER-TLV', 'ProGuard', 'DexProtector', 'JavaPoet'],
  },
  {
    // Backend-разработка
    key: 'backend',
    items: ['Spring Boot', 'Spring WebFlux', 'Kafka', 'PostgreSQL', 'SQLite', 'JPA', 'Liquibase', 'Testcontainers'],
  },
  {
    // Фронтенд и веб-разработка
    key: 'frontend',
    items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Vitest'],
  },
  {
    // Архитектурные паттерны
    key: 'architecture',
    items: ['MVVM', 'MVP', 'Command Pattern', 'State machine', 'Microservices', 'API Gateway', 'ECS', 'Data-Oriented Design'],
  },
  {
    // Инфраструктура и DevOps
    key: 'infra',
    items: ['Docker', 'Docker Compose', 'Gradle', 'Firebase', 'Google Maps', 'Sentry', 'Xray-core', '3X-UI', 'UFW', 'fail2ban'],
  },
  {
    // AI и автоматизация
    key: 'ai',
    items: ['n8n', 'Claude Code'],
  },
];
