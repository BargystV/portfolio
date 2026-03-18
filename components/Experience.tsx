'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { experiences } from '@/content/experience';

export default function Experience() {
  const { lang, t } = useLanguage();

  return (
    <section id="experience" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-12"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('experience_title')}
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/8" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8"
              >
                {/* Dot */}
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#00d084]" />

                {/* Period */}
                <p className="font-mono text-xs text-white/30 mb-1">
                  {lang === 'en' ? exp.period : exp.periodRu}
                </p>

                {/* Company */}
                <h3 className="text-lg font-bold text-white">
                  {exp.company}
                </h3>

                {/* Role + type */}
                <p className="text-[#00d084] text-sm mb-4">
                  {t(exp.roleKey)}{' '}
                  <span className="text-white/30">· {t(exp.typeKey)}</span>
                </p>

                {/* Bullets */}
                <ul className="space-y-2">
                  {exp.bullets.map((bulletKey) => (
                    <li
                      key={bulletKey}
                      className="flex gap-3 text-white/55 text-sm leading-relaxed"
                    >
                      <span className="text-[#00d084]/50 mt-1 shrink-0">–</span>
                      {t(bulletKey)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
