import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navigation } from "@/components/ui/Navigation";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  );
}
