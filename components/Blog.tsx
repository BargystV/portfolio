'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();

  return (
    <section id="blog" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-12"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('blog_title')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/8 bg-white/[0.02] p-10 text-center"
        >
          {/* Terminal-style decoration */}
          <div className="font-mono text-4xl text-[#00d084]/30 mb-4">_</div>
          <p className="font-mono text-[#00d084] text-lg mb-2">{t('blog_coming')}</p>
          <p className="text-white/40 text-sm">{t('blog_desc')}</p>
        </motion.div>
      </div>
    </section>
  );
}
