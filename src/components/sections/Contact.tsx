"use client";

import { useState, FormEvent } from "react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle } from "lucide-react";

// Administrator WhatsApp number - replace with actual number
const WHATSAPP_NUMBER = "251975136484";

export default function Contact() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        interest: "automotive",
        message: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Format the message for WhatsApp
        const interestLabels: Record<string, string> = {
            automotive: t("contact.interest.automotive"),
            architectural: t("contact.interest.architectural"),
            aviation: t("contact.interest.aviation"),
            marine: t("contact.interest.marine"),
        };

        const message = `
*New Inquiry from TEME Website*
━━━━━━━━━━━━━━━━━━━━

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Interest:* ${interestLabels[formData.interest] || formData.interest}

*Message:*
${formData.message}
        `.trim();

        // Encode the message and create WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, "_blank");
    };

    return (
        <Section id="contact" className="bg-black text-white theme-transition">
            <div className="max-w-3xl mx-auto text-center" lang={language}>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                    {t("contact.title1")} <span className="text-neutral-500">{t("contact.title2")}</span>
                </h2>
                <p className="text-neutral-400 mb-12">
                    {t("contact.subtitle")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                                {t("contact.name")}
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors theme-transition"
                                placeholder={t("contact.name.placeholder")}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                                {t("contact.phone")}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors theme-transition"
                                placeholder={t("contact.phone.placeholder")}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                            {t("contact.email")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors theme-transition"
                            placeholder={t("contact.email.placeholder")}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="interest" className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                            {t("contact.interest")}
                        </label>
                        <select
                            id="interest"
                            value={formData.interest}
                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors theme-transition"
                        >
                            <option value="automotive">{t("contact.interest.automotive")}</option>
                            <option value="architectural">{t("contact.interest.architectural")}</option>
                            <option value="aviation">{t("contact.interest.aviation")}</option>
                            <option value="marine">{t("contact.interest.marine")}</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                            {t("contact.message")}
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none theme-transition"
                            placeholder={t("contact.message.placeholder")}
                        />
                    </div>

                    <div className="text-center pt-8">
                        <Button type="submit" variant="primary" className="w-full md:w-auto gap-2">
                            <MessageCircle className="w-4 h-4" />
                            {t("contact.submit")}
                        </Button>
                        <p className="text-xs text-neutral-600 mt-4">
                            {language === "en"
                                ? "Your message will be sent directly via WhatsApp"
                                : "መልዕክትዎ በቀጥታ በዋትስአፕ ይላካል"}
                        </p>
                    </div>
                </form>
            </div>
        </Section>
    );
}
