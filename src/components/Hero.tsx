// import Image from "next/image";
// import Link from "next/link";

// function HeroSection() {
//   return (
//     <div className="relative flex rounded-lg items-center justify-center h-screen">
//       <Image
//           src="/ExploreMountain.png"
//           alt="Explore Mountain"
//           fill                          
//           className="relative object-cover rounded-lg mx-auto p-0"
//       />
//     </div>
//   )
// }

// export default HeroSection
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

      {/* Gradient pinwheel overlay */}
      <div className="absolute inset-0 bg-[conic-gradient(at_center,_#ff7eb3,_#ff758c,_#42a5f5,_#7b42f5,_#ff7eb3)] opacity-40 mix-blend-overlay"></div>

      {/* Frosted glass layer */}
      <div className="absolute inset-0 flex items-center justify-center mt-52 m-12">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2 shadow-lg">
          {/* Text layer */}
          <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-[2px_2px_0_black] text-center">
            Data Intelligence Supported Context Ontology
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;