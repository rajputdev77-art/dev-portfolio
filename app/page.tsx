import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
import CaseStudies from "@/components/CaseStudies";
import Thinking from "@/components/Thinking";
import Path from "@/components/Path";
import Speaking from "@/components/Speaking";
import Contact from "@/components/Contact";
import TweaksPanel from "@/components/TweaksPanel";

export default function Home() {
  return (
    <>
      <Topbar />
      <Nav />
      <Hero />
      <Manifest />
      <CaseStudies />
      <Thinking />
      <Path />
      <Speaking />
      <Contact />
      <TweaksPanel />
    </>
  );
}
