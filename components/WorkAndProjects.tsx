'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { workBlocks, WorkProject } from '@/content/workblocks';
import { TranslationKey } from '@/lib/i18n';
import ScreenshotModal from '@/components/ScreenshotModal';

/**
 * Рендерит описание проекта: первая строка — вводный абзац,
 * строки начинающиеся с «•» — маркированный список вклада.
 */
function renderDesc(text: string, contributionsLabel: string) {
  const lines = text.split('\n');
  const intro = lines[0];
  const bullets = lines.slice(1).filter((l) => l.startsWith('•'));

  return (
    <>
      <p className="text-white/55 text-sm leading-relaxed mb-3">{intro}</p>
      {bullets.length > 0 && (
        <p className="text-[#00d084]/50 font-mono text-xs mb-2">{contributionsLabel}</p>
      )}
      {bullets.length > 0 && (
        <ul className="space-y-1 mb-4">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-white/45 leading-relaxed">
              {/* Акцентная точка списка */}
              <span className="text-[#00d084]/60 mt-0.5 shrink-0">▸</span>
              <span>{b.slice(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * Возвращает цвет статусной точки проекта:
 * зелёный — есть GitHub/Store, жёлтый — есть скриншоты или Google Play, красный — приватный, серый — нет ссылки.
 */
function getDotColor(project: WorkProject): string {
  if (project.screenshots?.length) return 'bg-yellow-400';
  if (project.githubUrl || project.rustoreUrl || project.googlePlayUrl) return 'bg-[#00d084]';
  if (project.isPrivate) return 'bg-red-500';
  return 'bg-white/20';
}

/**
 * Карточка проекта со статусной точкой, кликом и инлайн-тостом справа от названия.
 */
function ProjectCard({
  project,
  delay,
  toastPrivate,
  toastNoLink,
  toastGplay,
  contributionsLabel,
  isWork,
  t,
  lang,
  onScreenshots,
}: {
  project: WorkProject;
  delay: number;
  toastPrivate: string;
  toastNoLink: string;
  toastGplay: string;
  contributionsLabel: string;
  isWork: boolean;
  t: (key: TranslationKey) => string;
  lang: string;
  /** Callback открытия галереи скриншотов — передаётся только если у проекта есть скриншоты */
  onScreenshots?: () => void;
}) {
  // Текст инлайн-тоста справа от названия — null означает «скрыт»
  const [inlineToast, setInlineToast] = useState<string | null>(null);

  /** Определяет действие по клику в зависимости от статуса проекта */
  function handleClick() {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (project.rustoreUrl) {
      window.open(project.rustoreUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    // Если googlePlayUrl — строка, открываем ссылку напрямую; иначе показываем тост
    if (typeof project.googlePlayUrl === 'string') {
      window.open(project.googlePlayUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    // Если есть скриншоты — открываем галерею
    if (project.screenshots?.length && onScreenshots) {
      onScreenshots();
      return;
    }
    let message: string;
    if (project.googlePlayUrl) message = toastGplay;
    else if (project.isPrivate) message = toastPrivate;
    else message = toastNoLink;

    setInlineToast(message);
    setTimeout(() => setInlineToast(null), 2000);
  }

  const isClickable = !!(
    project.githubUrl ||
    project.rustoreUrl ||
    typeof project.googlePlayUrl === 'string' ||
    project.screenshots?.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.15, ease: 'easeOut' } }}
      onClick={handleClick}
      className={`relative flex flex-col rounded-xl border border-white/8 bg-white/[0.03] p-6 hover:border-[#00d084]/30 transition-colors duration-150 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* Шапка: статусная точка + название + инлайн-тост справа */}
      <div className="flex items-center gap-2.5 mb-2">
        <span className={`w-2 h-2 rounded-full shrink-0 ${getDotColor(project)}`} />
        <h4 className="font-bold text-white text-base">{t(project.nameKey)}</h4>
        <AnimatePresence>
          {inlineToast && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="ml-1 self-center text-xs font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded"
            >
              {inlineToast}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Период разработки — отображается только если задан, локализован */}
      {project.period && (
        <p className="font-mono text-xs text-white/30 mb-3">
          {lang === 'ru' && project.periodRu ? project.periodRu : project.period}
        </p>
      )}

      {/* Описание: с буллетами для рабочих, простое для личных */}
      {isWork
        ? renderDesc(t(project.descKey), contributionsLabel)
        : <p className="text-white/55 text-sm leading-relaxed mb-4">{t(project.descKey)}</p>
      }

      {/* Теги стека технологий */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-xs font-mono text-[#00d084]/70 bg-[#00d084]/5 border border-[#00d084]/15"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Компонент объединённой секции "Работа и проекты".
 * Отображает 4 блока: Nadeks, Mahuru, Freelance, Личные проекты.
 * Каждый рабочий блок содержит шапку компании и карточки проектов.
 * Блок личных проектов показывает только заголовок и карточки.
 */
/**
 * Данные для открытой галереи скриншотов — null означает закрыта.
 */
interface ScreenshotModalState {
  screenshots: string[];
  name: string;
  /** Флаг широкоформатных скриншотов */
  wide?: boolean;
}

export default function WorkAndProjects() {
  // Получаем текущий язык и функцию перевода из языкового контекста
  const { lang, t } = useLanguage();
  // Состояние модальной галереи скриншотов
  const [screenshotModal, setScreenshotModal] = useState<ScreenshotModalState | null>(null);

  return (
    <section id="work" className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок секции с анимацией появления при скролле */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-16"
        >
          <span className="text-[#00d084] font-mono mr-2">{'>'}</span>
          {t('work_title')}
        </motion.h2>

        {/* Блоки компаний и проектов */}
        <div className="space-y-20">
          {workBlocks.map((block, i) => (
            // Блок появляется снизу с задержкой i * 0.1с
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {block.company ? (
                <>
                  {/* Шапка компании — только для рабочих блоков */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* Вертикальная акцентная полоса рядом с шапкой */}
                    <div className="w-1 self-stretch bg-[#00d084]/30 rounded-full shrink-0" />
                    <div>
                      {/* Название компании — кликабельно если задан url */}
                      {block.url ? (
                        <a href={block.url} target="_blank" rel="noopener noreferrer">
                          <h3 className="text-3xl font-bold text-white hover:text-[#00d084] transition-colors duration-200 mb-1">
                            {block.company}
                          </h3>
                        </a>
                      ) : (
                        <h3 className="text-3xl font-bold text-white mb-1">{block.company}</h3>
                      )}
                      {/* Период работы зелёным цветом под названием компании */}
                      <p className="font-mono text-xs text-[#00d084]">
                        {lang === 'en' ? block.period : block.periodRu}
                      </p>
                    </div>
                  </div>

                  {/* Карточки рабочих проектов */}
                  <div className="grid gap-5">
                    {block.projects.map((project, j) => (
                      <ProjectCard
                        key={project.nameKey}
                        project={project}
                        delay={j * 0.06}
                        toastPrivate={t('proj_toast_private')}
                        toastNoLink={t('proj_toast_no_link')}
                        toastGplay={t('proj_toast_gplay')}
                        contributionsLabel={t('proj_contributions')}
                        isWork={true}
                        t={t}
                        lang={lang}
                        onScreenshots={
                          project.screenshots?.length
                            ? () => setScreenshotModal({ screenshots: project.screenshots!, name: t(project.nameKey), wide: project.screenshotWide })
                            : undefined
                        }
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Шапка блока личных проектов — по аналогии с рабочими блоками */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1 self-stretch bg-[#00d084]/30 rounded-full shrink-0" />
                    <h3 className="text-3xl font-bold text-white">{t('work_pet_title')}</h3>
                  </div>

                  {/* Карточки личных проектов */}
                  <div className="grid gap-5">
                    {block.projects.map((project, j) => (
                      <ProjectCard
                        key={project.nameKey}
                        project={project}
                        delay={j * 0.06}
                        toastPrivate={t('proj_toast_private')}
                        toastNoLink={t('proj_toast_no_link')}
                        toastGplay={t('proj_toast_gplay')}
                        contributionsLabel={t('proj_contributions')}
                        isWork={false}
                        t={t}
                        lang={lang}
                        onScreenshots={
                          project.screenshots?.length
                            ? () => setScreenshotModal({ screenshots: project.screenshots!, name: t(project.nameKey), wide: project.screenshotWide })
                            : undefined
                        }
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальная галерея скриншотов */}
      <AnimatePresence>
        {screenshotModal && (
          <ScreenshotModal
            screenshots={screenshotModal.screenshots}
            projectName={screenshotModal.name}
            wide={screenshotModal.wide}
            onClose={() => setScreenshotModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
