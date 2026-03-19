"use client";

import { createContext, useContext, useState, useLayoutEffect, useTransition, ReactNode } from "react";

type Language = "en" | "am";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        // Header
        "nav.story": "Story",
        "nav.services": "Services",
        "nav.gallery": "Gallery",
        "nav.training": "Training",
        "nav.contact": "Contact",
        "cta.book": "Book a Service",

        // Hero
        "hero.title1": "Relentless",
        "hero.title2": "Improvement",
        "hero.subtitle": "Bespoke upholstery for exclusive interiors. From luxury cars to custom furniture, we redefine craftsmanship.",
        "hero.cta1": "Our Services",
        "hero.cta2": "Our Story",

        // Story
        "story.label": "Our Legacy",
        "story.headline1": "We don't just cover seats.",
        "story.headline2": "We craft experiences.",
        "story.description": "For over a decade, Teme Upholstery has been the trusted partner for discerning clients across Ethiopia and beyond. Our master artisans blend traditional Ethiopian craftsmanship with cutting-edge techniques to create interiors that inspire, protect, and endure. Our mission is simple: transform ordinary vehicles into extraordinary experiences through meticulous attention to detail and uncompromising quality.",
        "story.impact.title": "Giving Back to Our Community",
        "story.impact.badge": "Monthly Program",
        "story.impact.description": "We believe in using our skills to make a difference. Every month, Teme Upholstery selects one deserving vehicle owner and provides complete upholstery services absolutely free — our way of giving back to the community that has supported us throughout our journey.",
        "story.trust.title": "Trusted By Industry Leaders",
        "story.trust.subtitle": "From government institutions to celebrated artists, our work speaks for itself. These distinguished clients chose Teme for the same reasons you should: exceptional craftsmanship, reliability, and an unwavering commitment to perfection.",
        "story.trust.organizations": "Organizations",
        "story.trust.publicFigures": "Public figures",
        "story.trust.logosTitle": "Partner Organizations",
        "story.trust.photosTitle": "Notable Clients",
        "story.trust.addLogo": "Logo",
        "story.trust.addPhoto": "Photo",
        "story.trust.companies": "CBE, Addis Ababa Science Museum, Moenco, ET Airforce",
        "story.trust.people": "Pastor Chere, Tsedeniya GebreMarkos, Abela, Miko Tour",
        "story.stat1.value": "10+",
        "story.stat1.label": "Years of Excellence",
        "story.stat2.value": "500+",
        "story.stat2.label": "Custom Projects",
        "story.stat3.value": "100%",
        "story.stat3.label": "Client Satisfaction",

        // Services
        "services.title1": "OUR",
        "services.title2": "EXPERTISE",
        "services.subtitle": "Automotive upholstery is our core focus, supported by tailored solutions for other premium environments.",
        "services.automotive.focus": "Main Focus",
        "services.automotive.detail": "Seat restoration, dashboard wrapping, roof liner replacement, door panel finishing, steering wheel wrapping, and full interior transformation.",
        "services.automotive.title": "Automotive",
        "services.automotive.desc": "Our primary specialization: bespoke interiors for luxury cars, SUVs, and classic vehicles.",
        "services.automotive.subservices": "What We Do",
        "services.auto.seats.title": "Seat Restoration",
        "services.auto.seats.desc": "Complete seat rebuilding, foam replacement, and premium leather or fabric covering for ultimate comfort.",
        "services.auto.dashboard.title": "Dashboard Wrapping",
        "services.auto.dashboard.desc": "Custom dashboard covering with leather, Alcantara, or premium vinyl for a refined cabin look.",
        "services.auto.roofline.title": "Roof Liner",
        "services.auto.roofline.desc": "Headliner replacement and upgrades using suede, fabric, or starlight options.",
        "services.auto.doors.title": "Door Panels",
        "services.auto.doors.desc": "Door card restoration and custom panel finishing with matching materials.",
        "services.auto.steering.title": "Steering Wheel",
        "services.auto.steering.desc": "Leather wrapping and re-stitching for a premium grip and fresh appearance.",
        "services.auto.full.title": "Full Interior",
        "services.auto.full.desc": "Complete cabin transformation combining all services for a cohesive luxury experience.",
        "services.other.title": "Other Services",
        "services.architectural.title": "Furniture & Cinema",
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
        "contact.interest.seats": "Seat Upholstery",
        "contact.interest.dashboard": "Dashboard Wrapping",
        "contact.interest.roofline": "Roof Liner Repair",
        "contact.interest.doors": "Door Panel Upholstery",
        "contact.interest.steering": "Steering Wheel Wrapping",
        "contact.interest.fullInterior": "Full Interior Restoration",
        "contact.interest.architectural": "Architectural Projects",
        "contact.message": "Message",
        "contact.message.placeholder": "Tell us about your project...",
        "contact.submit": "Send via WhatsApp",

        // Training
        "training.nav": "Training",
        "training.hero.title1": "MASTER THE",
        "training.hero.title2": "CRAFT",
        "training.hero.subtitle": "Learn premium upholstery techniques from industry experts. Perfect for beginners and seasoned professionals.",
        "training.hero.cta": "Enroll Now",

        "training.about.label": "Expert Training",
        "training.about.headline": "Upholstery Education Redefined",
        "training.about.description": "Our comprehensive training programs blend traditional Ethiopian craftsmanship with modern upholstery techniques. Whether you're passionate about luxury automotive interiors, furniture design, or specialized applications, we have the perfect course for you.",

        "training.courses.title1": "OUR",
        "training.courses.title2": "COURSES",
        "training.courses.subtitle": "Structured programs designed to elevate your skills.",

        "training.course.pro": "Pro Upgrade",
        "training.course.pro.desc": "For professionals who want to upgrade their upholstery precision and finishing quality.",
        "training.course.pro.duration": "1 Month",
        "training.course.pro.level": "Advanced",

        "training.course.basic": "Basic Training",
        "training.course.basic.desc": "Build strong fundamentals in measuring, cutting, stitching, and frame preparation.",
        "training.course.basic.duration": "3 Months",
        "training.course.basic.level": "Beginner",

        "training.course.intermediate": "Intermediate Program",
        "training.course.intermediate.desc": "Improve your workflow with advanced materials, fitting techniques, and practical projects.",
        "training.course.intermediate.duration": "6 Months",
        "training.course.intermediate.level": "Intermediate",

        "training.course.zero2hero": "Zero2Hero Full Practice",
        "training.course.zero2hero.desc": "A complete end-to-end path from beginner to confident professional through full-year practice.",
        "training.course.zero2hero.duration": "1 Year",
        "training.course.zero2hero.level": "Zero2Hero",

        "training.stats.students": "500+",
        "training.stats.students.label": "Students Trained",
        "training.stats.success": "95%",
        "training.stats.success.label": "Employment Rate",
        "training.stats.projects": "1000+",
        "training.stats.projects.label": "Student Projects",

        "training.enrollment": "READY TO LEARN?",
        "training.enrollment.subtitle": "Start your upholstery journey. Limited seats available per cohort.",
        "training.enrollment.button": "Apply Now",

        "training.highlights.standard": "Industry Standard Curriculum",
        "training.highlights.standard.desc": "Learn techniques recognized across the industry",
        "training.highlights.handson": "Hands-On Experience",
        "training.highlights.handson.desc": "Work on real projects with expert mentors",
        "training.highlights.careers": "Career Support",
        "training.highlights.careers.desc": "Job placement assistance after graduation",

        "training.badge.popular": "POPULAR",

        // Footer
        "footer.improvement": "Relentless improvement",
        "footer.rights": "All rights reserved.",
        "footer.tagline": "Premium Upholstery & Leather Design",
    },
    am: {
        // Header
        "nav.story": "ታሪካችን",
        "nav.services": "አገልግሎቶች",
        "nav.gallery": "ስራዎች",
        "nav.training": "ስልጠና",
        "nav.contact": "አግኙን",
        "cta.book": "አገልግሎት ይዘዙ",

        // Hero
        "hero.title1": "የማያቋርጥ",
        "hero.title2": "መሻሻል",
        "hero.subtitle": "ለተለያዩ የውስጥ ክፍሎች የአፖልስትሪ ስራ። ከቅንጡ መኪናዎች እስከ ወንበሮች፣ የእጅ ጥበብን እንደገና እንቀርፃለን።",
        "hero.cta1": "አገልግሎቶቻችን",
        "hero.cta2": "ታሪካችን",

        // Story
        "story.label": "ታሪካችን",
        "story.headline1": "ወንበሮችን ብቻ አንሸፍንም።",
        "story.headline2": "ውበትንም እንፈጥራለን።",
        "story.description": "ከ10 ዓመታት በላይ ተሜ አፖልስትሪ በኢትዮጵያ ለደንበኞች የታመነ አጋር ሆኖ ቆይቷል። የእኛ የእጅ ባለሙያዎች ባህላዊ የኢትዮጵያ የእጅ ጥበብን ከዘመናዊ ቴክኒኮች ጋር በማዋሃድ የሚያነሳሱ፣ የሚጠብቁ እና የሚቆዩ ውስጣዊ ክፍሎችን ይፈጥራሉ። ተልዕኮአችን ቀላል ነው፡ የተሽከርካሪዎች እና የሌሎች የአፖልስትሪ ስራዎችን በጥንቃቄ እና ያለምንም እንከን በከፍተኛ ጥራት አስደናቂ ማድረግ ነው።",
        "story.impact.title": "ለማህበረሰባችን የምንሰጠው",
        "story.impact.badge": "ወርሃዊ ፕሮግራም",
        "story.impact.description": "ክህሎታችንን ልዩነት ለማምጣት መጠቀም እንደሚገባ እናምናለን። በየወሩ ተሜ አፖልስትሪ አንድ የተሽከርካሪ ባለቤት በመምረጥ ሙሉ የአፖልስትሪ አገልግሎት በነፃ ይሰጣል። ይህ በጉዞአችን ሁሉ ለደገፈን ማህበረሰብ የምንመልስበት መንገድ ነው።",
        "story.trust.title": "በኢንዱስትሪ መሪዎች የታመነ",
        "story.trust.subtitle": "ከመንግስት ተቋማት እስከ ታዋቂ አርቲስቶች፣ ስራችን ለራሱ ይናገራል።",
        "story.trust.organizations": "ተቋማት",
        "story.trust.publicFigures": "ታዋቂ ሰዎች",
        "story.trust.logosTitle": "አጋር ተቋማት",
        "story.trust.photosTitle": "ታዋቂ ደንበኞች",
        "story.trust.addLogo": "ሎጎ",
        "story.trust.addPhoto": "ፎቶ",
        "story.trust.companies": "CBE, Addis Ababa Science Museum, Moenco, ET Airforce",
        "story.trust.people": "ፓስተር ቸሬ, ጸደኒያ ገ/ማርቆስ, አቤላ, ማይኮ ቱር",
        "story.trust.note": "እነዚህ የተከበሩ ደንበኞች ተሜ አፖልስትሪን የመረጡት እርስዎም በሚመርጡበት ምክንያት ነው፡ ልዩ የእጅ ጥበብ፣ አስተማማኝነት እና ለፍጹምነት ያለን ቁርጠኝነት።",
        "story.stat1.value": "10+",
        "story.stat1.label": "የልህቀት ዓመታት",
        "story.stat2.value": "200+",
        "story.stat2.label": "ፕሮጀክቶች",
        "story.stat3.value": "100%",
        "story.stat3.label": "የደንበኛ እርካታ",

        // Services
        "services.title1": "የእኛ",
        "services.title2": "ልምድ",
        "services.subtitle": "ዋና ትኩረታችን የመኪና አፖልስትሪ ሲሆን ለሌሎች ፕሪሚየም አካባቢዎችም ተስማሚ መፍትሄ እንሰጣለን።",
        "services.automotive.focus": "ዋና ትኩረት",
        "services.automotive.detail": "የወንበር እድሳት፣ የዳሽቦርድ ሽፋን፣ የሩፍ ላይነር መቀየር፣ የበር ፓነል ማጠናቀቅ፣ የስቲሪንግ ሽፋን እና ሙሉ የውስጥ ክፍል ማሻሻያ።",
        "services.automotive.title": "የመኪና ውስጥ",
        "services.automotive.desc": "ዋና ስፔሻላይዜሽናችን፡ ለቅንጦት መኪናዎች፣ ኤስዩቪዎች እና ክላሲክ ተሽከርካሪዎች የተሟላ ውስጣዊ አፖልስትሪ።",
        "services.automotive.subservices": "የምንሰራቸው",
        "services.auto.seats.title": "የወንበር እድሳት",
        "services.auto.seats.desc": "ሙሉ የወንበር ዲዛይን እና ስራ ለከፍተኛ ምቾት በፕሪሚየም ቆዳ።",
        "services.auto.dashboard.title": "የዳሽቦርድ ሽፋን",
        "services.auto.dashboard.desc": "ለተሻሻለ ካቢን ገጽታ በቆዳ የተሰራ ዳሽቦርድ ሽፋን።",
        "services.auto.roofline.title": "ሩፍ ላይነር",
        "services.auto.roofline.desc": "በሱዌድ፣ ጨርቅ ወይም ስታርላይት አማራጮች የሄድላይነር ስራ።",
        "services.auto.doors.title": "የበር ፓነሎች",
        "services.auto.doors.desc": "በተመሳሳይ ቁሳቁሶች የበር ካርድ ማደስ።",
        "services.auto.steering.title": "መሪ",
        "services.auto.steering.desc": "ለፕሪሚየም መያዣ እና አዲስ ገጽታ የቆዳ ሽፋን እና እንደገና መስፋት።",
        "services.auto.full.title": "ሙሉ ውስጥ",
        "services.auto.full.desc": "የተቀናጀ ሁሉንም አገልግሎቶች የሚያጣምር ሙሉ የካቢን ለውጥ።",
        "services.other.title": "ሌሎች አገልግሎቶች",
        "services.architectural.title": "ሲኒማ እና አዳራሽ",
        "services.architectural.desc": "ለሲኒማዎች፣ ለስብሰባ አዳራሾች እና ለመዝናኛ ቦታዎች ልዩ ስራዎች።",
        "services.aviation.title": "አቪዬሽን",
        "services.aviation.desc": "ለግል አውሮፕላኖች ውስጣዊ ክፍል ፕሪሚየም ሽፋን።",
        "services.marine.title": "መርከቦች",
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
        "contact.interest.seats": "የወንበር ሽፋን",
        "contact.interest.dashboard": "የዳሽቦርድ ሽፋን",
        "contact.interest.roofline": "የጣራ ሽፋን ጥገና",
        "contact.interest.doors": "የበር ፓነል ሽፋን",
        "contact.interest.steering": "የመሪ ሽፋን",
        "contact.interest.fullInterior": "ሙሉ ውስጣዊ ክፍል ስራ",
        "contact.interest.architectural": "የሲኒማ/አዳራሽ ፕሮጀክቶች",
        "contact.message": "መልዕክት",
        "contact.message.placeholder": "ስለ ፕሮጀክትዎ ይንገሩን...",
        "contact.submit": "በዋትስአፕ ይላኩ",

        // Training
        "training.nav": "ስልጠና",
        "training.hero.title1": "የአፖልስትሪ",
        "training.hero.title2": "ጥበብ",
        "training.hero.subtitle": "በዘርፉ የካበተ ልምድ ባላቸው እና እውቅናን ባተረፉ ባለሙያዎች የፕሪሚየም አፖልስትሪን ጥበብ ይማሩ። ለጀማሪዎች እና ሙያተኞች ተስማሚ።",
        "training.hero.cta": "አሁኑኑ ይመዝገቡ",

        "training.about.label": "የባለሙያ ስልጠና",
        "training.about.headline": "የአፖልስትሪ ትምህርት እንደገና ተገንብቷል",
        "training.about.description": "የእኛ አጠቃላይ ስልጠና ፕሮግራሞች የተለመደውን የእጅ ጥበብን ከዘመናዊ የአፖልስትሪ ቴክኒኮች ጋር በማዋሃድ ያስተምራሉ። ለቅንጡ ተሽከርካሪዎች ውስጣዊ ክፍሎች የምንጣፍ፣ ወንበር ዲዛይን ወይም ልዩ ልዩ የመኪና አፖልስትሪ ስራዎች ፍላጎት ቢኖርዎት ፣ ለእርስዎ ተስማሚ የሆኑ ፕሮግራሞች አሉን።",

        "training.courses.title1": "የእኛ",
        "training.courses.title2": "ስልጠናዎች",
        "training.courses.subtitle": "ክህሎቶችዎን ለማሳደግ የተነደፉ የደረጃ ፕሮግራሞች።",

        "training.course.pro": "የሙያ ማሻሻያ",
        "training.course.pro.desc": "ከዚህ በፊት የሰሩ ባለሙያዎች ክህሎታቸውን ለማሻሻል የተዘጋጀ ፕሮግራም።",
        "training.course.pro.duration": "1 ወር",
        "training.course.pro.level": "ላቀ",

        "training.course.basic": "መሰረታዊ ስልጠና",
        "training.course.basic.desc": "መለኪያ፣ መቁረጥ፣ ስፌት እና መሠረታዊ የስራ አሰራር ይማሩ።",
        "training.course.basic.duration": "3 ወራት",
        "training.course.basic.level": "ጀማሪ",

        "training.course.intermediate": "መካከለኛ ፕሮግራም",
        "training.course.intermediate.desc": "በተግባራዊ ፕሮጀክቶች ላይ በመስራት ክህሎትዎን ወደ ሚቀጥለው ደረጃ ያሳድጉ።",
        "training.course.intermediate.duration": "6 ወራት",
        "training.course.intermediate.level": "መካከለኛ",

        "training.course.zero2hero": "Zero2Hero ሙሉ ልምምድ",
        "training.course.zero2hero.desc": "ከዜሮ እስከ ሙሉ ባለሙያ ድረስ የሚያደርስ የ1 ዓመት አጠቃላይ ስልጠና።",
        "training.course.zero2hero.duration": "1 ዓመት",
        "training.course.zero2hero.level": "Zero2Hero",

        "training.stats.students": "500+",
        "training.stats.students.label": "ምሩቃን",
        "training.stats.success": "95%",
        "training.stats.success.label": "የስራ ደረጃ",
        "training.stats.projects": "400+",
        "training.stats.projects.label": "የተማሪ ፕሮጀክቶች",

        "training.enrollment": "ለመማር ዝግጁ ኖት?",
        "training.enrollment.subtitle": "የአፖልስትሪ ጉዞዎን ይጀምሩ። በእያንዳንዱ ባች ውስጥ ውስን ቦታዎች ብቻ አሉን።",
        "training.enrollment.button": "አሁን ያመልክቱ",

        "training.highlights.standard": "ኢንዱስትሪ ደረጃ ሥርዓተ ትምህርት",
        "training.highlights.standard.desc": "በኢንዱስትሪ ዙሪያ ተደግፈው ያሉ ቴክኒኮችን ይማሩ",
        "training.highlights.handson": "በተግባር ያለ ሥልጠና",
        "training.highlights.handson.desc": "ከባለሙያ አሪፓሮች ጋር በእውነተኛ ፕሮጀክቶች ላይ ይሰሩ",
        "training.highlights.careers": "የስራ ድጋፍ",
        "training.highlights.careers.desc": "ከተመረቀ በኋላ የስራ ቦታ ድጋፍ",

        "training.badge.popular": "ታዋቂ",

        // Footer
        "footer.improvement": "የማያቋርጥ መሻሻል",
        "footer.rights": "መብቱ በህግ የተጠበቀ ነው።",
        "footer.tagline": "ፕሪሚየም የቆዳ ዲዛይን እና ሽፋን",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [, startTransition] = useTransition();

    // Use useLayoutEffect with startTransition to load from localStorage
    useLayoutEffect(() => {
        startTransition(() => {
            try {
                const saved = localStorage.getItem("teme-language") as Language;
                if (saved && (saved === "en" || saved === "am")) {
                    setLanguage(saved);
                }
            } catch {
                // localStorage not available
            }
        });
    }, []);

    useLayoutEffect(() => {
        // Save to localStorage when language changes
        try {
            localStorage.setItem("teme-language", language);
        } catch {
            // localStorage not available
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "am" : "en"));
    };

    const t = (key: string): string => {
        return (translations[language])[key] || key;
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
