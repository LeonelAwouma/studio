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
    <section id="home" className="relative overflow-hidden py-24 sm:py-32 md:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_100%_at_50%_0%,hsl(var(--primary)/0.1),transparent)]"></div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="font-bold uppercase tracking-wider text-primary">{t('role')}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mt-4 mb-6 leading-tight">
              Leonel <span className="animated-gradient-text">AWOUMA</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 mb-10">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
              <Button asChild size="lg">
                <a href="/CV_LEONEL_AWOUMA.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  {t('downloadCV')}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#contact">
                  <Send className="mr-2 h-5 w-5" />
                  {t('contactMe')}
                </Link>
              </Button>
            </div>
            <div className="flex justify-center md:justify-start gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-7 w-7" />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            {profileImage && (
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 group">
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent opacity-60 blur-2xl group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-primary/20 glow-shadow">
                  <Image
                    src={profileImage.imageUrl}
                    alt={profileImage.description}
                    data-ai-hint={profileImage.imageHint}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
