import React from "react";
import { useState } from "react";
import { movesApi } from "../../api/movesApi";
import { useFetch } from "../../hooks/useFetch";
import { VideoPlayer } from "./VideoPlayer";

export const VideosList = ({ moveId }: { moveId: string }) => {
  const {
    data: videos,
    error: videosError,
    isLoading: isVideosLoading,
  } = useFetch(() => movesApi.fetchMoveVideos(moveId), [moveId]);

  const [videoNumber, setVideoNumber] = useState(0);

  if (isVideosLoading) return <div>Loading...</div>;
  if (videosError || !videos) return <div>Unable to load videos.</div>;
  if (videos.length === 0) return <div>No videos found for move.</div>;

  const currentlySelectedVideo = videos[videoNumber];

  if (!currentlySelectedVideo) throw new Error("There's no selected video?");

  return (
    <div>
      <div>Videos</div>
      <div>
        Video {videoNumber + 1} out of {videos.length}
      </div>
      <div>
        <button
          onClick={() => setVideoNumber((prevValue) => prevValue - 1)}
          disabled={videoNumber <= 0}
        >
          Previous
        </button>
        <button
          onClick={() => setVideoNumber((prevValue) => prevValue + 1)}
          disabled={videoNumber >= videos.length - 1}
        >
          Next
        </button>
      </div>
      <div>
        <VideoPlayer
          video={currentlySelectedVideo}
          onFinishEvents={() => setVideoNumber((prevValue) => prevValue + 1)}
        />
      </div>
    </div>
  );
};
