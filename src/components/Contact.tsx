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
    <section id="contact" className="bg-secondary">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-headline font-bold animated-gradient-text">{t('title')}</CardTitle>
                  <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <ContactForm />
              </div>
              <div className="p-8 md:p-12 bg-secondary/50 border-l border-border/20 flex flex-col justify-center">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-headline">{t('socialTitle')}</h3>
                  <div className="space-y-4">
                    {socials.map((social) => (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-background group"
                      >
                        <span className="text-accent group-hover:text-primary transition-colors">{social.icon}</span>
                        <span className="text-foreground group-hover:text-primary transition-colors font-medium">{social.name}</span>
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
