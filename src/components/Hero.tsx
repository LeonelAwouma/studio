import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Send, Github, Linkedin, Mail } from 'lucide-react';
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/LeonelAwouma', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/leonelawouma', icon: Linkedin },
  { name: 'Email', href: 'mailto:leonelawouma65@gmail.com', icon: Mail },
];

const profileImage = placeholderImages.find(p => p.id === 'profile');

export default function Hero() {
  return (
    <section id="home" className="py-24 sm:py-32 md:py-40">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="text-primary font-semibold">System & Network Administrator</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-extrabold mt-2 mb-4 leading-tight">
              Leonel AWOUMA
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 mb-8">
              I design, secure, and optimize IT systems with a focus on performance, reliability, and user empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Button asChild size="lg">
                <a href="/CV_LEONEL_AWOUMA.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#contact">
                  <Send className="mr-2 h-5 w-5" />
                  Contact Me
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
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary/50">
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  data-ai-hint={profileImage.imageHint}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
