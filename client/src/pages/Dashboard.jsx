import VideoCard from "../components/VideoCard";
import VideoGrid from "../components/VideoGrid";
import VideoPlayer from "../components/VideoPlayer";

export default function Dashboard() {
    return (
        <div className="grid grid-rows-5 w-full">
            <div className="grid-cols-2 xl:grid lg:grid md:grid text-4xl  h-1/2 sm-grid-cols-1 hidden ">
                <div className="flex items-center tagline  px-10">
                <span className="font-righteous font-large uppercase lg:-translate-y-8">Unlimited entertainment at your fingertips, anytime, anywhere.</span>
                </div>
                <div className="">
                    <VideoPlayer playbackId='6jZR9zue004CpGrZUYr3LOEGLLYI0002Lw7RcWQWNQjL4Q'/>
                </div>
            </div>
            <div className=" sm:row-span-5">
                <VideoGrid/>
            </div>
        </div>
    );    
} 