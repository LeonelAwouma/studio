import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

const icons: { [key: string]: React.ReactNode } = {
  GraduationCap: <GraduationCap className="w-8 h-8 text-primary" />,
  FileText: <FileText className="w-8 h-8 text-primary" />,
};

export default function Education() {
  const t = useTranslations('Education');
  const educationItems = t.raw('items') as { title: string; institution: string; icon: string }[];

  return (
    <section id="education">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12 text-primary">{t('title')}</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {educationItems.map((item, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 flex items-start gap-6">
                <div className="flex-shrink-0 mt-1">{icons[item.icon]}</div>
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
