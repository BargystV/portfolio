import { TranslationKey } from '@/lib/i18n';

export interface Project {
  nameKey: TranslationKey;
  descKey: TranslationKey;
  stack: string[];
  period?: string;
  githubUrl?: string;
  googlePlayUrl?: boolean;
  isPrivate?: boolean;
}

export const projects: Project[] = [
  {
    nameKey: 'proj_lifesim_name',
    descKey: 'proj_lifesim_desc',
    stack: ['Kotlin', 'LibGDX'],
    period: 'Sep 2025 – Jan 2026',
    githubUrl: 'https://github.com/BargystV/simulation-of-life',
  },
  {
    nameKey: 'proj_aiagent_name',
    descKey: 'proj_aiagent_desc',
    stack: ['n8n', 'Python', 'LLM API', 'Notion'],
    period: 'Apr 2025 – Present',
    isPrivate: true,
  },
  {
    nameKey: 'proj_amazonica_name',
    descKey: 'proj_amazonica_desc',
    stack: ['Kotlin', 'Android'],
    githubUrl: 'https://github.com/BargystV/Amazonica',
  },
  {
    nameKey: 'proj_reviro_name',
    descKey: 'proj_reviro_desc',
    stack: ['Android', 'Kotlin'],
    githubUrl: 'https://github.com/BargystV/ReviroApp',
  },
  {
    nameKey: 'proj_poet_name',
    descKey: 'proj_poet_desc',
    stack: ['Kotlin', 'Android'],
    period: 'May – Nov 2017',
    googlePlayUrl: true,
  },
];
