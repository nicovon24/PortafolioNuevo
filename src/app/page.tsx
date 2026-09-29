import AboutSection from "@/components/sections/AboutSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TechSection from "@/components/sections/TechSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <TechSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
      </main>
      <Footer />
    </>
  );
}
