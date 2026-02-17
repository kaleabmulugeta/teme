"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ValueCard, ValueCardProps } from "./ValueCard";
import { useTheme } from "@/context/ThemeContext";

const Values: React.FC = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  // Define values data for better organization and type safety
  const valuesData: ValueCardProps[] = [
    {
      backgroundImage: "/photos/aviation.webp",
      iconClass: "ri-award-fill",
      title: t("value1"),
      description: t("value1.desc"),
    },
    {
      backgroundImage: "/photos/buildTolast.webp",
      iconClass: "ri-leaf-fill",
      title: t("value2"),
      description: t("value2.desc"),
    },
    {
      backgroundImage: "/photos/clientFirst.webp",
      iconClass: "ri-heart-fill",
      title: t("value3"),
      description: t("value3.desc"),
    },
  ];

  return (
    <section
      id="values"
      className={` min-h-[80vh] flex items-center ${isDark ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"}`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header text-center mb-16 md:mb-24">
          {/* Title - Same as Story component headline but larger size */}
          <h2
            className={`text-3xl md:text-5xl font-light leading-tight mb-6 ${language === "am" ? "leading-snug" : ""} ${isDark ? "text-white" : "text-black"}`}
          >
            {t("value.title")}
          </h2>

          {/* Subtitle - Same as Story component description */}
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"} ${language === "am" ? "text-base md:text-lg" : ""}`}
          >
            {t("value.subtitle")}
          </p>
        </div>

        <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {valuesData.map((value, index) => (
            <ValueCard
              key={index}
              backgroundImage={value.backgroundImage}
              iconClass={value.iconClass}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
