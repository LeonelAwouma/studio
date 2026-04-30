"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  return (
    <section id="about" className="relative">
      <div className="absolute inset-0 bg-mesh opacity-20"></div>
      <div className="container relative z-10">
        <Card className="max-w-4xl mx-auto glass-card border-white/5">
          <CardContent className="p-8 sm:p-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 animated-gradient-text">
                {t('title')}
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl text-center text-foreground/80 leading-relaxed font-light">
              {t('description')}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
