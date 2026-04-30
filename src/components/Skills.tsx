"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, ShieldCheck, Bot, Code2, Server, Laptop, Database } from "lucide-react";
import { useTranslations } from "next-intl";

const icons: { [key: string]: React.ReactNode } = {
  Networking: <Network className="w-8 h-8 text-primary" />,
  Cybersecurity: <ShieldCheck className="w-8 h-8 text-primary" />,
  Bot: <Bot className="w-8 h-8 text-primary" />,
  Automation: <Bot className="w-8 h-8 text-primary" />,
  Programming: <Code2 className="w-8 h-8 text-primary" />,
  Virtualization: <Server className="w-8 h-8 text-primary" />,
  OS: <Laptop className="w-8 h-8 text-primary" />,
  Database: <Database className="w-8 h-8 text-primary" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 text-primary" />,
};

export default function Skills() {
  const t = useTranslations('Skills');
  const skillCategories = t.raw('categories') as { title: string; icon: string; skills: string[] }[];

  return (
    <section id="skills" className="relative">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 animated-gradient-text">{t('title')}</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.isArray(skillCategories) && skillCategories.map((category, index) => (
            <Card key={index} className="flex flex-col group glass-card border-white/5 transition-all duration-500 hover:-translate-y-2">
              <CardHeader className="flex flex-row items-center gap-5 pb-6">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                  {icons[category.icon]}
                </div>
                <CardTitle className="font-headline text-2xl text-foreground group-hover:text-primary transition-colors">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-3">
                  {Array.isArray(category.skills) && category.skills.map((skill, skillIndex) => (
                     <li key={skillIndex} className="text-sm font-medium text-muted-foreground bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all cursor-default">
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
