"use client";

import Section from "@/components/ui/Section";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

export default function Services() {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const services = [
    {
      id: "01",
      titleKey: "services.automotive.title",
      descKey: "services.automotive.desc",
      image: "/photos/auto.webp",
      primary: true,
    },
    {
      id: "02",
      titleKey: "services.architectural.title",
      descKey: "services.architectural.desc",
      image: "/photos/cinema.webp",
      primary: true,
    },
    {
      id: "03",
      titleKey: "services.aviation.title",
      descKey: "services.aviation.desc",
      image: "/photos/jet.webp",
      primary: false,
      comingSoon: true,
    },
  ];

  return (
    <Section
      id="services"
      className={isDark ? "bg-black text-white" : "bg-white text-black"}
    >
      <div className="max-w-7xl mx-auto" lang={language}>
        <div
          className={`flex flex-col md:flex-row justify-between items-end mb-16 border-b pb-8 ${isDark ? "border-white/10" : "border-black/10"}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            {t("services.title1")}{" "}
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
              {t("services.title2")}
            </span>
          </h2>
        </div>
        {/* Services Flat Layout (like template image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col">
              {/* Image — taller, no container */}
              <div className="relative w-full aspect-[4.75/5] rounded-xl overflow-hidden">
                <Image
                  src={service.image}
                  alt={t(service.titleKey)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={service.primary}
                />
              </div>

              {/* Text — separated by spacing only */}
              <div className="mt-4">
                <h3
                  className={`text-lg font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t(service.titleKey)}
                </h3>

                <p
                  className={`text-sm mt-1 ${
                    isDark ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {t(service.descKey)}
                </p>

                <button
                  className={`mt-3 px-4 py-2 text-sm font-medium ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"} font-semibold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl mt-8`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
