import React from "react";
import ReactPlayer from "react-player";
import { Video, Event } from "common";
import { useRef } from "react";
import { useState } from "react";
import { secondsToMinutes } from "./secondsToMinutes";
import { useEffect } from "react";

type VideoPlayerProps = {
  video: Video;
  onFinishEvents: () => void;
};

export const VideoPlayer = ({ video, onFinishEvents }: VideoPlayerProps) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [currentVideo, setCurrentVideo] = useState(video);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lastCurrentEventIndex, setLastCurrentEventIndex] = useState<number>();
  const [hasVideoStartedPlaying, setHasVideoStartedPlaying] = useState(false);

  const currentEventIndex = video.events.findIndex(
    ({ startTimestamp, endTimestamp }) =>
      currentTime >= startTimestamp && currentTime <= endTimestamp
  );

  const currentEvent = video.events[currentEventIndex] as Event | undefined;

  const seekToTime = (time: number): void => {
    if (!videoRef.current) throw new Error("No video ref?");
    videoRef.current.seekTo(time);
    setCurrentTime(time);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (video !== currentVideo) {
      console.log("Video changed to ", video.id);
      setHasVideoStartedPlaying(false);
      setCurrentVideo(video);
      setLastCurrentEventIndex(undefined);
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }

    if (!hasVideoStartedPlaying) {
      console.log("Video is not ready to play so skipping this effect");
      return;
    }

    if (
      currentEventIndex !== undefined &&
      currentEventIndex !== -1 &&
      currentEventIndex !== lastCurrentEventIndex
    ) {
      setLastCurrentEventIndex(currentEventIndex);
      return;
    }

    if (lastCurrentEventIndex === undefined) {
      seekToTime(video.events[0].startTimestamp);
      return;
    }

    if (currentTime > video.events[lastCurrentEventIndex].endTimestamp) {
      console.log("Current time ahead of end time");

      const nextEvent = video.events[lastCurrentEventIndex + 1];

      if (!nextEvent) {
        onFinishEvents();
        return;
      }

      seekToTime(nextEvent.startTimestamp);
      return;
    }

    if (currentTime < video.events[lastCurrentEventIndex].startTimestamp) {
      console.log("Current time before start time");
      const previousEvent = video.events[lastCurrentEventIndex - 1];

      if (!previousEvent) {
        console.log("No previous events");
        return;
      }

      seekToTime(previousEvent.startTimestamp);
      return;
    }
  }, [
    currentEvent,
    currentEventIndex,
    currentTime,
    currentVideo,
    hasVideoStartedPlaying,
    lastCurrentEventIndex,
    onFinishEvents,
    video,
  ]);

  return (
    <div>
      {currentTime ? secondsToMinutes(currentTime) : "Time"}
      <ReactPlayer
        url={video.url}
        controls={true}
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onStart={() => {
          console.log("Media started!");
          setHasVideoStartedPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        playing={isPlaying}
      />
      <div>
        <span>Events</span>
        <ul>
          {video.events.map((event) => (
            <li key={event.id}>
              <button
                onClick={() => {
                  seekToTime(event.startTimestamp);
                  setIsPlaying(true);
                }}
              >
                {event.move.name} at {secondsToMinutes(event.startTimestamp)} -{" "}
                {secondsToMinutes(event.endTimestamp)}
              </button>
              {event === currentEvent && <span>Selected</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
