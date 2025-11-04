import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="bg-secondary">
      <div className="container">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 sm:p-12">
            <h2 className="text-3xl font-headline font-bold text-center mb-6 animated-gradient-text">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-center text-foreground/80 leading-relaxed">
              As a dedicated System and Network Administrator, I focus on reliability, performance, and cybersecurity awareness. I value responsiveness and precision in minimizing downtime and ensuring business continuity.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
