"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current?.contains(target)) {
        return;
      }
      if (mobileMenuButtonRef.current?.contains(target)) {
        return;
      }
      setMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { key: "nav.home", href: "/home" },
    { key: "nav.story", href: "/about" },
    { key: "nav.services", href: "/services" },
    { key: "nav.gallery", href: "/#gallery" },
    { key: "nav.contact", href: "/#contact" },
  ];

  const handleBookClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/#contact";
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12",
        scrolled
          ? isDark
            ? "bg-black py-3"
            : "bg-white py-3"
          : "bg-transparent py-4",
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className={`text-2xl font-bold tracking-tighter ${isDark ? "text-white" : "text-black"}`}
        >
          <span className="block leading-none">TEME</span>
          <span
            className={`block leading-none ${isDark ? "text-neutral-300" : "text-neutral-500"}`}
          >
            UPHOLSTERY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" lang={language}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-medium transition-colors ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"}`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="primary"
            className="px-6 py-2 text-xs"
            onClick={handleBookClick}
          >
            {t("cta.book")}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 ${isDark ? "text-white" : "text-black"}`}
          aria-label="Toggle menu"
          ref={mobileMenuButtonRef}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t mt-4 ${isDark ? "bg-black/95 border-white/10" : "bg-white border-black/10"}`}
            ref={mobileMenuRef}
          >
            <nav className="flex flex-col py-6 px-4 space-y-4" lang={language}>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors py-2 ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div
                className={`flex items-center gap-4 pt-4 border-t ${isDark ? "border-white/10" : "border-black/10"}`}
              >
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <Button
                variant="primary"
                className="w-full mt-4"
                onClick={handleBookClick}
              >
                {t("cta.book")}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
