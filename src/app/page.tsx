import HeroSection from "@/components/Hero";
import ProjectsSection from "@/components/Projects";
import CalcsSection from "@/components/Calcs";
import UsMetrics from "@/components/UsMetrics";

export default function Home() {
  return (
    <div className="gap-4">
      
      <HeroSection/>
      <ProjectsSection/>
      <UsMetrics/>
      <CalcsSection/>
     
    </div>
  );
}

