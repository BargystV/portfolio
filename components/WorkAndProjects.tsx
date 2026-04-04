'use client';

import { useState, useRef, useCallback } from 'react';
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
 * Тип действия проекта: скриншоты, внешняя ссылка, приватный или ничего.
 */
type ProjectActionType = 'screenshots' | 'link' | 'private' | 'none';

/**
 * Результат определения действия проекта для отображения кнопки.
 */
interface ProjectAction {
  /** Тип действия */
  type: ProjectActionType;
  /** Иконка для боковой полосы */
  icon: string;
  /** CSS-класс цвета фона полосы */
  bgColor: string;
  /** CSS-класс фона полосы при наведении */
  hoverBgColor: string;
  /** CSS-класс цвета рамки-разделителя */
  borderColor: string;
  /** CSS-класс цвета иконки */
  textColor: string;
  /** CSS-класс цвета иконки при наведении */
  hoverTextColor: string;
  /** Метка для текстовой кнопки (напр. "GitHub", "RuStore") — null для некликабельных */
  label: string | null;
}

/**
 * Определяет единственное действие проекта по приоритету:
 * скриншоты > внешняя ссылка > приватный > нет действия.
 */
function getProjectAction(project: WorkProject): ProjectAction {
  // Скриншоты — наивысший приоритет
  if (project.screenshots?.length) {
    return {
      type: 'screenshots',
      icon: '🖼',
      bgColor: 'bg-[#be64ff]/[0.08]',
      hoverBgColor: 'hover:bg-[#be64ff]/20',
      borderColor: 'border-[#be64ff]/20',
      textColor: 'text-[#be64ff]',
      hoverTextColor: 'hover:text-[#d48fff]',
      label: null, // будет формироваться отдельно с учётом i18n
    };
  }
  // Внешняя ссылка (GitHub, RuStore, Google Play строка)
  if (project.githubUrl) {
    return {
      type: 'link',
      icon: '↗',
      bgColor: 'bg-[#00d084]/[0.08]',
      hoverBgColor: 'hover:bg-[#00d084]/20',
      borderColor: 'border-[#00d084]/20',
      textColor: 'text-[#00d084]',
      hoverTextColor: 'hover:text-[#00d084]',
      label: 'GitHub',
    };
  }
  if (project.rustoreUrl) {
    return {
      type: 'link',
      icon: '↗',
      bgColor: 'bg-[#00d084]/[0.08]',
      hoverBgColor: 'hover:bg-[#00d084]/20',
      borderColor: 'border-[#00d084]/20',
      textColor: 'text-[#00d084]',
      hoverTextColor: 'hover:text-[#00d084]',
      label: 'RuStore',
    };
  }
  if (typeof project.googlePlayUrl === 'string') {
    return {
      type: 'link',
      icon: '↗',
      bgColor: 'bg-[#00d084]/[0.08]',
      hoverBgColor: 'hover:bg-[#00d084]/20',
      borderColor: 'border-[#00d084]/20',
      textColor: 'text-[#00d084]',
      hoverTextColor: 'hover:text-[#00d084]',
      label: 'Google Play',
    };
  }
  // Приватный проект (без скриншотов и без ссылок)
  if (project.isPrivate) {
    return {
      type: 'private',
      icon: '🔒',
      bgColor: 'bg-red-500/[0.06]',
      hoverBgColor: 'hover:bg-red-500/15',
      borderColor: 'border-red-500/15',
      textColor: 'text-red-500/50',
      hoverTextColor: 'hover:text-red-400/70',
      label: null,
    };
  }
  // Нет действия
  return {
    type: 'none',
    icon: '—',
    bgColor: 'bg-white/[0.02]',
    hoverBgColor: 'hover:bg-white/[0.08]',
    borderColor: 'border-white/[0.08]',
    textColor: 'text-white/20',
    hoverTextColor: 'hover:text-white/40',
    label: null,
  };
}

/**
 * Определяет действие для блока компании по наличию URL.
 */
