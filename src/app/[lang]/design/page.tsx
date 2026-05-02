import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DesignExperience from '@/components/DesignExperience';

export const metadata: Metadata = {
  title: 'Design — Leonel Awouma',
  description: '3D visualizations of IT system concepts: network flow, infrastructure topology, threat propagation, and data convergence.',
};

export default async function DesignPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="flex flex-col min-h-screen bg-[#080c12]">
      <Header />
      <main className="flex-grow">
        <DesignExperience lang={lang} />
      </main>
      <Footer />
    </div>
  );
}
