import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="flex rounded-lg items-center justify-center h-screen">
      <Image
          src="/ExploreMountain.png"
          alt="Explore Mountain"
          fill                          
          className="object-cover rounded-lg mx-auto p-0"
      />
      {/* <div className="absolute inset-0 flex items-center justify-center pt-72 px-24">
        <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        
          <Link href="#Apps" className="">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center font-bold hover:bg-[#2596be]">
            Apps
            </div>
          </Link>

          <Link href="#About" className="">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center font-bold hover:bg-[#2596be]">
            About Me
            </div>
          </Link>
        
          <Link href="#Contact" className="">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center font-bold hover:bg-[#2596be]">
            Contact
            </div>
          </Link>

        </div>
      </div> */}
    </div>
  )
}

export default HeroSection