import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import CaseStudies from "@/components/CaseStudies";
import Vault from "@/components/Vault";
import Now from "@/components/Now";
import Proof from "@/components/Proof";
import Path from "@/components/Path";
import Contact from "@/components/Contact";
import TweaksPanel from "@/components/TweaksPanel";

export default function Home() {
  return (
    <>
      <Topbar />
      <Nav />
      <Hero />
      <Story />
      <CaseStudies />
      <Vault />
      <Now />
      <Proof />
      <Path />
      <Contact />
      <TweaksPanel />
    </>
  );
}
