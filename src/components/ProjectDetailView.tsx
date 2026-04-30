"use client";

import { useRouter } from "@/navigation";
import { ReactNode } from "react";

interface ProjectDetailViewProps {
  children: ReactNode;
}

export default function ProjectDetailView({ children }: ProjectDetailViewProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/projects");
  };

  return (
    <div 
      className="flex-grow w-full cursor-pointer bg-background/50" 
      onClick={handleBack}
    >
      <div className="container py-16 sm:py-24">
        <div 
          className="max-w-4xl mx-auto cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
