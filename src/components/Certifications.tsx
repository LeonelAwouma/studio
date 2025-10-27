import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

const certifications = [
  "CCNP Enterprise (Cisco)",
  "HCIA-Datacom (Huawei)",
  "Cybersecurity Analyst (Cisco)",
  "Ethical Hacking (Cisco)",
  "Kubernetes Fundamentals (Datascientist)",
  "Scrum Fundamentals Certified (SCRUMStudy)",
  "AI Fundamentals (SNK Foundation)",
  "Network Defense (Cisco)",
  "ISO 27001 / 27005 Risk Analysis"
];

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12 text-primary">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50 transform transition-transform duration-300 hover:scale-105 hover:bg-secondary">
              <CardContent className="p-6 flex items-center gap-4">
                <BadgeCheck className="w-8 h-8 text-primary" />
                <p className="font-medium text-foreground">{cert}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
