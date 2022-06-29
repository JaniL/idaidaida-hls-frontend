import "../styles/globals.css";
import "../styles/background.scss";
import "../styles/player.scss";
import type { AppProps } from "next/app";
import Background from "./_background";
import Player from "./_player";
import useSWR from "swr";
import { HelloData } from "./api/hello";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  const { data: stationData, error } = useSWR<HelloData>("/api/hello", fetcher);
  return (
    <Background>
      <>
        <Component {...pageProps} />
        <Player live={stationData ? stationData.live : null} />
      </>
    </Background>
  );
}

export default MyApp;
