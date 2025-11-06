import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Certifications() {
  const t = useTranslations('Certifications');
  const certifications = t.raw('list') as string[];

  return (
    <section id="certifications">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12 text-primary">{t('title')}</h2>
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
