import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import WorkAndProjects from '@/components/WorkAndProjects';
import Contact from '@/components/Contact';
import BuildDate from '@/components/BuildDate';
import packageJson from '@/package.json';

/** Дата сборки — захватывается один раз при деплое */
const BUILD_ISO = new Date().toISOString();
/** Версия проекта из package.json */
const VERSION = packageJson.version;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WorkAndProjects />
        <Skills />
        <Contact />
      </main>
      <footer className="py-6 px-4 text-white/20 text-xs font-mono border-t border-white/5 bg-[#0d1117]">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-3">
          <BuildDate isoDate={BUILD_ISO} />
          <span>·</span>
          <span>v{VERSION}</span>
        </div>
      </footer>
    </>
  );
}
