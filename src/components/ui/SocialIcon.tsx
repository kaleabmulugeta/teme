"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Send, MessageCircle } from "lucide-react";

interface SocialIconProps {
    platform: "instagram" | "linkedin" | "telegram" | "whatsapp" | "x";
    href: string;
    className?: string;
}

const icons = {
    instagram: Instagram,
    linkedin: Linkedin,
    telegram: Send,
    whatsapp: MessageCircle,
    x: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
};

const platformColors = {
    instagram: "hover:text-pink-500",
    linkedin: "hover:text-blue-500",
    telegram: "hover:text-sky-400",
    whatsapp: "hover:text-green-500",
    x: "hover:text-white",
};

export default function SocialIcon({ platform, href, className }: SocialIconProps) {
    const Icon = icons[platform];

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative p-3 rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 ${platformColors[platform]} hover:border-white/30 hover:bg-white/10 ${className}`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Follow us on ${platform}`}
        >
            <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
            >
                <Icon className="w-5 h-5" />
            </motion.div>
        </motion.a>
    );
}
