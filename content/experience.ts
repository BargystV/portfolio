import { TranslationKey } from '@/lib/i18n';

export interface ExperienceItem {
  company: string;
  roleKey: TranslationKey;
  typeKey: TranslationKey;
  period: string; // displayed as-is
  periodRu: string;
  bullets: TranslationKey[];
}

export const experiences: ExperienceItem[] = [
  {
    company: 'Nadeks',
    roleKey: 'exp_nadeks_role',
    typeKey: 'exp_nadeks_type',
    period: 'Mar 2025 – Present',
    periodRu: 'Март 2025 – н.в.',
    bullets: [
      'exp_nadeks_b1',
      'exp_nadeks_b2',
      'exp_nadeks_b3',
      'exp_nadeks_b4',
    ],
  },
  {
    company: 'Mahuru',
    roleKey: 'exp_mahuru_role',
    typeKey: 'exp_mahuru_type',
    period: 'Aug 2019 – Mar 2025',
    periodRu: 'Авг 2019 – Март 2025',
    bullets: [
      'exp_mahuru_b1',
      'exp_mahuru_b2',
      'exp_mahuru_b3',
      'exp_mahuru_b4',
      'exp_mahuru_b5',
    ],
  },
  {
    company: 'Freelance',
    roleKey: 'exp_freelance_role',
    typeKey: 'exp_freelance_type',
    period: 'May 2017 – Jan 2019',
    periodRu: 'Май 2017 – Янв 2019',
    bullets: ['exp_freelance_b1', 'exp_freelance_b2'],
  },
];
