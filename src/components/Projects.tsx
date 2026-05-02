"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    } 
  },
};

export default function Projects() {
  const t = useTranslations('Projects');
  const projects = [
    {
      slug: "traffic-analysis",
      title: t('items.0.title'),
      description: t('items.0.description'),
      tags: t.raw('items.0.tags'),
      image: placeholderImages.find(p => p.id === 'project-1')
    },
    {
      slug: "network-chatbot",
      title: t('items.1.title'),
      description: t('items.1.description'),
      tags: t.raw('items.1.tags'),
      image: placeholderImages.find(p => p.id === 'project-2')
    },
    {
      slug: "secure-access-control",
      title: t('items.2.title'),
      description: t('items.2.description'),
      tags: t.raw('items.2.tags'),
      image: placeholderImages.find(p => p.id === 'project-3')
    },
    {
      slug: "exchange-deployment",
      title: t('items.3.title'),
      description: t('items.3.description'),
      tags: t.raw('items.3.tags'),
      image: placeholderImages.find(p => p.id === 'project-4')
    },
    {
      slug: "trust-ai",
      title: t('items.4.title'),
      description: t('items.4.description'),
      tags: t.raw('items.4.tags'),
      image: placeholderImages.find(p => p.id === 'project-5')
    },
    {
      slug: "matrix-connect",
      title: t('items.5.title'),
      description: t('items.5.description'),
      tags: t.raw('items.5.tags'),
      image: placeholderImages.find(p => p.id === 'project-6')
    },
    {
      slug: "glpi-deployment",
      title: t('items.6.title'),
      description: t('items.6.description'),
      tags: t.raw('items.6.tags'),
      image: placeholderImages.find(p => p.id === 'project-7')
    },
    {
      slug: "busnesco-bi",
      title: t('items.7.title'),
      description: t('items.7.description'),
      tags: t.raw('items.7.tags'),
      image: placeholderImages.find(p => p.id === 'project-8')
    }
  ];

  return (
    <section id="projects" className="relative py-24 sm:py-32 cyber-grid">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-6 animated-gradient-text tracking-tighter">{t('title')}</h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full cyber-glow-primary"></div>
        </motion.div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, index) => {
            const ProjectCard = (
              <motion.div variants={cardVariants} className="h-full">
                <Card key={index} className="flex flex-col h-full overflow-hidden group glass-card border-white/5 transition-all duration-500 hover:-translate-y-3 hover:border-primary/50 hover:shadow-primary/20">
                  {project.image && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={project.image.imageUrl}
                        alt={project.image.description}
                        data-ai-hint={project.image.imageHint}
                        fill
                        style={{objectFit: 'cover'}}
                        className="transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Badge className="bg-primary text-primary-foreground cyber-glow-primary">View Case Study</Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pb-6">
                    <CardDescription className="text-base leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 pb-8 flex-wrap">
                    <div className="flex flex-wrap gap-2 w-full">
                      {Array.isArray(project.tags) && project.tags.map((tag: string, tagIndex: number) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            );

            if (project.slug) {
              return (
                <Link href={`/projects/${project.slug}`} key={index} className="h-full">
                  {ProjectCard}
                </Link>
              );
            }
            return ProjectCard;
          })}
        </motion.div>
      </div>
    </section>
  );
}
