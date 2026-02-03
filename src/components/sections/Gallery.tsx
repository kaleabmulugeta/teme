"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, MessageCircle, X } from "lucide-react";

// Administrator WhatsApp number - replace with actual number if needed
const WHATSAPP_NUMBER = "251975136484";

// Ethiopic-inspired design names with mock project data
const designs = [
    {
        id: 1,
        name: "Konjit",
        nameAm: "ቆንጂት",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/konjit.webp",
        images: ["/photos/konjit.webp", "/photos/konjit-2.webp", "/photos/konjit-3.webp", "/photos/konjit-4.webp","/photos/konjit-5.webp","/photos/konjit-6.webp", "/photos/konjit-7.webp"],
    },
    {
        id: 2,
        name: "Anbesaw",
        nameAm: "አንበሳው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/anbesaw.webp",
        images: ["/photos/anbesaw.webp", "/photos/anbesaw-2.webp", "/photos/anbesaw-3.webp", "/photos/anbesaw-4.webp","/photos/anbesaw-5.webp","/photos/anbesaw-6.webp", "/photos/anbesaw-7.webp"],
    },
    {
        id: 3,
        name: "Alula",
        nameAm: "አሉላ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/alula.webp",
        images: ["/photos/alula.webp"],
    },
    {
        id: 4,
        name: "Maru",
        nameAm: "ማሩ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/maru.webp",
        images: ["/photos/maru.webp"],
    },
    {
        id: 5,
        name: "Genanaw",
        nameAm: "ገናናው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/genanaw.webp",
        images: ["/photos/genanaw.webp"],
    },
    {
        id: 6,
        name: "Dinku",
        nameAm: "ዲንቁ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/dinku.webp",
        images: ["/photos/dinku.webp", "/photos/dinku-1.webp", "/photos/dinku-2.webp", "/photos/dinku-3.webp","/photos/dinku-4.webp","/photos/dinku-5.webp"],
    },
    {
        id: 7,
        name: "Wendwesen",
        nameAm: "ወንድወሰን",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/wendwesen.webp",
        images: ["/photos/wendwesen.webp"],
    },
    {
        id: 8,
        name: "Moges",
        nameAm: "ሞገስ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/moges.webp",
        images: ["/photos/moges.webp"],
    },
    {
        id: 9,
        name: "Birhan",
        nameAm: "ብርሃን",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/birhan.webp",
        images: ["/photos/birhan.webp"],
    },
    {
        id: 10,
        name: "Tikur Sew",
        nameAm: "ጥቁር ሰው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/berihun.webp",
        images: ["/photos/berihun.webp"],
    },
    {
        id: 12,
        name: "Degsew",
        nameAm: "ደግሰው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/degsew.webp",
        images: ["/photos/degsew.webp"],
    },
    {
        id: 13,
        name: "Menelik",
        nameAm: "ምኒልክ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/menelik.webp",
        images: ["/photos/menelik.webp"],
    },
    {
        id: 14,
        name: "Nitsuh",
        nameAm: "ንጹህ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/clean.webp",
        images: ["/photos/clean.webp"],
    },
    {
        id: 15,
        name: "Kuru",
        nameAm: "ኩሩ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/kuru.webp",
        images: ["/photos/kuru.webp", "/photos/kuru-1.webp", "/photos/kuru-2.webp", "/photos/kuru-3.webp","/photos/kuru-4.webp","/photos/kuru-5.webp"],
    },
    {
        id: 16,
        name: "Semay",
        nameAm: "ሰማይ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/semay.webp",
        images: ["/photos/semay.webp", "/photos/semay-2.webp", "/photos/semay-3.webp", "/photos/semay-4.webp","/photos/semay-5.webp","/photos/semay-6.webp", "/photos/semay-7.webp", "/photos/semay-8.webp" ],
    },
];

