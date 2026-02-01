"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="relative flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm"
            aria-label={language === "en" ? "Switch to Amharic" : "Switch to English"}
        >
            <span
                className={`transition-opacity duration-200 ${language === "en" ? "opacity-100" : "opacity-50"
                    }`}
            >
                EN
            </span>
            <span className="text-white/30">/</span>
            <span
                className={`transition-opacity duration-200 ${language === "am" ? "opacity-100" : "opacity-50"
                    }`}
            >
                አማ
            </span>
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/0"
                whileHover={{ borderColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
            />
        </button>
    );
}
