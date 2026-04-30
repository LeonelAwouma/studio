"use client";

import { Github, Linkedin, Home } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/LeonelAwouma',
    icon: <Github className="w-6 h-6" />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/leonelawouma',
    icon: <Linkedin className="w-6 h-6" />
  },
  {
    name: 'Portfolio',
    url: 'https://portfolio-iayg.vercel.app',
    icon: <Home className="w-6 h-6" />
  }
];

export default function Contact() {
  const t = useTranslations('Contact');
  return (
    <section id="contact" className="relative">
      <div className="absolute inset-0 bg-mesh opacity-20"></div>
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden glass-card border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3 p-8 md:p-16">
                <CardHeader className="p-0 mb-10">
                  <h2 className="text-4xl font-headline font-bold mb-4 animated-gradient-text">{t('title')}</h2>
                  <CardDescription className="text-lg text-muted-foreground leading-relaxed">{t('description')}</CardDescription>
                </CardHeader>
                <ContactForm />
              </div>
              <div className="md:col-span-2 p-8 md:p-16 bg-white/5 backdrop-blur-sm border-l border-white/5 flex flex-col justify-center">
                <div className="space-y-10">
                  <h3 className="text-2xl font-bold font-headline text-foreground">{t('socialTitle')}</h3>
                  <div className="space-y-6">
                    {socials.map((social) => (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-6 p-4 rounded-2xl transition-all duration-300 bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 hover:-translate-x-2 group"
                      >
                        <div className="p-3 bg-background rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <span className="text-primary">{social.icon}</span>
                        </div>
                        <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">{social.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
