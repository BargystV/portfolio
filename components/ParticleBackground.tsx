'use client';

import { useEffect, useRef } from 'react';

/** Одна частица на canvas-фоне */
interface Particle {
  x: number;
  y: number;
  /** Базовая скорость дрейфа (постоянная) */
  bvx: number;
  bvy: number;
  /** Дополнительный импульс от курсора (затухает) */
  ex: number;
  ey: number;
  r: number;
}

/** Количество частиц на 1 000 000 px² площади экрана */
const DENSITY = 80;
/** Максимальное расстояние для соединительной линии между частицами */
const LINK_DIST = 120;
/** Цвет частиц и линий (терминальный зелёный) */
const COLOR = '0, 208, 132';
/** Радиус зоны отталкивания курсора */
const MOUSE_RADIUS = 100;
/** Сила отталкивания от курсора */
const MOUSE_FORCE = 0.6;

/**
 * Полноэкранный анимированный canvas-фон с дрейфующими частицами.
 * Частицы медленно перемещаются и соединяются полупрозрачными линиями
 * при сближении, создавая «network/constellation» эффект.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    /** Текущий импульс скролла, затухает каждый кадр */
    let scrollImpulse = 0;
    /** Предыдущая позиция скролла для вычисления дельты */
    let lastScrollY = window.scrollY;
    /** Позиция курсора (-1 = вне окна) */
    let mouseX = -1;
    let mouseY = -1;

    /** Инициализация размеров canvas и массива частиц */
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Количество частиц пропорционально площади экрана
      const area = canvas.width * canvas.height;
      const count = Math.floor((area / 1_000_000) * DENSITY);

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        bvx: (Math.random() - 0.5) * 0.3,
        bvy: (Math.random() - 0.5) * 0.3,
        ex: 0,
        ey: 0,
        r: Math.random() * 1.2 + 0.5,
      }));
    };

    /** Основной цикл анимации */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Плавное затухание импульса скролла
      scrollImpulse *= 0.85;

      // Обновление позиций с учётом импульса скролла и отталкивания от курсора
      for (const p of particles) {
        // Отталкивание от курсора — добавляет импульс
        if (mouseX >= 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            p.ex += (dx / dist) * force;
            p.ey += (dy / dist) * force;
          }
        }

        // Затухание только дополнительного импульса, базовый дрейф не трогаем
        p.ex *= 0.95;
        p.ey *= 0.95;

        p.x += p.bvx + p.ex;
        p.y += p.bvy + p.ey - scrollImpulse * p.r;

        // Отражение по горизонтали
        if (p.x < 0 || p.x > canvas.width) p.bvx *= -1;
        // Оборачивание по вертикали — вылетевшая частица появляется с противоположной стороны
        if (p.y < 0) p.y += canvas.height;
        else if (p.y > canvas.height) p.y -= canvas.height;
      }

      // Отрисовка соединительных линий между близкими частицами
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DIST) {
            const opacity = (1 - dist / LINK_DIST) * 0.15;
            ctx.strokeStyle = `rgba(${COLOR}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Отрисовка самих частиц
      for (const p of particles) {
        ctx.fillStyle = `rgba(${COLOR}, 0.4)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    init();
    animate();

    /** Обработка скролла — накапливает импульс по дельте */
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollImpulse += delta * 0.3;
      lastScrollY = window.scrollY;
    };

    /** Обновление позиции курсора */
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    /** Сброс курсора при выходе за пределы окна */
    const onMouseLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };

    const onResize = () => init();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
