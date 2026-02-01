"use client";

import Section from "@/components/ui/Section";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

// Ethiopic-inspired design names with mock project data
const designs = [
    {
        id: 1,
        name: "Menelik",
        nameAm: "ምኒልክ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Tewodros",
        nameAm: "ቴዎድሮስ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Haile",
        nameAm: "ኃይሌ",
        category: "cinema",
        categoryAm: "ሲኒማ",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Wondwossen",
        nameAm: "ወንድወሰን",
        category: "automotive",
        categoryAm: "መኪና",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "Taytu",
        nameAm: "ጣይቱ",
        category: "lounge",
        categoryAm: "ላውንጅ",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 6,
        name: "Zewditu",
        nameAm: "ዘውዲቱ",
        category: "cinema",
        categoryAm: "ሲኒማ",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 7,
        name: "Lalibela",
        nameAm: "ላሊበላ",
        category: "automotive",
        categoryAm: "መኪና",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: 8,
        name: "Axum",
        nameAm: "አክሱም",
        category: "chair",
        categoryAm: "ወንበር",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: 9,
        name: "Gondar",
        nameAm: "ጎንደር",
        category: "automotive",
        categoryAm: "መኪና",
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 10,
        name: "Fasilides",
        nameAm: "ፋሲልደስ",
        category: "hall",
        categoryAm: "አዳራሽ",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop",
    },
];

export default function Gallery() {
    const { t, language } = useLanguage();

    return (
        <Section id="gallery" className="bg-neutral-950 text-white min-h-screen theme-transition">
            <div className="max-w-7xl mx-auto" lang={language}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        {t("gallery.title1")} <span className="text-neutral-500">{t("gallery.title2")}</span>
                    </h2>
                    <p className="text-neutral-400">{t("gallery.subtitle")}</p>
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
                            className="group relative aspect-[4/5] bg-neutral-900 rounded-xl overflow-hidden border border-white/5 cursor-pointer hover:border-white/20 transition-all duration-300"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${design.image})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                                {/* Category Badge */}
                                <div className="flex justify-end">
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                                        {language === "am" ? design.categoryAm : design.category}
                                    </span>
                                </div>

                                {/* Title & CTA */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">
                                        {language === "am" ? design.nameAm : design.name}
                                    </h3>
                                    <div className="flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <Eye className="w-4 h-4 text-neutral-400" />
                                        <span className="text-xs text-neutral-400">{t("gallery.viewProject")}</span>
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
                    <p className="text-neutral-500 text-sm">
                        {language === "en"
                            ? "Showcasing a selection of our finest work. Contact us to discuss your project."
                            : "የምርጥ ስራዎቻችን ምርጫ። ስለ ፕሮጀክትዎ ለመወያየት ያግኙን።"}
                    </p>
                </div>
            </div>
        </Section>
    );
}
