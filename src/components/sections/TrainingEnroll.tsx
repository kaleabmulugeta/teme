"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function TrainingEnroll() {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

    const handleEnrollClick = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.location.href = "/#contact";
        }
    };

    return (
        <Section
            id="training-enroll"
            className={isDark ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"}
        >
            <div className="max-w-4xl mx-auto text-center" lang={language}>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                    {t("training.enrollment")}
                </h2>

                <p className={`text-lg md:text-xl leading-relaxed mb-12 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    {t("training.enrollment.subtitle")}
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
                    <Button
                        variant="primary"
                        className="px-8 py-3 text-base"
                        onClick={handleEnrollClick}
                    >
                        {t("training.enrollment.button")}
                    </Button>
                </div>
            </div>
        </Section>
    );
}
