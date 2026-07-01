import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import NightShift from "@/components/NightShift";
import Story from "@/components/Story";
import CaseStudiesView from "@/components/CaseStudies";
import Vault from "@/components/Vault";
import Now from "@/components/Now";
import Path from "@/components/Path";
import Contact from "@/components/Contact";
import ClocksBar from "@/components/ClocksBar";
import BuildEasterEgg from "@/components/BuildEasterEgg";
import SectionTracker from "@/components/SectionTracker";
import ModeToggle from "@/components/ModeToggle";
import ReferrerBanner from "@/components/ReferrerBanner";
import { getCaseStudies } from "@/lib/markdown";

export default function Home() {
  const studies = getCaseStudies();

  return (
    <>
      <Topbar />
      <Nav />
      <ReferrerBanner />
      <Hero />
      <NightShift />
      <Story />
      <CaseStudiesView studies={studies} />
      <Vault />
      <Now />
      <Path />
      <Contact />
      <ClocksBar />
      <BuildEasterEgg />
      <SectionTracker />
      <ModeToggle />
    </>
  );
}
