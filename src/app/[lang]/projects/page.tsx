import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Projects' });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
