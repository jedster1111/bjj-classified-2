import React from "react";
import ReactPlayer from "react-player";
import { Video } from "common";
import { useRef } from "react";
import { useState } from "react";

export const VideoPlayer = ({ video }: { video: Video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<ReactPlayer>(null);

  return (
    <div>
      <ReactPlayer
        url={video.url}
        controls={true}
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playing={isPlaying}
      />
      <div>
        <span>Events</span>
        <ul>
          {video.events.map((event) => (
            <li key={event.id}>
              <button
                onClick={() => {
                  videoRef.current?.seekTo(event.timestamp, "seconds");
                  setIsPlaying(true);
                }}
              >
                {event.move.name} at {event.timestamp}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
