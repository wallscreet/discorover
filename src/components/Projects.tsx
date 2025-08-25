import Link from 'next/link';

function ProjectsSection() {
  return (
    <div className="rounded-lg h-screen p-4 mt-2 pt-18">
        <div className="flex h-full grid grid-cols-3 grid-rows-4 gap-4">

            <div className="bg-[#2596be] rounded-lg col-start-1 row-start-1 col-span-2 row-span-2">
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
            <div className="bg-[#214469] rounded-lg flex col-start-3 row-start-1 col-span-1 row-span-2 items-center justify-center p-2"> 
              <p className="text-xl text-center text-white">OpenAPI with FRED series and custom aggregated datasets.</p>
            </div>

            <div className="bg-[#214469] rounded-lg flex col-start-1 row-start-3 col-span-1 row-span-2 items-center justify-center p-4"> 
              <p className="text-xl text-center text-white">Aggregating official government data sources into one clear, easy-to-use platform.</p>
            </div>
            <div className="bg-[#2596be] rounded-lg col-start-2 row-start-3  row-span-2 col-span-2">
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

        </div>
    </div>
  )
}
export default ProjectsSection