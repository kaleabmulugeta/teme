"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export interface ValueCardProps {
  backgroundImage: string;
  iconClass: string;
  title: string;
  description: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  backgroundImage,
  title,
  description,
}) => {
  const { isDark } = useTheme();

  return (
    <div className="group relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay - More subtle */}
        <div
          className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-black/80 via-black/50 to-black/20" : "bg-gradient-to-t from-white/80 via-white/50 to-white/20"}`}
        ></div>
      </div>

      {/* Content - Perfectly centered */}
      <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
        {/* Title - Centered */}
        <h3
          className={`text-3xl md:text-4xl font-light mb-4 ${isDark ? "text-white" : "text-black"}`}
        >
          {title}
        </h3>

        {/* Description - Centered and always visible */}
        <p
          className={`text-lg md:text-xl leading-relaxed max-w-md ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
