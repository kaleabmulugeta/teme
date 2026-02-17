import ServiceHero from "@/components/sections/ServiceHero";
import ServiceData from "@/components/sections/ServiceData";
import Footer from "@/components/layout/Footer";
export default function ServicePage() {
  return (
    <div className="min-h-screen bg-black theme-transition">
      <ServiceHero />
      <ServiceData />
      <Footer />
    </div>
  );
}
