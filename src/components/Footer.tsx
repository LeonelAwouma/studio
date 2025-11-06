import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/LeonelAwouma', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/leonelawouma', icon: Linkedin },
  { name: 'Email', href: 'mailto:leonelawouma65@gmail.com', icon: Mail },
];

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border/50">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Leonel AWOUMA. {t('rights')}
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-transform hover:-translate-y-1"
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
