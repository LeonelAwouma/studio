import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Presentation, Award } from "lucide-react";
import { useTranslations } from "next-intl";

const icons: { [key: string]: React.ReactNode } = {
  Presentation: <Presentation className="w-6 h-6 text-primary" />,
  Award: <Award className="w-6 h-6 text-primary" />,
  Users: <Users className="w-6 h-6 text-primary" />,
};

export default function Community() {
  const t = useTranslations('Community');
  const activities = t.raw('activities') as { text: string; icon: string }[];

  return (
    <section id="community">
      <div className="container">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-3xl font-headline font-bold text-center text-primary">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6 max-w-2xl mx-auto">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-secondary">
                  <div className="flex-shrink-0 mt-1">{icons[activity.icon]}</div>
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
