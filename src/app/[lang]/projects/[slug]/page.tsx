import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { Link as ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function getProjectImage(slug: string) {
  switch (slug) {
    case 'trust-ai':
      return placeholderImages.find(p => p.id === 'project-1');
    case 'network-chatbot':
      return placeholderImages.find(p => p.id === 'project-2');
    case 'secure-access-control':
      return placeholderImages.find(p => p.id === 'project-3');
    default:
      return placeholderImages[0];
  }
}

export default async function ProjectDetailPage({ params: { slug, lang } }: { params: { slug: string, lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: `ProjectDetails.${slug}` });
  const projectImage = getProjectImage(slug);

  const liveUrl = t('liveUrl');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 sm:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              {projectImage && (
                <div className="relative h-64 sm:h-80 w-full">
                  <Image
                    src={projectImage.imageUrl}
                    alt={projectImage.description}
                    data-ai-hint={projectImage.imageHint}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              )}
              <CardHeader className="p-6 sm:p-8">
                <CardTitle className="text-3xl sm:text-4xl font-headline font-bold animated-gradient-text">{t('title')}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{t('subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0">
                <div className="flex flex-wrap gap-2 mb-8">
                  {(t.raw('tags') as string[]).map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none text-foreground/90">
                  <h3 className="font-headline text-2xl font-bold text-primary">{t('about.title')}</h3>
                  <p>{t('about.description')}</p>

                  <h3 className="font-headline text-2xl font-bold text-primary">{t('features.title')}</h3>
                  <ul>
                    {(t.raw('features.list') as string[]).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  <h3 className="font-headline text-2xl font-bold text-primary">{t('tech.title')}</h3>
                  <p>{t('tech.description')}</p>
                </div>
                
                {liveUrl && (
                  <div className="mt-10 text-center">
                    <Button asChild>
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-5 w-5" />
                        {t('visitSite')}
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
