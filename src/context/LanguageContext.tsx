"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "am";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Header
        "nav.story": "Story",
        "nav.services": "Services",
        "nav.gallery": "Gallery",
        "nav.contact": "Contact",
        "cta.book": "Book a Service",

        // Hero
        "hero.title1": "CRAFTING",
        "hero.title2": "PERFECTION",
        "hero.subtitle": "Bespoke upholstery for exclusive interiors. From luxury cars to custom furniture, we redefine craftsmanship.",
        "hero.cta1": "Our Services",
        "hero.cta2": "Our Story",

        // Story
        "story.label": "Our Legacy",
        "story.headline1": "We don't just cover seats.",
        "story.headline2": "We craft experiences.",
        "story.description": "For years, we have been the trusted partner for discerning clients in Ethiopia and beyond. Our artisans blend traditional Ethiopian craftsmanship with modern techniques to create interiors that inspire.",
        "story.stat1.value": "10+",
        "story.stat1.label": "Years of Excellence",
        "story.stat2.value": "500+",
        "story.stat2.label": "Custom Projects",
        "story.stat3.value": "100%",
        "story.stat3.label": "Client Satisfaction",

        // Services
        "services.title1": "OUR",
        "services.title2": "EXPERTISE",
        "services.subtitle": "Tailored solutions for every environment where comfort meets luxury.",
        "services.automotive.title": "Automotive",
        "services.automotive.desc": "Bespoke interiors for luxury cars, SUVs, and classic vehicles.",
        "services.architectural.title": "Architectural",
        "services.architectural.desc": "Statement pieces for cinemas, assembly halls, and lounges.",
        "services.aviation.title": "Aviation",
        "services.aviation.desc": "Premium upholstery for private aircraft interiors.",
        "services.marine.title": "Marine",
        "services.marine.desc": "Weather-resistant luxury for boats and yachts.",
        "services.comingSoon": "Coming Soon",
        "services.availableOnRequest": "Available Upon Request",

        // Gallery
        "gallery.title1": "OUR",
        "gallery.title2": "DESIGNS",
        "gallery.subtitle": "A showcase of our finest completed projects.",
        "gallery.viewProject": "View Project",

        // Contact
        "contact.title1": "START YOUR",
        "contact.title2": "JOURNEY",
        "contact.subtitle": "Ready to transform your interior? Get in touch with our design team.",
        "contact.name": "Name",
        "contact.name.placeholder": "Your Name",
        "contact.phone": "Phone",
        "contact.phone.placeholder": "+251 9XX XXX XXX",
        "contact.email": "Email",
        "contact.email.placeholder": "your@email.com",
        "contact.interest": "Interested In",
        "contact.interest.automotive": "Automotive Upholstery",
        "contact.interest.architectural": "Architectural Projects",
        "contact.interest.aviation": "Aviation Interiors",
        "contact.interest.marine": "Marine Upholstery",
        "contact.message": "Message",
        "contact.message.placeholder": "Tell us about your project...",
        "contact.submit": "Send via WhatsApp",

        // Footer
        "footer.rights": "All rights reserved.",
        "footer.tagline": "Premium Upholstery & Leather Design",
    },
    am: {
        // Header
        "nav.story": "ታሪካችን",
        "nav.services": "አገልግሎቶች",
        "nav.gallery": "ስራዎች",
        "nav.contact": "አግኙን",
        "cta.book": "አገልግሎት ያዝዙ",

        // Hero
        "hero.title1": "ፍጹምነትን",
        "hero.title2": "እንፈጥራለን",
        "hero.subtitle": "ለልዩ የውስጥ ክፍሎች ብጁ የቆዳ ስራ። ከቅንጦት መኪናዎች እስከ ብጁ ወንበሮች፣ የእጅ ጥበብን እንደገና እንቀርፃለን።",
        "hero.cta1": "አገልግሎቶቻችን",
        "hero.cta2": "ታሪካችን",

        // Story
        "story.label": "ቅርስልች ን",
        "story.headline1": "ወንበሮችን ብቻ አንሸፍንም።",
        "story.headline2": "ልምዶችን እንፈጥራለን።",
        "story.description": "ለዓመታት በኢትዮጵያ እና ከዚያ ባሻገር ለሚገኙ ደንበኞች የታመንነው አጋራቸው ሆነናል። የእኛ የእጅ ባለሙያዎች ባህላዊ የኢትዮጵያ የእጅ ጥበብን ከዘመናዊ ቴክኒኮች ጋር በማዋሃድ አነቃቂ የውስጥ ክፍሎችን ይፈጥራሉ።",
        "story.stat1.value": "10+",
        "story.stat1.label": "የልህቀት ዓመታት",
        "story.stat2.value": "500+",
        "story.stat2.label": "ብጁ ፕሮጀክቶች",
        "story.stat3.value": "100%",
        "story.stat3.label": "የደንበኛ እርካታ",

        // Services
        "services.title1": "የእኛ",
        "services.title2": "ልምድ",
        "services.subtitle": "ምቾት ከቅንጦት የሚገናኝበት ለሁሉም አካባቢ የተዘጋጁ መፍትሄዎች።",
        "services.automotive.title": "የመኪና ውስጥ",
        "services.automotive.desc": "ለቅንጦት መኪናዎች፣ ኤስዩቪዎች እና ክላሲክ ተሽከርካሪዎች ብጁ የውስጥ ክፍል።",
        "services.architectural.title": "ሲኒማ እና አዳራሽ",
        "services.architectural.desc": "ለሲኒማዎች፣ ለስብሰባ አዳራሾች እና ለመዝናኛ ቦታዎች ልዩ ስራዎች።",
        "services.aviation.title": "አቪዬሽን",
        "services.aviation.desc": "ለግል አውሮፕላኖች ውስጠኛ ክፍል ፕሪሚየም ሽፋን።",
        "services.marine.title": "ባህር ላይ",
        "services.marine.desc": "ለጀልባዎች እና ያቾች የአየር ሁኔታ-መቋቋም ቅንጦት።",
        "services.comingSoon": "በቅርቡ",
        "services.availableOnRequest": "በጥያቄ ይገኛል",

        // Gallery
        "gallery.title1": "የእኛ",
        "gallery.title2": "ዲዛይኖች",
        "gallery.subtitle": "የተጠናቀቁ ምርጥ ፕሮጀክቶቻችን ማሳያ።",
        "gallery.viewProject": "ፕሮጀክቱን ይመልከቱ",

        // Contact
        "contact.title1": "ጉዞዎን",
        "contact.title2": "ይጀምሩ",
        "contact.subtitle": "የውስጥ ክፍልዎን ለመቀየር ዝግጁ ነዎት? ከዲዛይን ቡድናችን ጋር ይገናኙ።",
        "contact.name": "ስም",
        "contact.name.placeholder": "ስምዎ",
        "contact.phone": "ስልክ",
        "contact.phone.placeholder": "+251 9XX XXX XXX",
        "contact.email": "ኢሜይል",
        "contact.email.placeholder": "your@email.com",
        "contact.interest": "ፍላጎት ያለዎት",
        "contact.interest.automotive": "የመኪና ሽፋን",
        "contact.interest.architectural": "የሲኒማ/አዳራሽ ፕሮጀክቶች",
        "contact.interest.aviation": "የአቪዬሽን ውስጠኛ ክፍል",
        "contact.interest.marine": "የባህር ላይ ሽፋን",
        "contact.message": "መልዕክት",
        "contact.message.placeholder": "ስለ ፕሮጀክትዎ ይንገሩን...",
        "contact.submit": "በዋትስአፕ ይላኩ",

        // Footer
        "footer.rights": "መብቱ በህግ የተጠበቀ ነው።",
        "footer.tagline": "ፕሪሚየም የቆዳ ዲዛይን እና ሽፋን",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("teme-language") as Language;
        if (saved && (saved === "en" || saved === "am")) {
            setLanguage(saved);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("teme-language", language);
        }
    }, [language, mounted]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "am" : "en"));
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
