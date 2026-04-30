"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Briefcase, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

type InsightState = {
  loading: boolean;
  data: string | null;
  isOpen: boolean;
};

export default function Experience() {
  const t = useTranslations('Experience');
  const experienceItems = t.raw('items') as { title: string; date: string; description: string }[];
  
  const [insight, setInsight] = useState<InsightState>({ loading: false, data: null, isOpen: false });
  const { toast } = useToast();

  const handleGenerateInsight = async (workExperience: string) => {
    setInsight({ loading: true, data: null, isOpen: true });
    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workExperience })
      });
      const result = await response.json();
      setInsight({ loading: false, data: result.summaryInsights, isOpen: true });
    } catch (error) {
      console.error("Failed to generate insights:", error);
      toast({
        variant: "destructive",
        title: t('insights.error.title'),
        description: t('insights.error.description'),
      });
      setInsight({ loading: false, data: null, isOpen: false });
    }
  };

  return (
    <section id="experience" className="relative bg-background">
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 animated-gradient-text">{t('title')}</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 -translate-x-1/2"></div>
          {Array.isArray(experienceItems) && experienceItems.map((item, index) => (
            <div key={index} className={`relative mb-20 flex flex-col md:flex-row items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="hidden md:block w-1/2"></div>
              <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pl-12' : 'md:pr-12'} pl-12 md:pl-0`}>
                <div className="p-8 glass-card rounded-2xl group relative">
                  <div className="absolute -left-[3.25rem] md:left-auto md:group-odd:-right-[3.25rem] md:group-even:-left-[3.25rem] top-8 w-10 h-10 rounded-full glass border-primary/30 flex items-center justify-center z-20 bg-background">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                      <Calendar className="w-4 h-4" />
                      <p>{item.date}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                  <Button variant="ghost" size="sm" onClick={() => handleGenerateInsight(item.description)} className="group/btn h-10 px-4 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary transition-all">
                    <Sparkles className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                    {t('generateInsights')}
                  </Button>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 top-11"></div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={insight.isOpen} onOpenChange={(isOpen) => setInsight(prev => ({ ...prev, isOpen }))}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl animated-gradient-text">
              <Sparkles className="w-6 h-6 text-primary" />
              {t('insights.title')}
            </DialogTitle>
            <DialogDescription>
              {t('insights.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 min-h-[200px] flex items-center justify-center">
            {insight.loading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">{t('insights.loading')}</p>
              </div>
            ) : (
              <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{insight.data}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
