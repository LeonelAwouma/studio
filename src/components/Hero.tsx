"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Send, Github, Linkedin, Mail, Code } from 'lucide-react';
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/LeonelAwouma', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/leonelawouma', icon: Linkedin },
  { name: 'Email', href: 'mailto:leonelawouma65@gmail.com', icon: Mail },
];

const profileImage = placeholderImages.find(p => p.id === 'profile');

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    } 
  },
};

export default function Hero() {
  const t = useTranslations('Hero');
  return (
    <section id="home" className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-mesh cyber-grid">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/0.05),transparent)]"></div>
      <div className="container relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <div className="text-center md:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl glass-card border-primary/20 mb-8 group hover:border-primary/50 transition-all duration-500 shadow-2xl shadow-primary/20 bg-background/40">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <p className="text-base md:text-lg font-black tracking-[0.25em] uppercase animated-gradient-text drop-shadow-sm">
                {t('role')}
              </p>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-headline font-extrabold mb-8 leading-tight tracking-tighter">
              Leonel <br /><span className="animated-gradient-text">AWOUMA</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 mb-12 leading-relaxed">
              {t('description')}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start mb-12">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg glow-shadow cyber-glow-primary hover:scale-105 transition-transform">
                <a href="/CV_LEONEL_AWOUMA.pdf" download>
                  <Download className="mr-3 h-5 w-5" />
                  {t('downloadCV')}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-all">
                <Link href="#contact">
                  <Send className="mr-3 h-5 w-5" />
                  {t('contactMe')}
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-center md:justify-start gap-8">
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
            </motion.div>
          </div>
          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            {profileImage && (
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 group">
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-indigo-500 to-accent opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700"></div>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center animate-bounce duration-[3000ms] shadow-2xl">
                   <Code className="h-10 w-10 text-primary" />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
