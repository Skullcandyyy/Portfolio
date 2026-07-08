"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStackMarquee from "@/components/TechStackMarquee";
import About from "@/components/About";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import Skills from "@/components/Skills";
import SkillRadar from "@/components/SkillRadar";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SideNav from "@/components/SideNav";
import BootSequence from "@/components/BootSequence";
import SpotlightCursor from "@/components/SpotlightCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [booted, setBooted] = useState(true);

  useEffect(() => {
    const done = sessionStorage.getItem("boot-done") === "1";
    setBooted(done);
  }, []);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <SmoothScroll>
        <SpotlightCursor />
        <FilmGrain />
        <Navbar />
        <SideNav />
        <Hero />
        <TechStackMarquee />
        <About />
        <InteractiveTerminal />
        <Skills />
        <SkillRadar />
        <ArchitectureDiagram />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
        <BackToTop />
      </SmoothScroll>
    </>
  );
}
