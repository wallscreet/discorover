import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="relative flex rounded-lg items-center justify-center h-screen">
      <Image
          src="/ExploreMountain.png"
          alt="Explore Mountain"
          fill                          
          className="relative object-cover rounded-lg mx-auto p-0"
      />
    </div>
  )
}

export default HeroSection