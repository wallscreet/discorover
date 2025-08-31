'use client'

import { useState } from 'react';
import { FaXTwitter, FaGithub } from 'react-icons/fa6'; // Twitter (X) + GitHub

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-[100%] bg-[#0c122d] p-2 lg:p-4 border-b border-slate-700 grid grid-cols-12 z-100">
      
      {/* left div */}
      <div className="flex col-start-1 col-span-1 border-r border-slate-700 items-center">
        <div>
          {/* Hamburger Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="relative z-40 p-2 md:px-4 rounded-lg shadow-md text-white hover:text-[#2596be]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen? 'M6 18L18 6M6 6l12 12': 'M4 6h16M4 12h16m-7 6h7'}/>
            </svg>
          </button>

          {/* Drawer */}
          <div
            className={`fixed bg-gradient-to-l from-[#0c122d] to-[#151f4c] top-0 left-0 h-full w-3/4 shadow-xl transform transition-transform duration-300 ease-in-out z-30 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav className="pl-10 space-y-4 pt-22">
              <a href="/" className="block text-white font-bold hover:text-[#2596be]">
                Home
              </a>
              <a href="#apps" className="block text-white font-bold hover:text-[#2596be]">
                Apps
              </a>
              <a href="#calculators" className="block text-white font-bold hover:text-[#2596be]">
                Calcs
              </a>
              <a href="#about" className="block text-white font-bold hover:text-[#2596be]">
                About
              </a>
              <a href="#contact" className="block text-white font-bold hover:text-[#2596be]">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* center div */}
      <div className="flex col-start-3 col-span-8 items-center justify-center border-r border-slate-700 z-40">
        <div className="flex items-center text-white">
          <p className="text-md">The</p>
          <p className="pl-2 text-2xl">DiscoRover</p>
          <p className="pl-2 text-md">Project</p>
        </div>
      </div>

      {/* right div */}
      <div className="flex col-start-11 col-span-2 items-center justify-center">
        <div className="flex space-x-4 text-white">
          <a
            href="https://x.com/Wallscreet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2596be] transition-colors"
          >
            <FaXTwitter size={22} />
          </a>
          <a
            href="https://github.com/wallscreet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2596be] transition-colors"
          >
            <FaGithub size={22} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;