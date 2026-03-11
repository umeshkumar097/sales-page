import Image from "next/image";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Services from "@/components/sections/Services";
import WhyChoose from "@/components/sections/WhyChoose";
import CaseStudy from "@/components/sections/CaseStudy";
import Clients from "@/components/sections/Clients";
import Partners from "@/components/sections/Partners";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTAForm from "@/components/sections/CTAForm";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Services />
        <WhyChoose />
        <CaseStudy />
        <Clients />
        <Partners />
        <Process />
        <Testimonials />
        <FAQ />
        <CTAForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
