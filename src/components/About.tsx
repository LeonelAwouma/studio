import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient -z-10"></div>
      <div className="container">
        <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
          <CardContent className="p-8 sm:p-10">
            <h2 className="text-3xl font-headline font-bold text-center mb-6 text-primary">About Me</h2>
            <p className="text-lg md:text-xl text-center text-foreground/90 leading-relaxed">
              As a dedicated System and Network Administrator, I focus on reliability, performance, and cybersecurity awareness. I value responsiveness and precision in minimizing downtime and ensuring business continuity.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
