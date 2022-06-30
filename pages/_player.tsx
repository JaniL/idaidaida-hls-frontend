import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { HelloData } from "./api/hello";

const streamURL = "http://161.35.148.216/idaidaida/stream.m3u8";

const convertImagesToArtwork = (
  show: NonNullable<NonNullable<HelloData["live"]>>
): MediaImage[] => {
  const images = show.episode_image
    ? show.episode_image.sizes
    : show.show_image
    ? show.show_image.sizes
    : null;
  if (!images) {
    return [];
  }
  return Object.entries(images)
    .filter(
      ([k, v]) => !k.includes("px") && k.includes("x") && typeof v === "string"
    )
    .map(([k, v]) => ({ sizes: k, src: v }));
};

function Player({ live }: { live: HelloData["live"] | null }) {
  const audioPlayer = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log("got new live data");
    if ("mediaSession" in navigator && live) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: live.title,
        artist: live.artist,
        album: live.show_title,
        artwork: live.show_image ? convertImagesToArtwork(live) : undefined,
      });
    }
  }, [live]);

  useEffect(() => {
    if (audioPlayer === null) {
      console.log("not found 1");
      return;
    }
    if (audioPlayer.current === null) {
      console.log("not found 2");
      return;
    }
    if (Hls.isSupported()) {
      console.log("hls.js supported, attaching");
      var hls = new Hls({ liveDurationInfinity: true });
      hls.loadSource(streamURL);
      hls.attachMedia(audioPlayer.current);
    } else if (
      audioPlayer.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      console.log("using browser support");
      audioPlayer.current.src = streamURL;
    }
  }, [audioPlayer]);

  return (
    <div className={"player"}>
      <audio ref={audioPlayer} preload="none" controls />
    </div>
  );
}

export default Player;
