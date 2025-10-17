import { EnhancedHeroSection } from "@/components/home/enhanced-hero-section";
import { StatsBanner } from "@/components/home/stats-banner";
import { AgentsShowcaseSection } from "@/components/home/agents-showcase-section";
import { WhatsAppSection } from "@/components/home/whatsapp-section";
import { FeaturesSection } from "@/components/home/features-section";
import { PricingSection } from "@/components/home/pricing-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FloatingWhatsAppButton } from "@/components/home/floating-whatsapp-button";
import { Background } from "@/components/ui/background";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <Background />

      <div className="flex flex-col">
        <EnhancedHeroSection />
        <StatsBanner />
        <div className="space-y-16 md:space-y-24">
          <AgentsShowcaseSection />
          <WhatsAppSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
