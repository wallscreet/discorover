import Image from "next/image";

export default function Home() {
  return (
    <div className="p-6 grid grid-cols-5 gap-4 h-screen bg-[#fefeec]">
      <div className="bg-gray-300 rounded-lg col-span-4 row-span-3">
        {/* <p>Wide box (spans 2 columns)</p> */}
        <img
          src="/ExploreMountain.png"
          alt="Wide bento image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="bg-[#4bceed] rounded-lg row-span-2 col-span-1">
        <img
          src="/festival2.jpg"
          alt="Wide bento image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="rounded-lg">
        <img
          src="/GovFeedsHero.png"
          alt="Wide bento image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="bg-[#214469] rounded-lg"></div>
      <div className="bg-[#214469] flex rounded-lg col-span-3 items-center justify-center">
        <div className="">
          <p className="text-center text-lg font-bold text-white">EDUCATE. ENCOURAGE. ENGAGE.</p></div>
        </div>
      <div className="bg-[#214469] rounded-lg p-4"></div>
    </div>
  );
}
