import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { Link as ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectDetailView from '@/components/ProjectDetailView';

function getProjectImage(slug: string) {
  switch (slug) {
    case 'traffic-analysis':
      return placeholderImages.find(p => p.id === 'project-1');
    case 'network-chatbot':
      return placeholderImages.find(p => p.id === 'project-2');
    case 'secure-access-control':
      return placeholderImages.find(p => p.id === 'project-3');
    case 'exchange-deployment':
      return placeholderImages.find(p => p.id === 'project-4');
    case 'trust-ai':
      return placeholderImages.find(p => p.id === 'project-5');
    case 'matrix-connect':
      return placeholderImages.find(p => p.id === 'project-6');
    case 'glpi-deployment':
      return placeholderImages.find(p => p.id === 'project-7');
    case 'busnesco-bi':
      return placeholderImages.find(p => p.id === 'project-8');
    default:
      return placeholderImages[0];
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const { slug, lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: `ProjectDetails.${slug}` });
  const projectImage = getProjectImage(slug);

  const liveUrl = t('liveUrl');

  return (
    <div className="flex flex-col min-h-screen bg-background bg-mesh">
      <Header />
      <ProjectDetailView>
        <Card className="overflow-hidden glass-card border-white/10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          {projectImage && (
            <div className="relative h-80 sm:h-[450px] w-full group overflow-hidden">
              <Image
                src={projectImage.imageUrl}
                alt={projectImage.description}
                data-ai-hint={projectImage.imageHint}
                fill
                style={{ objectFit: 'cover' }}
                priority
                className="transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 bg-gradient-to-t from-background to-transparent">
                 <div className="flex flex-wrap gap-3 mb-6">
                  {Array.isArray(t.raw('tags')) && (t.raw('tags') as string[]).map((tag, index) => (
                    <Badge key={index} className="bg-primary/30 backdrop-blur-md text-white border-white/20 px-4 py-1.5 text-sm font-semibold">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-4xl sm:text-6xl font-headline font-extrabold text-white mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight">
                  {t('title')}
                </CardTitle>
                <CardDescription className="text-xl sm:text-2xl text-white/90 font-medium max-w-3xl drop-shadow-md">
                  {t('subtitle')}
                </CardDescription>
              </div>
            </div>
          )}
          <CardContent className="p-8 sm:p-12 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <div className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:text-primary prose-p:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed">
                  <h3 className="text-3xl font-bold mb-6">{t('about.title')}</h3>
                  <p>{t('about.description')}</p>

                  <h3 className="text-3xl font-bold mt-12 mb-6">{t('features.title')}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                    {Array.isArray(t.raw('features.list')) && (t.raw('features.list') as string[]).map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="p-8 bg-white/5 border border-white/5 rounded-2xl">
                  <h3 className="text-2xl font-bold font-headline text-primary mb-6">{t('tech.title')}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">{t('tech.description')}</p>
                  
                  {liveUrl && (
                    <a 
                      href={liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full h-14 rounded-2xl text-lg font-bold glow-shadow bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-3 transition-all duration-500 hover:scale-[1.02] hover:brightness-110 active:scale-95 group/link border border-white/10 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/link:opacity-100 transition-opacity duration-500"></div>
                      <Globe className="h-6 w-6 transition-all duration-500 group-hover/link:rotate-[360deg] relative z-10" />
                      <span className="relative z-10">{t('visitSite')}</span>
                    </a>
                  )}
                </div>
                
                <Button variant="outline" asChild className="w-full h-14 rounded-xl text-lg border-white/10 hover:bg-white/5 transition-colors">
                  <Link href="/projects">
                    ← {lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </ProjectDetailView>
      <Footer />
    </div>
  );
}
