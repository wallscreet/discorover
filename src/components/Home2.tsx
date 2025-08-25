"use client";
import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="p-4 grid grid-cols-5 gap-4 h-screen bg-[#ffffec]">
      
      <div className="bg-[#ffffec] rounded-lg col-span-4 row-span-3 flex items-center justify-center">
        {showChat ? (
          // Chat placeholder
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#ffffec] rounded-md">
            <p className="font-bold text-lg">Chat Client</p>
            <div className="flex-1 w-full border rounded-md p-2 overflow-y-auto bg-[#ffffec]">
              <p className="text-sm text-slate-800">[Message history here]</p>
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border mt-2 p-2 rounded-md"
            />
          </div>
        ) : (
          <img
            src="/ExploreMountain.png"
            alt="Wide bento image"
            className="w-full h-full object-cover rounded-md"
          />
        )}
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
          <FaGithub size={32} className="hover:text-[#2596be] transition" />
        </a>

        <a href="https://x.com/Wallscreet" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={32} className="hover:text-[#2596be] transition" />
        </a>
      </div>

      <div className="flex bg-[#214469] items-center justify-center rounded-lg col-span-3">
        <p className="text-center text-lg font-bold text-white">EDUCATE. ENCOURAGE. ENGAGE.</p>
      </div>

      <div className="bg-[#214469] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#2596be] transition" onClick={() => setShowChat(!showChat)}>
        <span className="text-white font-bold">
          {showChat ? "Close Chat" : "Open Chat"}
        </span>
      </div>
    </div>
  );
}
