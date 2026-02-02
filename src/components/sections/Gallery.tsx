"use client";

import Section from "@/components/ui/Section";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

// Ethiopic-inspired design names with mock project data
const designs = [
    {
        id: 1,
        name: "Konjit",
        nameAm: "ቆንጂት",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/konjit.jpg",
    },
    {
        id: 2,
        name: "Anbesaw",
        nameAm: "አንበሳው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/anbesaw.jpg",
    },
    {
        id: 3,
        name: "Alula",
        nameAm: "አሉላ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/alula.jpg",
    },
    {
        id: 4,
        name: "Maru",
        nameAm: "ማሩ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/maru.jpg",
    },
    {
        id: 5,
        name: "Genanaw",
        nameAm: "ገናናው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/genanaw.jpg",
    },
    {
        id: 6,
        name: "Dinku",
        nameAm: "ዲንቁ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/dinku.jpg",
    },
    {
        id: 7,
        name: "Wendwesen",
        nameAm: "ወንድወሰን",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/wendwesen.jpg",
    },
    {
        id: 8,
        name: "Moges",
        nameAm: "ሞገስ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/moges.jpg",
    },
    {
        id: 9,
        name: "Birhan",
        nameAm: "ብርሃን",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/birhan.jpg",
    },
    {
        id: 10,
        name: "Tikur Sew",
        nameAm: "ጥቁር ሰው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/berihun.jpg",
    },
    {
        id: 12,
        name: "Degsew",
        nameAm: "ደግሰው",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/degsew.jpg",
    },
    {
        id: 13,
        name: "Menelik",
        nameAm: "ምኒልክ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/menelik.jpg",
    },
    {
        id: 14,
        name: "Nitsuh",
        nameAm: "ንጹህ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/clean.jpg",
    },
    {
        id: 15,
        name: "Kuru",
        nameAm: "ኩሩ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "/photos/kuru.jpg",
    },
];

export default function Gallery() {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

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
