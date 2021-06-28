import React from "react";
import { movesApi } from "../../api/movesApi";
import { useFetch } from "../../hooks/useFetch";
import { VideoPlayer } from "./VideoPlayer";

export const VideosList = ({ moveId }: { moveId: string }) => {
  const {
    data: videos,
    error: videosError,
    isLoading: isVideosLoading,
  } = useFetch(() => movesApi.fetchMoveVideos(moveId), [moveId]);

  if (isVideosLoading) return <div>Loading...</div>;
  if (videosError || !videos) return <div>Unable to load videos.</div>;
  if (videos.length === 0) return <div>No videos found for move.</div>;

  return (
    <div>
      <span>Videos</span>
      <ul>
        {videos.map((video) => {
          return (
            <li key={video.id}>
              <VideoPlayer video={video} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
