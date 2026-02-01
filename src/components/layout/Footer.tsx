"use client";

import Link from "next/link";
import SocialIcon from "@/components/ui/SocialIcon";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-neutral-950 text-white py-16 border-t border-white/10 theme-transition light:bg-neutral-100 light:text-black light:border-black/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="text-3xl font-bold tracking-tighter">
                            TEME<span className="text-neutral-500">.UPH</span>
                        </Link>
                        <p className="text-sm text-neutral-400 max-w-xs" lang={language}>
                            {t("footer.tagline")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4" lang={language}>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                            {language === "en" ? "Quick Links" : "ፈጣን ማገናኛዎች"}
                        </h4>
                        <nav className="flex flex-col space-y-2">
                            <Link href="/#story" className="text-neutral-400 hover:text-white transition-colors text-sm light:hover:text-black">
                                {t("nav.story")}
                            </Link>
                            <Link href="/#services" className="text-neutral-400 hover:text-white transition-colors text-sm light:hover:text-black">
                                {t("nav.services")}
                            </Link>
                            <Link href="/#gallery" className="text-neutral-400 hover:text-white transition-colors text-sm light:hover:text-black">
                                {t("nav.gallery")}
                            </Link>
                            <Link href="/#contact" className="text-neutral-400 hover:text-white transition-colors text-sm light:hover:text-black">
                                {t("nav.contact")}
                            </Link>
                        </nav>
                    </div>

                    {/* Social & Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                            {language === "en" ? "Connect With Us" : "ያግኙን"}
                        </h4>
                        <div className="flex gap-3">
                            <SocialIcon platform="whatsapp" href="https://wa.me/251900000000" />
                            <SocialIcon platform="telegram" href="https://t.me/temeupholstery" />
                            <SocialIcon platform="instagram" href="https://instagram.com/temeupholstery" />
                            <SocialIcon platform="linkedin" href="https://linkedin.com/company/temeupholstery" />
                        </div>
                        <p className="text-sm text-neutral-500 mt-6">
                            Addis Ababa, Ethiopia
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 light:border-black/10">
                    <p className="text-sm text-neutral-500" lang={language}>
                        © {new Date().getFullYear()} TEME Upholstery. {t("footer.rights")}
                    </p>
                    <p className="text-xs text-neutral-600">
                        Crafted with ❤️ in Ethiopia
                    </p>
                </div>
            </div>
        </footer>
    );
}
