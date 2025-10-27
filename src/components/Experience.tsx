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
import { generateExperienceInsights } from "@/ai/flows/generate-experience-insights";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Briefcase, Calendar } from "lucide-react";

const experienceItems = [
  {
    title: "CNPS Cameroon",
    date: "Jul–Sep 2025",
    description: "Improved network monitoring using AI. Developed a WhatsApp chatbot for Zabbix analytics and implemented proactive incident detection via machine learning."
  },
  {
    title: "AFEC Cameroon",
    date: "Jul–Sep 2024",
    description: "Installed and configured switches and routers, created AAA/802.1X authentication system, and documented network architecture."
  }
];

type InsightState = {
  loading: boolean;
  data: string | null;
  isOpen: boolean;
};

export default function Experience() {
  const [insight, setInsight] = useState<InsightState>({ loading: false, data: null, isOpen: false });
  const { toast } = useToast();

  const handleGenerateInsight = async (workExperience: string) => {
    setInsight({ loading: true, data: null, isOpen: true });
    try {
      const result = await generateExperienceInsights({ workExperience });
      setInsight({ loading: false, data: result.summaryInsights, isOpen: true });
    } catch (error) {
      console.error("Failed to generate insights:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate AI insights. Please try again later.",
      });
      setInsight({ loading: false, data: null, isOpen: false });
    }
  };

  return (
    <section id="experience" className="bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-headline font-bold text-center mb-12 text-primary">Experience</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          {experienceItems.map((item, index) => (
            <div key={index} className={`relative mb-12 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="p-6 bg-card rounded-lg shadow-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-accent" />
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <p>{item.date}</p>
                  </div>
                  <p className="text-foreground/90 mb-4">{item.description}</p>
                  <Button variant="outline" size="sm" onClick={() => handleGenerateInsight(item.description)}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Insights
                  </Button>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-secondary"></div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={insight.isOpen} onOpenChange={(isOpen) => setInsight(prev => ({ ...prev, isOpen }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" />
              AI-Powered Insights
            </DialogTitle>
            <DialogDescription>
              Summary of strengths and potential future applications based on the experience.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {insight.loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <p>Generating insights...</p>
              </div>
            ) : (
              <p className="text-foreground/90 whitespace-pre-wrap">{insight.data}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
