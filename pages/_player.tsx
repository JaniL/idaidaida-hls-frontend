import Hls from "hls.js";
import { useEffect, useRef } from "react";

const streamURL = "http://161.35.148.216/idaidaida/stream.m3u8";

function Player() {
  const audioPlayer = useRef<HTMLAudioElement | null>(null);

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
      var hls = new Hls();
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
