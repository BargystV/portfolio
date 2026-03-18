export interface SkillGroup {
  key: 'languages' | 'mobile' | 'arch' | 'ai';
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    key: 'languages',
    items: ['Kotlin', 'Java', 'Python', 'C/C++'],
  },
  {
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
