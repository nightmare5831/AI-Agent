import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Background } from "@/components/ui/background";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Aplicamos el fondo que permanecerá fijo y uniforme en toda la página */}
      <Background />
      
      {/* Contenido sin separadores para un flujo visual continuo */}
      <div className="flex flex-col space-y-16 md:space-y-24">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </div>
    </div>
  );
}
