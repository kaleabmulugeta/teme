// app/components/ServiceCard.tsx
"use client";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface ServiceCardProps {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  reverse?: boolean;
}

function ServiceCard({
  title,
  tagline,
  description,
  features,
  image,
  reverse = false,
}: ServiceCardProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`service-item flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${reverse ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* Tagline with decorative line - Using neutral colors */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-px ${isDark ? "bg-neutral-400" : "bg-neutral-600"}`}
          ></div>
          <span
            className={`text-sm font-semibold tracking-wider uppercase ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
          >
            {tagline}
          </span>
        </div>

        {/* Main Title */}
        <h2
          className={`text-3xl lg:text-4xl xl:text-5xl font-serif font-bold leading-tight ${isDark ? "text-white" : "text-black"}`}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className={`text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
        >
          {description}
        </p>

        {/* Features Section */}
        <div className="service-features mt-6">
          <h3
            className={`text-2xl font-serif font-semibold mb-6 ${isDark ? "text-white" : "text-black"}`}
          >
            What We Offer:
          </h3>

          {/* Grid for features */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="feature-item flex items-start gap-3 group"
              >
                {/* Check icon - Using neutral color */}
                <div
                  className={`mt-1.5 w-2 h-2 rounded-full ${isDark ? "bg-neutral-400" : "bg-neutral-600"}`}
                ></div>
                {/* Feature text */}
                <span
                  className={`text-base ${isDark ? "text-neutral-300" : "text-neutral-700"} group-hover:${isDark ? "text-neutral-100" : "text-black"} transition-colors duration-300`}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button - Using neutral colors */}
        <a
          href="/contact"
          className={`inline-flex items-center gap-2 px-8 py-3 ${isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"} font-semibold rounded-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl mt-8`}
        >
          <span>Get a Service</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>

      {/* Image Content */}
      <div className="w-full lg:w-1/2">
        <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl group">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="object-cover w-full h-[300px] lg:h-[500px] transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
          />

          {/* Gradient overlay - Using neutral colors */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Decorative border effect - Using neutral colors */}
          <div
            className={`absolute inset-0 border-2 border-transparent group-hover:${isDark ? "border-neutral-600/20" : "border-neutral-400/20"} transition-all duration-500 rounded-xl lg:rounded-2xl pointer-events-none`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