function getBlockAction(block: { url?: string }): ProjectAction {
  if (block.url) {
    return {
      type: 'link',
      icon: '↗',
      bgColor: 'bg-[#00d084]/[0.08]',
      hoverBgColor: 'hover:bg-[#00d084]/20',
      borderColor: 'border-[#00d084]/20',
      textColor: 'text-[#00d084]',
      hoverTextColor: 'hover:text-[#00d084]',
      label: null,
    };
  }
  return {
    type: 'none',
    icon: '—',
    bgColor: 'bg-white/[0.02]',
    hoverBgColor: 'hover:bg-white/[0.08]',
    borderColor: 'border-white/[0.08]',
    textColor: 'text-white/20',
    hoverTextColor: 'hover:text-white/40',
    label: null,
  };
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
 * свёрнутое — строка с боковой полосой-кнопкой, названием и периодом,
 * развёрнутое — полная карточка с описанием, стеком и текстовой кнопкой действия.
 */
function ProjectCard({
  project,
  delay,
  isExpanded,
  onToggle,
  t,
  lang,
  onScreenshots,
}: {
  project: WorkProject;
  delay: number;
  isExpanded: boolean;
  onToggle: () => void;
  t: (key: TranslationKey) => string;
  lang: string;
  /** Callback открытия галереи скриншотов — передаётся только если у проекта есть скриншоты */
  onScreenshots?: () => void;
}) {
  const action = getProjectAction(project);
  /** Кликабельна ли боковая полоса */
  const isActionClickable = action.type === 'screenshots' || action.type === 'link' || action.type === 'private';

  // Тост для приватного проекта
  const [privateToast, setPrivateToast] = useState(false);
  const privateToastTimer = useRef<ReturnType<typeof setTimeout>>();

  /** Обработчик клика по боковой полосе */
  function handleStripClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (action.type === 'link') {
      const url = project.githubUrl || project.rustoreUrl || (typeof project.googlePlayUrl === 'string' ? project.googlePlayUrl : undefined);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'screenshots' && onScreenshots) {
      onScreenshots();
    } else if (action.type === 'private') {
      // Показываем тост «Приватный репозиторий»
      clearTimeout(privateToastTimer.current);
      setPrivateToast(true);
      privateToastTimer.current = setTimeout(() => setPrivateToast(false), 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative"
    >
      {/* Свёрнутый заголовок проекта с боковой полосой */}
      <motion.div
        onClick={onToggle}
        whileHover={{ y: -2, transition: { duration: 0.15, ease: 'easeOut' } }}
        className={`flex rounded-xl border ${isExpanded ? 'border-[#00d084]/30 bg-[#0d1117]' : 'border-white/10 bg-[#0d1117] hover:border-[#00d084]/30'} cursor-pointer transition-colors duration-150 overflow-hidden`}
      >
        {/* Боковая полоса-кнопка */}
        {isActionClickable ? (
          <a
            onClick={handleStripClick}
            className={`flex items-center justify-center w-10 shrink-0 ${action.bgColor} ${action.hoverBgColor} border-r ${action.borderColor} ${action.textColor} ${action.hoverTextColor} text-sm cursor-pointer transition-all duration-150`}
            title={action.label || t('proj_btn_screenshots')}
          >
            {action.icon}
          </a>
        ) : (
          <span
            className={`flex items-center justify-center w-10 shrink-0 ${action.bgColor} border-r ${action.borderColor} ${action.textColor} text-sm cursor-default`}
          >
            {action.icon}
          </span>
        )}
        {/* Содержимое заголовка */}
        <div className="flex items-center gap-2.5 flex-1 p-4">
          <h4 className="font-bold text-base text-white">{t(project.nameKey)}</h4>
          {/* Инлайн-тост для приватного проекта — правее названия */}
          <AnimatePresence>
            {privateToast && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded"
              >
                {t('proj_toast_private')}
              </motion.span>
            )}
          </AnimatePresence>
          {project.period && (
            <p className="font-mono text-xs text-white/30 ml-auto shrink-0">
              {lang === 'ru' && project.periodRu ? project.periodRu : project.period}
            </p>
          )}
          <Chevron expanded={isExpanded} size="sm" />
        </div>
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
            <div className="border border-t-0 border-[#00d084]/30 rounded-b-xl bg-[#0d1117] p-6 pt-4 -mt-3">
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
  // Инлайн-тосты для блоков без URL — каждый блок независим
  const [blockToasts, setBlockToasts] = useState<Set<string>>(new Set());
  const blockToastTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  /** Показывает тост для блока, сбрасывая только его собственный таймер */
  const showBlockToast = useCallback((id: string) => {
    const prev = blockToastTimers.current.get(id);
    if (prev) clearTimeout(prev);
    setBlockToasts((s) => new Set(s).add(id));
    blockToastTimers.current.set(id, setTimeout(() => {
      setBlockToasts((s) => { const next = new Set(s); next.delete(id); return next; });
      blockToastTimers.current.delete(id);
    }, 2000));
  }, []);

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
            // Разделитель перед блоком личных проектов (без company)
            const showDivider = !block.company && i > 0;
            // Действие блока — ссылка на сайт компании или ничего
            const blockAction = getBlockAction(block);
            const isBlockClickable = blockAction.type === 'link';

            return (
              // Блок появляется снизу с задержкой i * 0.1с
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Градиентный разделитель между рабочими блоками и личными проектами */}
                {showDivider && (
                  <div className="flex items-center gap-3 px-1 mb-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00d084]/30" />
                    <span className="font-mono text-xs text-[#00d084]/50 tracking-wide">{'>_'}</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#00d084]/30 to-transparent" />
                  </div>
                )}

                {/* Кликабельный заголовок блока с боковой полосой */}
                <div
                  onClick={() => toggleBlock(block.id)}
                  className={`flex cursor-pointer group rounded-xl border ${isBlockExpanded ? 'border-[#00d084]/30' : 'border-white/10 hover:border-[#00d084]/30'} bg-[#0d1117] transition-colors duration-150 overflow-hidden`}
                >
                  {/* Боковая полоса блока */}
                  {isBlockClickable ? (
                    <a
                      onClick={(e) => { e.stopPropagation(); window.open(block.url!, '_blank', 'noopener,noreferrer'); }}
                      className={`flex items-center justify-center w-12 shrink-0 ${blockAction.bgColor} ${blockAction.hoverBgColor} border-r ${blockAction.borderColor} ${blockAction.textColor} ${blockAction.hoverTextColor} text-base cursor-pointer transition-all duration-150`}
                      title={block.company || t('work_pet_title')}
                    >
                      {blockAction.icon}
                    </a>
                  ) : (
                    <span
                      onClick={(e) => { e.stopPropagation(); showBlockToast(block.id); }}
                      className={`flex items-center justify-center w-12 shrink-0 ${blockAction.bgColor} ${blockAction.hoverBgColor} border-r ${blockAction.borderColor} ${blockAction.textColor} ${blockAction.hoverTextColor} text-base cursor-pointer transition-all duration-150`}
                    >
                      {blockAction.icon}
                    </span>
                  )}
                  {/* Содержимое заголовка блока */}
                  <div className="flex items-center gap-4 flex-1 p-4">
                    <div className="flex-1 min-w-0">
                      {block.company ? (
                        <>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white">
                              {block.company}
                            </h3>
                            {/* Тост «Ссылка недоступна» для блоков без URL */}
                            <AnimatePresence>
                              {blockToasts.has(block.id) && (
                                <motion.span
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -6 }}
                                  transition={{ duration: 0.15 }}
                                  className="text-sm font-mono text-white/40 border border-white/10 px-3 py-1 rounded"
                                >
                                  {t('proj_toast_no_link')}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                          {/* Период работы */}
                          <p className="font-mono text-xs text-[#00d084]">
                            {lang === 'en' ? block.period : block.periodRu}
                          </p>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 py-[9px]">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">
                            {t('work_pet_title')}
                          </h3>
                          {/* Тост «Ссылка недоступна» для блока Личные проекты */}
                          <AnimatePresence>
                            {blockToasts.has(block.id) && (
                              <motion.span
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ duration: 0.15 }}
                                className="text-sm font-mono text-white/40 border border-white/10 px-3 py-1 rounded"
                              >
                                {t('proj_toast_no_link')}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                    {/* Счётчик проектов */}
                    <span className="font-mono text-xs text-white/30 shrink-0 ml-auto">
                      {projectCountText(block.projects.length, t, lang)}
                    </span>
                    <Chevron expanded={isBlockExpanded} />
                  </div>
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