export default function Gallery() {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();
    const [selectedDesign, setSelectedDesign] = useState<(typeof designs)[number] | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [selectedDesign]);

    useEffect(() => {
        if (!selectedDesign) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedDesign(null);
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [selectedDesign]);

    const buildInquiryLink = (designName: string) => {
        const message = language === "am"
            ? `ስለ "${designName}" ዲዛይን መጠየቅ እፈልጋለሁ።`
            : `I'm interested in the "${designName}" design. Please share more details.`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    };

    const handleInquiryClick = (designName: string) => {
        window.open(buildInquiryLink(designName), "_blank", "noopener,noreferrer");
    };

    const getDesignImages = (design: (typeof designs)[number]) => design.images ?? [design.image];

    const handlePrevImage = () => {
        if (!selectedDesign) return;
        const images = getDesignImages(selectedDesign);
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNextImage = () => {
        if (!selectedDesign) return;
        const images = getDesignImages(selectedDesign);
        setActiveImageIndex((prev) => (prev + 1) % images.length);
    };

    const getDesignDescription = (designName: string) =>
        language === "am"
            ? `የ "${designName}" ዲዛይን ለመኪና ውስጥ የተስተካከለ የቆዳ ስራ ነው።`
            : `The "${designName}" design blends premium leather and textile upholstery tailored for refined interiors.`;

    return (
        <Section id="gallery" className={`min-h-screen ${isDark ? "bg-neutral-950 text-white" : "bg-white text-black"}`}>
            <div className="max-w-7xl mx-auto" lang={language}>
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-4 ${isDark ? "text-white/90" : "text-black/90"}`}>
                        {t("gallery.title1")} <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>{t("gallery.title2")}</span>
                    </h2>
                    <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"} opacity-80`}>{t("gallery.subtitle")}</p>
                </div>

                {/* Design Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {designs.map((design, idx) => (
                        <motion.div
                            key={design.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className={`group relative aspect-[4/5] rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 ${isDark ? "bg-neutral-900/70 border-white/5 hover:border-white/20" : "bg-neutral-100/70 border-black/5 hover:border-black/20"}`}
                            role="button"
                            tabIndex={0}
                            aria-label={language === "am" ? `${design.nameAm} ዲዛይን ይመልከቱ` : `View ${design.name} design`}
                            onClick={() => setSelectedDesign(design)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    setSelectedDesign(design);
                                }
                            }}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${design.image})` }}
                            />

                            {/* Gradient Overlay */}
                            {isDark && (
                                <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            )}

                            {/* Content */}
                            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                                {/* Category Badge */}
                                <div className="flex justify-end">
                                    <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full border ${isDark ? "text-neutral-400 bg-black/40 border-white/10" : "text-neutral-600 bg-white border-black/10"}`}>
                                        {language === "am" ? design.categoryAm : design.category}
                                    </span>
                                </div>

                                {/* Title & CTA */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">
                                        {language === "am" ? design.nameAm : design.name}
                                    </h3>
                                    <div className="flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <Eye className={`w-4 h-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                                        <span className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{t("gallery.viewProject")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-t from-cognac/20 to-transparent" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedDesign && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            aria-modal="true"
                            role="dialog"
                            onClick={() => setSelectedDesign(null)}
                            onWheel={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                            }}
                        >
                            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                            <motion.div
                                className={`relative w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto overscroll-contain ${isDark ? "bg-neutral-950 border-white/10" : "bg-white border-black/10"}`}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.98, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                onClick={(event) => event.stopPropagation()}
                                onWheel={(event) => {
                                    event.stopPropagation();
                                }}
                            >
                                <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-white/10" : "border-black/10"}`}>
                                    <div>
                                        <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                                            {language === "am" ? "የዲዛይን ቅድሚያ" : "Design Preview"}
                                        </p>
                                        <h3 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
                                            {language === "am" ? selectedDesign.nameAm : selectedDesign.name}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedDesign(null)}
                                        className={`p-2 rounded-full transition ${isDark ? "text-neutral-400 hover:text-white hover:bg-white/10" : "text-neutral-500 hover:text-black hover:bg-black/5"}`}
                                        aria-label={language === "am" ? "መዝጊያ" : "Close"}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 p-6">
                                    <div className="space-y-4">
                                        <div className="relative overflow-hidden rounded-xl border border-black/10 bg-black/5 w-[600px] h-[380px] max-w-full">
                                            <img
                                                src={getDesignImages(selectedDesign)[activeImageIndex]}
                                                alt={language === "am" ? selectedDesign.nameAm : selectedDesign.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={handlePrevImage}
                                                className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur ${
                                                    isDark
                                                        ? "bg-black/50 text-white hover:bg-black/70"
                                                        : "bg-white/70 text-black hover:bg-white"
                                                }`}
                                                aria-label={language === "am" ? "ቀደም ያለ ምስል" : "Previous image"}
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleNextImage}
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur ${
                                                    isDark
                                                        ? "bg-black/50 text-white hover:bg-black/70"
                                                        : "bg-white/70 text-black hover:bg-white"
                                                }`}
                                                aria-label={language === "am" ? "ቀጣይ ምስል" : "Next image"}
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex gap-3 overflow-x-auto flex-nowrap pb-2 w-[600px] max-w-full">
                                            {getDesignImages(selectedDesign).map((image, index) => (
                                                <div
                                                    key={`${selectedDesign.id}-${image}`}
                                                    className={`relative overflow-hidden rounded-lg border shrink-0 w-28 h-16 ${
                                                        activeImageIndex === index
                                                            ? isDark
                                                                ? "border-white/50"
                                                                : "border-black/60"
                                                            : isDark
                                                                ? "border-white/10"
                                                                : "border-black/10"
                                                    }`}
                                                    aria-label={language === "am" ? `ተጨማሪ ምስል ${index + 1}` : `Additional image ${index + 1}`}
                                                >
                                                    <img src={image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className={`text-sm uppercase tracking-wider ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                                                {language === "am" ? "ምድብ" : "Category"}
                                            </p>
                                            <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>
                                                {language === "am" ? selectedDesign.categoryAm : selectedDesign.category}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-sm uppercase tracking-wider ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                                                {language === "am" ? "ማብራሪያ" : "Overview"}
                                            </p>
                                            <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                                                {getDesignDescription(language === "am" ? selectedDesign.nameAm : selectedDesign.name)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-sm uppercase tracking-wider ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                                                {language === "am" ? "ተጨማሪ ምስሎች" : "More Photos"}
                                            </p>
                                            <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                                                {language === "am"
                                                    ? "ተጨማሪ ምስሎችን ለማየት በግራ/ቀኝ ቀስት ምስሎችን ይጫኑ። ትንሽ ምስሎች በአንድ መስመር ይታያሉ።"
                                                    : "Use the left/right arrows to scroll photos. Thumbnails stay on one line and can scroll horizontally."}
                                            </p>
                                        </div>
                                        <Button
                                            variant="primary"
                                            className={`gap-2 ${language === "en" ? "text-xs" : "text-sm"}`}
                                            onClick={() => handleInquiryClick(language === "am" ? selectedDesign.nameAm : selectedDesign.name)}
                                        >
                                            <MessageCircle className={language === "en" ? "w-4 h-4" : "w-[18px] h-[18px]"} />
                                            {language === "am" ? "ስለዚህ ዲዛይን ይጠይቁ" : "Contact us about this design"}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats or Call to Action */}
                <div className="mt-16 text-center">
                    <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                        {language === "en"
                            ? "Showcasing a selection of our finest work. Contact us to discuss your project."
                            : "የምርጥ ስራዎቻችን ምርጫ። ስለ ፕሮጀክትዎ ለመወያየት ያግኙን።"}
                    </p>
                </div>
            </div>
        </Section>
    );
}
