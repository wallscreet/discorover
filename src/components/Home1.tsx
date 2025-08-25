import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Home() {
  return (
    <div className="p-6 grid grid-cols-5 gap-4 h-screen bg-[#fefeec]">
      <div className="bg-gray-300 rounded-lg col-span-4 row-span-3">
        <img
          src="/ExploreMountain.png"
          alt="Wide bento image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="bg-[#2596be] rounded-lg">
        <Link href="https://api.discorover.com/docs" className="relative rounded-lg overflow-hidden group">
          <img
            src="/FedChartHero.png"
            alt="Wide bento image"
            className="w-full h-full object-cover rounded-md transition-opacity duration-500 group-hover:opacity-20"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            API Docs
          </span>
        </Link>
      </div>
      
      <div className="bg-[#2596be] rounded-lg row-span-2 col-span-1">
        <Link href="https://gov-feeds.discorover.com" className="relative rounded-lg overflow-hidden group">
          <img
            src="/GovFeedsHero.png"
            alt="Gov Feeds"
            className="w-full h-full object-cover rounded-md transition-opacity duration-500 group-hover:opacity-20"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Gov-Feeds
          </span>
        </Link>
      </div>
      
      <div className="flex items-center justify-center gap-1 sm:gap-4 md:gap-6 bg-[#214469] rounded-lg">
        
        <a href="https://github.com/wallscreet" target="_blank" rel="noopener noreferrer">
          <FaGithub size={32} className="hover:text-[#2596be] transition" />
        </a>
        
        <a href="https://x.com/Wallscreet" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={32} className="hover:text-[#2596be] transition" />
        </a>
      
      </div>

      <div className="bg-[#214469] flex row-span-1 col-span-3 rounded-lg items-center justify-center overflow-hidden">

      </div>

      <div className="bg-[#214469] rounded-lg flex items-center justify-center">
      
      </div>
      
    </div>
  );
}
