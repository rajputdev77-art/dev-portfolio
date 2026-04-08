import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import HowIThink from "@/components/HowIThink";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SpeakingSection from "@/components/SpeakingSection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <CaseStudyGrid />
      <HowIThink />
      <ExperienceTimeline />
      <SpeakingSection />
      <Contact />
    </main>
  );
}
