"use client";

import { createContext, useContext, useState, ReactNode } from "react";
type Language = "en" | "am";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.story": "Story",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "cta.book": "Book a Service",

    // Hero
    "hero.title1": "CRAFTING",
    "hero.title2": "PERFECTION",
    "hero.subtitle":
      "Bespoke upholstery for exclusive interiors. From luxury cars to custom furniture, we redefine craftsmanship.",
    "hero.cta1": "Our Services",
    "hero.cta2": "Our Story",

    // Story
    "story.label": "Our Legacy",
    "story.headline1": "We don't just cover seats.",
    "story.headline2": "We craft experiences.",
    "story.description":
      "For years, we have been the trusted partner for discerning clients in Ethiopia and beyond. Our artisans blend traditional Ethiopian craftsmanship with modern techniques to create interiors that inspire.",
    "story.stat1.value": "10+",
    "story.stat1.label": "Years of Excellence",
    "story.stat2.value": "500+",
    "story.stat2.label": "Custom Projects",
    "story.stat3.value": "100%",
    "story.stat3.label": "Client Satisfaction",

    // Services
    "services.title1": "OUR",
    "services.title2": "EXPERTISE",
    "services.subtitle":
      "Tailored solutions for every environment where comfort meets luxury.",
    "services.automotive.title": "Automotive",
    "services.automotive.desc":
      "Bespoke interiors for luxury cars, SUVs, and classic vehicles.",
    "services.architectural.title": "Commercial",
    "services.architectural.desc":
      "Cinemas, halls, aviation, marine & lounge upholstery.",
    "services.aviation.title": "Renovations & Revival",
    "services.aviation.desc":
      "Transform your space with stylish, functional renovations.",
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
    "contact.subtitle":
      "Ready to transform your interior? Get in touch with our design team.",
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

    // About page
    "about.title": "About Us",
    "about.content1":
      "Founded in 2019, Teme Upholstery began as a car wash business and later expanded into vehicle upholstery, driven by a strong commitment to quality craftsmanship. Today, we provide professional upholstery services for both vehicles and commercial spaces.",
    "about.content2":
      "We are proud to be the first in Ethiopia to offer professional upholstery training, helping develop skilled artisans and supporting the growth of the industry nationwide.",
    "value.title": "Our Core Values",
    "value.subtitle": "The principles that guide every stitch and design",
    value1: "Excellence",
    "value1.desc":
      "We treat every project as if it were our own. From the smallest stitch to the final finish, we care deeply about doing the job right— especially when it comes to vehicle interiors.",
    value2: "Build to Last",
    "value2.desc":
      "We focus on quality that holds up over time. Using reliable materials and proven techniques, our work is made for real life and everyday use.",
    value3: "Client First",
    "value3.desc":
      "We listen first. Understanding our clients’ needs, style, and budget allows us to deliver tailored solutions that meet expectations and exceed satisfaction.",
    "ceo.title": "Founder & CEO",
    "ceo.name": "Temesgen Abebe",
    "ceo.message":
      "“Every piece we create carries our passion for craftsmanship. We don’t just upholster furniture — we restore comfort, beauty, and trust.”",
    "ceo.info":
      "Leading Teme Upholstery since 2019, with a vision rooted in quality, innovation, and Ethiopian craftsmanship.",

    // service page
    "service.hero.subtitle":
      "Discover our full range of interior design, renovation, and custom upholstery services. From the first idea to the final detail, we bring your space to life with care, creativity, and beautifully crafted leather and textile pieces.",
    "service.tagline": "Our Services",
    "service.title": "Professional Services",
    "service.subtitle":
      "We deliver exceptional quality and attention to detail in every project",
    service1: "Vehicle Upholstery",
    "service1.subtitle": "RESTORE & ENHANCE YOUR RIDE",
    "service1.desc":
      "Specializing in automotive interiors since 2013, we transform vehicle cabins with premium materials and expert craftsmanship—from classic restorations to modern customization.",
    "service.info.title": "What We Offer:",
    "service1.info1": "Seat reupholstery",
    "service1.info2": "Dashboard restoration",
    "service1.info3": "Headliner replacement",
    "service1.info4": "Carpet installation",
    "service1.info5": "Leather conditioning",
    "service1.info6": "Custom interior design",
    "service.btn": "Get a Service",
    service2: "Commercial Upholstery",
    "service2.subtitle": "FOR BUSINESSES & HOSPITALITY",
    "service2.desc":
      "Professional upholstery solutions for commercial spaces. We provide durable, stylish, and compliant furniture for restaurants, hotels, offices, and public facilities.",
    "service2.info1": "Restaurant booth seating",
    "service2.info2": "Hotel furniture",
    "service2.info3": "Office chairs & sofas",
    "service2.info4": "Conference room furniture",
    "service2.info5": "Fire-retardant fabrics",
    "service2.info6": "High-traffic material selection",
    service3: "Renovations & Revival",
    "service3.subtitle": "TRANSFORMING YOUR SPACE",
    "service3.desc":
      "Refresh and reimagine your interiors with our professional renovation services. We work closely with you to upgrade, restore, and enhance your space—combining functionality, comfort, and style to bring your vision to life.",
    "service3.info1": "Interior space remodeling",
    "service3.info2": "Custom built-ins and fittings",
    "service3.info3": "Furniture restoration and upgrades",
    "service3.info4": "Residential and commercial renovations",
  },
  am: {
    // Header
    "nav.home": "ዋና",
    "nav.story": "ታሪካችን",
    "nav.services": "አገልግሎቶች",
    "nav.gallery": "ስራዎች",
    "nav.contact": "አግኙን",
    "cta.book": "አገልግሎት ይዘዙ",

    // Hero
    "hero.title1": "ፍጹምነትን",
    "hero.title2": "እንፈጥራለን",
    "hero.subtitle":
      "ለየት ያሉ የመኪና የውስጥ ዲዛይኖች እና ዲኮሮች ። ከቅንጦት መኪናዎች እስከ ፈርኒቸር ስራዎች ፣ የእጅ ጥበብን እንደገና እንቀርፃለን።",
    "hero.cta1": "አገልግሎቶቻችን",
    "hero.cta2": "ታሪካችን",

    // Story
    "story.label": "የእኛ ትሩፋት",
    "story.headline1": "ወንበሮችን ብቻ አንሸፍንም።",
    "story.headline2": "ልምዶችን እንፈጥራለን።",
    "story.description":
      "ለዓመታት በኢትዮጵያ እና ከዚያ ባሻገር ለሚገኙ ደንበኞቻችን ታመኝ አጋራቸው ሆነናል። የእጅ ባለሙያዎቻችን ባህላዊ የኢትዮጵያ የእጅ ጥበብን ከዘመናዊ ቴክኒኮች ጋር የሚያዋህዱ የእጅግ ድንቅ ስራ ባለሞያዎች ናቸው።",
    "story.stat1.value": "10+",
    "story.stat1.label": "የልህቀት ዓመታት",
    "story.stat2.value": "500+",
    "story.stat2.label": " የተሰሩ ፕሮጀክቶች",
    "story.stat3.value": "100%",
    "story.stat3.label": "የደንበኛ እርካታ",

    // Services
    "services.title1": "የእኛ",
    "services.title2": "ልምድ",
    "services.subtitle": "ምቾትን ከቅንጦት ጋር የሚያገናኙ መፍትሄዎች እንሰጣለን።",
    "services.automotive.title": "የመኪና ውስጥ ስራዎች",
    "services.automotive.desc": "ለቅንጦት መኪናዎች፣ SUVs እና ክላሲክ ተሽከርካሪዎች።",
    "services.architectural.title": "ሲኒማ እና አዳራሽ",
    "services.architectural.desc": "ለሲኒማዎች፣ ለስብሰባ አዳራሾች እና ለመዝናኛ ቦታዎች።",
    "services.aviation.title": "አቪዬሽን",
    "services.aviation.desc": "ለግል እና ለህዝብ አውሮፕላኖች ውስጠኛ ክፍል ፕሪሚየም ሽፋን።",
    "services.marine.title": "የባህር ውሰጥ ስራዎች",
    "services.marine.desc": "የአየር ሁኔታ-መቋቋም የሚችሉ ቅንጡ ጀልባዎች ።",
    "services.comingSoon": "በቅርቡ",
    "services.availableOnRequest": "በጥያቄ ይገኛል",
    // Gallery
    "gallery.title1": "የእኛ",
    "gallery.title2": "ዲዛይኖች",
    "gallery.subtitle": "የተጠናቀቁ ምርጥ ፕሮጀክቶቻችን",
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
    "contact.interest.aviation": "የአቪዬሽን ውስጣዊ ክፍል",
    "contact.interest.marine": "የመርከቦች ውስጣዊ ክፍል",
    "contact.message": "መልዕክት",
    "contact.message.placeholder": "ስለ ፕሮጀክትዎ ይንገሩን...",
    "contact.submit": "በዋትስአፕ ይላኩ",

    // Footer
    "footer.improvement": "በማያቋርጥ መሻሻል ውስጥ",
    "footer.rights": "መብቱ በህግ የተጠበቀ ነው።",
    "footer.tagline": "ፕሪሚየም የቆዳ ዲዛይን እና ሽፋን",

    //about page
    "about.title": "ከፍተኛ ጥራት ያለው፣ ምቹ የሆነ የጽሕፈት መኪና እንፈጥራለን።",
    "about.content1":
      "በ2012 የተመሰረተው ቴሜ አፕሆልስተሪ በተሽከርካሪ አልባሳት እና ለጥራት እደ ጥበብ ቁርጠኝነት ጀምሯል።",
    "about.content2":
      "በአገር አቀፍ ደረጃ የሰለጠነ የእጅ ጥበብ ባለሙያዎችን በማጎልበት ሙያዊ የጨርቃጨርቅ ሥልጠና በመስጠት በኢትዮጵያ የመጀመሪያው በመሆናችን ኩራት ይሰማናል።",
    "value.title": "ዋና እሴቶች።",
    "value.subtitle": "እያንዳንዱን ስፌት እና ዲዛይን የሚመሩ መርሆዎች",
    value1: "Excellence",
    "value1.desc":
      "እያንዳንዱን ፕሮጀክት የራሳችን ይመስል እንይዛለን። ከትንሽ ስፌት ጀምሮ እስከ መጨረሻው ፍፃሜ ድረስ፣ በተለይ የተሽከርካሪ የውስጥ ክፍልን በተመለከተ ስራውን በትክክል— ለመስራት በጣም እንጨነቃለን።",
    value2: "እስከ መጨረሻ ይገንቡ።",
    "value2.desc":
      "በጊዜ ሂደት በሚቆይ ጥራት ላይ እናተኩራለን. አስተማማኝ ቁሳቁሶችን እና የተረጋገጡ ቴክኒኮችን በመጠቀም ስራችን ለእውነተኛ ህይወት እና ለዕለት ተዕለት ጥቅም የተሰራ ነው.",
    value3: "ደንበኛ መጀመሪያ።",
    "value3.desc":
      "መጀመሪያ እናዳምጣለን። ደንበኞቻችንን መረዳት የ’ ፍላጎቶች፣ ዘይቤ እና በጀት የሚጠበቁትን የሚያሟሉ እና ከእርካታ በላይ የሆኑ ብጁ መፍትሄዎችን እንድናቀርብ ያስችለናል።",
    "ceo.title": "Founder & CEO",
    "ceo.name": "Temesgen Abebe",
    "ceo.message":
      "“የምንፈጥረው እያንዳንዱ ቁራጭ ለዕደ ጥበብ ያለንን ፍቅር ይይዛል። የቤት እቃዎችን ብቻ አንለብስም — ምቾትን፣ ውበትን እና እምነትን እንመልሳለን ። ”",
    "ceo.info":
      "ከ2019 ጀምሮ መሪ ተሜ አፕሆልስቲሪ፣ በጥራት፣ በፈጠራ እና በኢትዮጵያ የእጅ ጥበብ ላይ የተመሰረተ ራዕይ ያለው።",

    // service page
    "service.hero.subtitle":
      "የውስጥ ዲዛይን፣ እድሳት እና በቆዳ እና በጨርቅ የሚሰሩ ልዩ አፍሮሎችን ያካትታል። ከመጀመሪያ ሀሳብ እስከ መጨረሻ ዝርዝር ድረስ፣ ቦታዎን በእንክብካቤ፣ በፈጠራና በትክክል ሥራ እንለውጣለን",
    "service.tagline": "Our Services",
    "service.title": "Professional Services",
    "service.subtitle":
      "We deliver exceptional quality and attention to detail in every project",
    service1: "የመኪና አፖልስትሪ",
    "service1.subtitle": "ጉዞዎን ወደነበረበት ይመልሱ እና ያሳድጉ።",
    "service1.desc":
      "ከ 2013 ጀምሮ በአውቶሞቲቭ የውስጥ ክፍሎች ላይ ልዩ ችሎታ ያለው ፣ የተሽከርካሪ ካቢኔዎችን በፕሪሚየም ቁሳቁሶች እና በባለሙያዎች የእጅ ጥበብ— ከጥንታዊ እድሳት ወደ ዘመናዊ ማበጀት እንለውጣለን።",
    "service.info.title": "የምናቀርበው፡-",
    "service1.info1": "የመቀመጫ",
    "service1.info2": "ዳሽቦርድ ወደነበረበት መመለስ",
    "service1.info3": "አርዕስተ መተኪያ",
    "service1.info4": "ምንጣፍ መጫኛ",
    "service1.info5": "የቆዳ ማስተካከያ",
    "service1.info6": "ብጁ የውስጥ ንድፍ",
    "service.btn": "አገልጋይ ያግኙ።",
    service2: "የንግድ ጹሐን",
    "service2.subtitle": "ለንግድ እና መስተንግዶ።",
    "service2.desc":
      "ለንግድ ቦታዎች ሙያዊ የቤት ዕቃዎች መፍትሄዎች. ለምግብ ቤቶች፣ ለሆቴሎች፣ ለቢሮዎች እና ለሕዝብ መገልገያዎች ዘላቂ፣ ቄንጠኛ እና ታዛዥ የቤት ዕቃዎችን እናቀርባለን።",
    "service2.info1": "ምግብ ቤት ዳስ መቀመጫ",
    "service2.info2": "የሆቴል",
    "service2.info3": "የቢሮ ወንበሮች እና ሶፋዎች።",
    "service2.info4": "የስብሰባ ክፍል የቤት ዕቃዎች",
    service3: "እድሳት እና መነቃቃት።",
    "service3.subtitle": "ቦታዎን መለወጥ",
    "service3.desc":
      "የውስጥ ክፍልዎን በሙያዊ እድሳት አገልግሎታችን ያድሱ እና እንደገና ያስቡ። እይታዎን ወደ ህይወት ለማምጣት የእርስዎን ቦታ ለማሻሻል፣ ለማደስ እና ለማሻሻል ከእርስዎ ጋር በቅርበት እንሰራለን።",
    "service3.info1": "የውስጥ ቦታ ማሻሻያ.",
    "service3.info2": "የመኖሪያ እና የንግድ እድሳት",
    "service3.info3": "የቤት ዕቃዎች እድሳት እና ማሻሻያዎች",
    "service3.info4": "የስብሰባ ክፍል የቤት ዕቃዎች",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // lazy load from localStorage only on client
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      // check if client
      const saved = localStorage.getItem("teme-language");
      if (saved === "en" || saved === "am") return saved;
    }
    return "en"; // default
  });
  const toggleLanguage = () => {
    const nextLang = language === "en" ? "am" : "en";
    setLanguage(nextLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("teme-language", nextLang);
    }
  };

  const t = (key: string) =>
    (translations[language] as Record<string, string>)[key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
