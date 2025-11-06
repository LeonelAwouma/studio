import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  return (
    <section id="about" className="bg-secondary">
      <div className="container">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-3xl font-headline font-bold text-center mb-6 animated-gradient-text">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-center text-foreground/80 leading-relaxed">
              {t('description')}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
