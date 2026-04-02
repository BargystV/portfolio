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
function renderDesc(text: string) {
  const lines = text.split('\n');
  const intro = lines[0];
  const bullets = lines.slice(1).filter((l) => l.startsWith('•'));

  return (
    <>
      <p className="text-white/55 text-sm leading-relaxed mb-3">{intro}</p>
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
 * Возвращает цвет статусной точки блока компании:
 * зелёный — есть ссылка на сайт, серый — нет ссылки.
 */
function getBlockDotColor(block: { url?: string }): string {
  if (block.url) return 'bg-[#00d084]';
  return 'bg-white/20';
}

/**
 * Возвращает локализованный текст счётчика проектов с правильным склонением.
 */
function projectCountText(count: number, t: (key: TranslationKey) => string, lang: string): string {
  if (count === 1) return t('work_projects_one');
  if (lang === 'ru') {
    // Русское склонение: 2-4 проекта, 5-20 проектов, 21 проект и т.д.
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      return t('work_projects_few').replace('{count}', String(count));
    }
    return t('work_projects_many').replace('{count}', String(count));
  }
  return t('work_projects_many').replace('{count}', String(count));
}

/**
 * Chevron-стрелка с плавным вращением для индикации свёрнутого/развёрнутого состояния.
 */
function Chevron({ expanded, size = 'md' }: { expanded: boolean; size?: 'md' | 'sm' }) {
  return (
    <motion.span
      animate={{ rotate: expanded ? 90 : 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`inline-flex items-center justify-center text-[#00d084] shrink-0 ${size === 'sm' ? 'text-xs w-4' : 'text-base w-5'}`}
    >
      ▶
    </motion.span>
  );
}

/**
 * Карточка проекта с двумя состояниями:
 * свёрнутое — компактная строка с названием и статусом,
 * развёрнутое — полная карточка с описанием, стеком и ссылками.
 */
function ProjectCard({
  project,
  delay,
  isExpanded,
  onToggle,
  toastPrivate,
  toastNoLink,
  toastGplay,
  t,
  lang,
  onScreenshots,
}: {
  project: WorkProject;
  delay: number;
  isExpanded: boolean;
  onToggle: () => void;
  toastPrivate: string;
  toastNoLink: string;
  toastGplay: string;
  t: (key: TranslationKey) => string;
  lang: string;
  /** Callback открытия галереи скриншотов — передаётся только если у проекта есть скриншоты */
  onScreenshots?: () => void;
}) {
  // Текст инлайн-тоста справа от названия — null означает «скрыт»
  const [inlineToast, setInlineToast] = useState<string | null>(null);

  /** Определяет действие по клику в зависимости от статуса проекта */
  function handleActionClick(e: React.MouseEvent) {
    // Предотвращаем toggle при клике на ссылки внутри раскрытой карточки
    e.stopPropagation();

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
      className="relative"
    >
      {/* Свёрнутый заголовок проекта — всегда виден */}
      <motion.div
        onClick={onToggle}
        whileHover={{ y: -2, transition: { duration: 0.15, ease: 'easeOut' } }}
        className={`flex items-center gap-2.5 rounded-xl border ${isExpanded ? 'border-[#00d084]/30 bg-[#0d1117]' : 'border-white/8 bg-[#0d1117] hover:border-[#00d084]/30'} p-4 cursor-pointer transition-colors duration-150`}
      >
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
        {project.period && (
          <p className="font-mono text-xs text-white/30 ml-auto shrink-0">
            {lang === 'ru' && project.periodRu ? project.periodRu : project.period}
          </p>
        )}
        <Chevron expanded={isExpanded} size="sm" />
      </motion.div>

      {/* Развёрнутое содержимое проекта */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              onClick={isClickable ? handleActionClick : undefined}
              className={`border border-t-0 border-[#00d084]/30 rounded-b-xl bg-[#0d1117] p-6 pt-4 -mt-3 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {/* Описание: renderDesc корректно обрабатывает и буллеты, и простой текст */}
              {renderDesc(t(project.descKey))}

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * Компонент объединённой секции "Работа и проекты".
 * Двухуровневое сворачивание: блоки компаний и проекты внутри них.
 * По умолчанию всё свёрнуто. Несколько блоков/проектов могут быть открыты одновременно.
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
  // Множества раскрытых блоков и проектов (по id/nameKey)
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  /** Переключает раскрытие блока компании */
  const toggleBlock = (id: string) => {
    setExpandedBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /** Переключает раскрытие карточки проекта */
  const toggleProject = (key: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section id="work" className="py-24 px-4">
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
        <div className="space-y-4">
          {workBlocks.map((block, i) => {
            const isBlockExpanded = expandedBlocks.has(block.id);

            return (
              // Блок появляется снизу с задержкой i * 0.1с
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Кликабельный заголовок блока */}
                <div
                  onClick={() => toggleBlock(block.id)}
                  className={`flex items-center gap-4 cursor-pointer group rounded-xl border ${isBlockExpanded ? 'border-[#00d084]/30' : 'border-white/8 hover:border-[#00d084]/30'} bg-[#0d1117] p-4 transition-colors duration-150`}
                >
                  {/* Статусная точка блока — выровнена по центру названия (h3) */}
                  <span className={`w-2 h-2 rounded-full shrink-0 ${block.company ? 'self-start mt-[14px] sm:mt-[18px]' : ''} ${getBlockDotColor(block)}`} />
                  <div className="flex-1 min-w-0">
                    {block.company ? (
                      <>
                        {/* Название компании — кликабельно если задан url */}
                        {block.url ? (
                          <a
                            href={block.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-block"
                          >
                            <h3 className="text-2xl sm:text-3xl font-bold text-white hover:text-[#00d084] transition-colors duration-200 mb-0.5">
                              {block.company}
                            </h3>
                          </a>
                        ) : (
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{block.company}</h3>
                        )}
                        {/* Период работы */}
                        <p className="font-mono text-xs text-[#00d084]">
                          {lang === 'en' ? block.period : block.periodRu}
                        </p>
                      </>
                    ) : (
                      /* py компенсирует отсутствие строки даты, центрируя заголовок */
                      <h3 className="text-2xl sm:text-3xl font-bold text-white py-[9px]">{t('work_pet_title')}</h3>
                    )}
                  </div>
                  {/* Счётчик проектов */}
                  <span className="font-mono text-xs text-white/30 shrink-0 ml-auto">
                    {projectCountText(block.projects.length, t, lang)}
                  </span>
                  <Chevron expanded={isBlockExpanded} />
                </div>

                {/* Раскрываемый список проектов */}
                <AnimatePresence initial={false}>
                  {isBlockExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-3 pt-3 pl-9">
                        {block.projects.map((project, j) => (
                          <ProjectCard
                            key={project.nameKey}
                            project={project}
                            delay={j * 0.06}
                            isExpanded={expandedProjects.has(project.nameKey)}
                            onToggle={() => toggleProject(project.nameKey)}
                            toastPrivate={t('proj_toast_private')}
                            toastNoLink={t('proj_toast_no_link')}
                            toastGplay={t('proj_toast_gplay')}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
