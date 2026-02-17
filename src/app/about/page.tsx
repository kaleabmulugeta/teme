import AboutStory from "@/components/sections/AboutStory";
import Values from "@/components/sections/Values";
import CeoSection from "@/components/sections/CeoSection";
import Footer from "@/components/layout/Footer";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black theme-transition">
      <AboutStory />
      <Values />
      <CeoSection />
      <Footer />
    </div>
  );
}
