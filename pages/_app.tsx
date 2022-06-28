import "../styles/globals.css";
import "../styles/background.scss";
import "../styles/player.scss";
import type { AppProps } from "next/app";
import Background from "./_background";
import Player from "./_player";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Background>
      <>
        <Component {...pageProps} />
        <Player />
      </>
    </Background>
  );
}

export default MyApp;
