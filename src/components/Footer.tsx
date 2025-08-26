import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FloatingFooter() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-6 bg-white shadow-lg rounded-full px-6 py-2 border border-gray-200">
        <a
          href="https://github.com/wallscreet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-800 hover:text-[#2596be] transition"
        >
          <FaGithub size={28} />
        </a>

        <a
          href="https://x.com/Wallscreet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-800 hover:text-[#2596be] transition"
        >
          <FaXTwitter size={28} />
        </a>
      </div>
    </div>
  );
}
