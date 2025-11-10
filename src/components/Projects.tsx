import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Projects() {
  const t = useTranslations('Projects');
  const projects = [
    {
      slug: "trust-ai",
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
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-16 animated-gradient-text">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const ProjectCard = (
              <Card key={index} className="flex flex-col overflow-hidden group border-border/20 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                {project.image && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      data-ai-hint={project.image.imageHint}
                      fill
                      style={{objectFit: 'cover'}}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex-wrap">
                  <div className="flex flex-wrap gap-2 w-full">
                    {(project.tags as string[]).map((tag: string, tagIndex: number) => (
                      <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            );

            if (project.slug) {
              return (
                <Link href={`/projects/${project.slug}`} key={index}>
                  {ProjectCard}
                </Link>
              );
            }
            return ProjectCard;
          })}
        </div>
      </div>
    </section>
  );
}
