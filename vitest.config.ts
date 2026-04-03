import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

/** Конфигурация Vitest для тестирования React-компонентов портфолио */
export default defineConfig({
  plugins: [react()],
  test: {
    // Используем jsdom для эмуляции DOM-среды браузера
    environment: 'jsdom',
    // Файл с глобальными моками и настройкой тестовой среды
    setupFiles: ['./vitest.setup.ts'],
    // Паттерн поиска тестовых файлов
    include: ['__tests__/**/*.test.{ts,tsx}'],
    // Глобальные переменные (describe, it, expect, vi) без явного импорта
    globals: true,
  },
  resolve: {
    alias: {
      // Алиас для абсолютных импортов вида @/components/...
      '@': path.resolve(__dirname, '.'),
    },
  },
})
