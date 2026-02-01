"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t, language } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { key: "nav.story", href: "/#story" },
        { key: "nav.services", href: "/#services" },
        { key: "nav.gallery", href: "/#gallery" },
        { key: "nav.contact", href: "/#contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 md:px-12 theme-transition",
                scrolled ? "bg-black/50 backdrop-blur-md py-3 light:bg-white/50" : "bg-transparent"
            )}
        >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white light:text-black">
                    TEME<span className="text-neutral-400 light:text-neutral-500">.UPH</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8" lang={language}>
                    {navItems.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors light:text-neutral-600 light:hover:text-black"
                        >
                            {t(item.key)}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Controls */}
                <div className="hidden md:flex items-center gap-3">
                    <LanguageToggle />
                    <ThemeToggle />
                    <Button variant="primary" className="px-6 py-2 text-xs">
                        {t("cta.book")}
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-white"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10 mt-4"
                    >
                        <nav className="flex flex-col py-6 px-4 space-y-4" lang={language}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-medium text-neutral-300 hover:text-white transition-colors py-2"
                                >
                                    {t(item.key)}
                                </Link>
                            ))}
                            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                <LanguageToggle />
                                <ThemeToggle />
                            </div>
                            <Button variant="primary" className="w-full mt-4">
                                {t("cta.book")}
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
