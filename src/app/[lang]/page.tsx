import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Community from '@/components/Community';
import Interests from '@/components/Interests';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  void lang; // used for locale context
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Experience />
        <Education />
        <Community />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
