import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import WorkAndProjects from '@/components/WorkAndProjects';
import Contact from '@/components/Contact';
import BuildDate from '@/components/BuildDate';

/** Дата сборки — захватывается один раз при деплое */
const BUILD_ISO = new Date().toISOString();

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <WorkAndProjects />
        <Contact />
      </main>
      <footer className="py-6 px-4 text-white/20 text-xs font-mono border-t border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <BuildDate isoDate={BUILD_ISO} />
        </div>
      </footer>
    </>
  );
}
