import Image from "next/image";

function HeroSection() {
  return (
    <div className="relative flex items-center justify-center h-screen rounded-lg overflow-hidden">
      {/* Background image */}
      <Image
        src="/ExploreMountain.png"
        alt="Explore Mountain"
        fill
        className="object-cover"
      />

      {/* Frosted glass layer */}
      <div className="absolute inset-0 flex items-center justify-center mt-64 m-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 shadow-lg">
          {/* Text layer */}
          <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-[2px_2px_0_black] text-center">
            Data Intelligence Supported COntext
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;