import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Presentation, Award } from "lucide-react";

const activities = [
  {
    text: "Trainer – IAI Network Club (2024–2025)",
    icon: <Presentation className="w-6 h-6 text-primary" />
  },
  {
    text: "Participant – SNK AI Challenge 2025 (trained 100 youth in AI)",
    icon: <Award className="w-6 h-6 text-primary" />
  },
  {
    text: "Contributor – AI Workshop, Spanish Embassy in Cameroon (2024)",
    icon: <Users className="w-6 h-6 text-primary" />
  }
];

export default function Community() {
  return (
    <section id="community">
      <div className="container">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-3xl font-headline font-bold text-center text-primary">Community & Volunteering</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6 max-w-2xl mx-auto">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-secondary">
                  <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                  <span className="text-lg text-foreground/90">{activity.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
