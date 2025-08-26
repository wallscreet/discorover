import HeroSection from "@/components/Hero";
import ProjectsSection from "@/components/Projects";
import CalcsSection from "@/components/Calcs";

export default function Home() {
  return (
    <div className="gap-4">
      <HeroSection/>
      <ProjectsSection/>
      <CalcsSection/>
    </div>
  );
}

