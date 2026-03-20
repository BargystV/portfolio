import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import WorkAndProjects from '@/components/WorkAndProjects';
import Contact from '@/components/Contact';

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
      <footer className="py-8 text-center text-white/20 text-xs font-mono border-t border-white/5">
        © {new Date().getFullYear()} Boris Varshaver
      </footer>
    </>
  );
}
