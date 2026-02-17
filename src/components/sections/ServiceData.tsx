"use client";
import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ServiceCard from "./ServiceCard";
import { useTheme } from "@/context/ThemeContext";

interface ServiceItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  reverse: boolean;
}

export default function ServicesSection() {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".service-item");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  const servicesData: ServiceItem[] = [
    {
      id: 2,
      title: t("service1"),
      tagline: t("service1.subtitle"),
      description: t("service1.desc"),
      features: [
        t("service1.info1"),
        t("service1.info2"),
        t("service1.info3"),
        t("service1.info4"),
        t("service1.info5"),
        t("service1.info6"),
      ],
      image: "/photos/serviceVehicle.webp",
      reverse: true,
    },
    {
      id: 3,
      title: t("service2"),
      tagline: t("service2.subtitle"),
      description: t("service2.desc"),
      features: [
        t("service2.info1"),
        t("service2.info2"),
        t("service2.info3"),
        t("service2.info4"),
        t("service2.info5"),
        t("service2.info6"),
      ],
      image: "/photos/serviceCommercial.webp",
      reverse: false,
    },
    {
      id: 1,
      title: t("service3"),
      tagline: t("service3.subtitle"),
      description: t("service3.desc"),
      features: [
        t("service3.info1"),
        t("service3.info2"),
        t("service3.info3"),
        t("service3.info4"),
      ],
      image: "/photos/serviceRevival.webp",
      reverse: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`services-section py-20 lg:py-30 ${isDark ? "bg-neutral-900" : "bg-neutral-100"}`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header - Now matching Story component styling */}
        <div className="text-center mb-16 lg:mb-28">
          {/* Tagline - Same as Story component label */}
          <h2
            className={`text-sm font-bold tracking-[0.2em] uppercase mb-4 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}
          >
            {t("service.tagline")}
          </h2>

          {/* Title - Same as Story component headline */}
          <h1
            className={`text-3xl md:text-5xl font-light leading-tight mb-6 ${language === "am" ? "leading-snug" : ""} ${isDark ? "text-white" : "text-black"}`}
          >
            {t("service.title")}
          </h1>

          {/* Subtitle - Same as Story component description */}
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"} ${language === "am" ? "text-base md:text-lg" : ""}`}
          >
            {t("service.subtitle")}
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-32 lg:space-y-48">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              tagline={service.tagline}
              description={service.description}
              features={service.features}
              image={service.image}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
