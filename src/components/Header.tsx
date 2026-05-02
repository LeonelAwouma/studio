"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Code } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
  const t = useTranslations('Header');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { href: "/#about", label: t('nav.about') },
    { href: "/#skills", label: t('nav.skills') },
    { href: "/#experience", label: t('nav.experience') },
    { href: "/projects", label: t('nav.projects') },
    { href: "/design", label: t('nav.design') },
    { href: "/#contact", label: t('nav.contact') },
  ];

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full glass border-b border-white/5 transition-all duration-300"
    >
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-10 flex items-center space-x-3 group">
          <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors cyber-glow-primary">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <span className="font-extrabold font-headline text-xl tracking-tight">Leonel <span className="text-primary">A.</span></span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-10 text-sm font-semibold tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 transition-all hover:text-primary relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-6">
          <LocaleSwitcher />
          <Button asChild className="hidden md:flex rounded-full px-6 glow-shadow cyber-glow-primary hover:scale-105 transition-transform">
            <a href="/CV_LEONEL_AWOUMA.pdf" download>{t('downloadCV')}</a>
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-xl hover:bg-primary/10 transition-colors">
                <Menu className="h-7 w-7" />
                <span className="sr-only">{t('toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass border-white/10 w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-8 text-xl font-bold mt-12 px-4">
                <Link
                  href="/"
                  className="flex items-center space-x-3 mb-8"
                  onClick={handleLinkClick}
                >
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <span className="font-extrabold font-headline text-2xl tracking-tight">Leonel <span className="text-primary">A.</span></span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/70 transition-all hover:text-primary hover:translate-x-2"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button asChild className="mt-10 rounded-full h-14 text-lg cyber-glow-primary">
                  <a href="/CV_LEONEL_AWOUMA.pdf" download>{t('downloadCV')}</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
