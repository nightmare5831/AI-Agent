import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Background } from "@/components/ui/background";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <Background />
      
      <div className="flex flex-col space-y-16 md:space-y-24">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </div>
    </div>
  );
}
