import { Navigation } from "@/components/ui/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ClientWorkSection } from "@/components/sections/ClientWorkSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative">
        <HeroSection />
        <WorkSection />
        <ClientWorkSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </main>
    </>
  );
}
