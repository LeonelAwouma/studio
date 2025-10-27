import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, FileText } from "lucide-react";

const educationItems = [
  {
    title: "Bachelor’s Degree in Computer Science – Systems & Networks",
    institution: "IAI Cameroon, 2022–2025",
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
  },
  {
    title: "Scientific Baccalaureate – Series D",
    institution: "2019",
    icon: <FileText className="w-8 h-8 text-primary" />,
  },
];

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12 text-primary">Education</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {educationItems.map((item, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 flex items-start gap-6">
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.institution}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
