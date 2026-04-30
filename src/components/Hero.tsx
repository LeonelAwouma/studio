"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Send, Github, Linkedin, Mail } from 'lucide-react';
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { useTranslations } from "next-intl";

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/LeonelAwouma', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/leonelawouma', icon: Linkedin },
  { name: 'Email', href: 'mailto:leonelawouma65@gmail.com', icon: Mail },
];

const profileImage = placeholderImages.find(p => p.id === 'profile');

export default function Hero() {
  const t = useTranslations('Hero');
  return (
    <section id="home" className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-mesh">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/0.1),transparent)]"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl glass-card border-primary/20 mb-8 animate-fade-in-up group hover:border-primary/50 transition-all duration-500 shadow-2xl shadow-primary/20 bg-background/40">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <p className="text-base md:text-lg font-black tracking-[0.25em] uppercase animated-gradient-text drop-shadow-sm">
                {t('role')}
              </p>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-headline font-extrabold mb-8 leading-tight">
              Leonel <br /><span className="animated-gradient-text">AWOUMA</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 mb-12 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start mb-12">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg glow-shadow hover:scale-105 transition-transform">
                <a href="/CV_LEONEL_AWOUMA.pdf" download>
                  <Download className="mr-3 h-5 w-5" />
                  {t('downloadCV')}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all">
                <Link href="#contact">
                  <Send className="mr-3 h-5 w-5" />
                  {t('contactMe')}
                </Link>
              </Button>
            </div>
            <div className="flex justify-center md:justify-start gap-8">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:scale-125 transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="h-8 w-8" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            {profileImage && (
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 group">
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-indigo-500 to-accent opacity-40 blur-3xl group-hover:opacity-60 transition-opacity duration-700 animate-pulse"></div>
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 glow-shadow rotate-3 group-hover:rotate-0 transition-all duration-700">
                  <Image
                    src={profileImage.imageUrl}
                    alt={profileImage.description}
                    data-ai-hint={profileImage.imageHint}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
