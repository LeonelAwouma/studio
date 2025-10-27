import { Github, Linkedin, Home } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';

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
  return (
    <section id="contact" className="bg-secondary">
      <div className="container">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline font-bold text-primary">Contact Me</CardTitle>
            <CardDescription>Have a question or want to work together? Send me a message.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <ContactForm />
              <div className="space-y-6">
                <h3 className="text-xl font-bold font-headline">Find me on social media</h3>
                <div className="space-y-4">
                  {socials.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-secondary group"
                    >
                      <span className="text-accent group-hover:text-primary transition-colors">{social.icon}</span>
                      <span className="text-foreground group-hover:text-primary transition-colors">{social.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
