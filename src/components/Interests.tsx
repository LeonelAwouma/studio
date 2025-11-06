import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function Interests() {
  const t = useTranslations('Interests');
  const interests = t.raw('list') as string[];

  return (
    <section id="interests">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12 text-primary">{t('title')}</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 max-w-3xl mx-auto">
          {interests.map((interest, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="text-lg py-2 px-4 border-primary/50 text-primary/90 transition-all duration-300 hover:bg-primary/10 hover:scale-110 cursor-default"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
