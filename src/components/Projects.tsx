import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Network Chatbot",
    description: "Integrates Zabbix with WhatsApp for real-time monitoring and incident response.",
    tags: ["AI", "Automation", "Network Monitoring"],
    image: placeholderImages.find(p => p.id === 'project-1')
  },
  {
    title: "Secure Network Access Control",
    description: "AAA + 802.1X authentication implementation for controlled and logged network access.",
    tags: ["Security", "Access Control", "Linux Server"],
    image: placeholderImages.find(p => p.id === 'project-2')
  },
  {
    title: "Cloud Infrastructure Orchestration",
    description: "Automated deployment and management of virtualized environments using cloud-native tools.",
    tags: ["Cloud", "IaC", "Proxmox"],
    image: placeholderImages.find(p => p.id === 'project-3')
  }
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-16 animated-gradient-text">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
