import MuxPlayer from "@mux/mux-player-react/lazy";
import { Suspense, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function VideoPlayer({ playbackId, muted=true, autoPlay=false, loop=false}) {
  const [loaded, setLoaded] = useState(true);
  console.log('render')
  return (
    <div className="video-player lg:h-[360px] md:h-[270px] sm:h-[180px] p-4 mb-4">

        {!loaded?<Skeleton width="100%" height="100%"/>
        :<MuxPlayer
          
          playbackId={playbackId}
          controls
          streamType="on-demand"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preferPlayback="mse"
          height="100%"
          width="100%"
          
        />
  }
     
    </div>
  );
}
