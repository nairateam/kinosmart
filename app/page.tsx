import Contact from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";
import OurServices from "@/components/sections/services";
import TrustedBy from "@/components/sections/trusted";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#fffdf8]">
      <HeroSection />
      <TrustedBy />
      <OurServices />
      <Contact />
    </div>
  );
}
