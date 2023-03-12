import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewVideo() {
    const { videoId } = useParams()
    return (<>
        <div className="grid-cols-3">
            <div className=" col-span-2"></div>
        </div>
    </>
    );
}