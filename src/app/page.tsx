import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


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
        <Link href="https://api.discorover.com" className="relative rounded-lg overflow-hidden group">
          <img
            src="/FedChartHero.png"
            alt="Wide bento image"
            className="w-full h-full object-cover rounded-md transition-opacity duration-500 group-hover:opacity-20"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            API Explorer
          </span>
        </Link>
      </div>
      
      <div className="bg-[#4bceed] rounded-lg">
        <Link href="https://gov-feeds.discorover.com" className="relative rounded-lg overflow-hidden group">
          <img
            src="/GovFeedsHero.png"
            alt="Wide bento image"
            className="w-full h-full object-cover rounded-md transition-opacity duration-500 group-hover:opacity-20"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Gov-Feeds
          </span>
        </Link>
      </div>
      
      <div className="flex items-center justify-center gap-2 sm:gap-4 bg-[#214469] rounded-lg">
        
        <a href="https://github.com/wallscreet" target="_blank" rel="noopener noreferrer">
          <FaGithub size={32} className="hover:text-gray-600 transition" />
        </a>
        
        <a href="https://x.com/Wallscreet" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={32} className="hover:text-gray-600 transition" />
        </a>
      
      </div>

      <div className="flex bg-[#214469] items-center justify-center rounded-lg col-span-3">
        <div className="">
          <p className="text-center text-lg font-bold text-white">EDUCATE. ENCOURAGE. ENGAGE.</p></div>
        </div>
      <div className="bg-[#214469] rounded-lg p-4"></div>
    </div>
  );
}
