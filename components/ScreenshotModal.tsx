'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * Пропсы модальной галереи скриншотов.
 */
interface ScreenshotModalProps {
  /** Массив путей к скриншотам (относительно /public) */
  screenshots: string[];
  /** Локализованное название проекта */
  projectName: string;
  /** Callback закрытия модалки */
  onClose: () => void;
  /** Флаг широкоформатных скриншотов (презентации, слайды, 16:9 / 4:3) */
  wide?: boolean;
}

/** Варианты анимации слайда при смене скриншота */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/**
 * Модальная галерея скриншотов приложения.
 * Поддерживает навигацию стрелками клавиатуры и кликом по оверлею для закрытия.
 */
export default function ScreenshotModal({ screenshots, projectName, onClose, wide = false }: ScreenshotModalProps) {
  const [index, setIndex] = useState(0);
  // Направление анимации: 1 — вперёд, -1 — назад
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % screenshots.length);
  }, [screenshots.length]);

  // Навигация с клавиатуры
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка с названием и кнопкой закрытия */}
        <div className="flex items-center justify-between w-full mb-4 px-1">
          <span className="text-white font-bold text-sm">{projectName}</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/35">
              {index + 1} / {screenshots.length}
            </span>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors text-lg leading-none"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Стрелки + изображение */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-colors text-sm"
            aria-label="Предыдущий"
          >
            ←
          </button>

          {/* Контейнер изображения: широкий (16:9/4:3) или вертикальный (телефон) */}
          <div
            className={`relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl ${
              wide
                ? 'w-[min(720px,85vw)] aspect-[4/3]'
                : 'w-[320px] h-[640px] sm:w-[400px] sm:h-[800px] max-h-[75vh]'
            }`}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.18, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={screenshots[index]}
                  alt={`${projectName} screenshot ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes={wide ? '720px' : '400px'}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-colors text-sm"
            aria-label="Следующий"
          >
            →
          </button>
        </div>

        {/* Точки-индикаторы */}
        <div className="flex gap-2 mt-4">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? 'bg-yellow-400' : 'bg-white/20'
              }`}
              aria-label={`Скриншот ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
