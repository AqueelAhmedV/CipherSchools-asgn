import MuxVideo from "@mux/mux-video-react";
import { Suspense, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function VideoPlayer({ playbackId }) {
  const [loaded, setLoaded] = useState(true);
  return (
    <div className="video-player lg:h-[360px] md:h-[270px] sm:h-[180px] p-4">

        <Suspense fallback={<Skeleton width="100%" height="100%"/>}>
        <MuxVideo
          placeholder={`skeleton`}
          playbackId={playbackId}
          controls
          autoPlay
          muted
          loop
          preferPlayback="mse"
        />
        </Suspense>
     
    </div>
  );
}
