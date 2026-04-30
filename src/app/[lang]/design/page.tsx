import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DesignPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow relative w-full h-[calc(100vh-80px)]">
        <iframe 
          src="/design.html" 
          className="absolute inset-0 w-full h-full border-none"
          title="WebGL Design Particles"
        />
      </main>
      <Footer />
    </div>
  );
}
