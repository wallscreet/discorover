import HeroSection from "@/components/Hero";
import ProjectsSection from "@/components/Projects";
import UsMetrics from "@/components/UsMetrics";

export default function Home() {
  return (
    <div className="gap-4">
      
      <HeroSection/>
      <UsMetrics/>
      <ProjectsSection/>
      
    </div>
  );
}

