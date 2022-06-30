import "../styles/globals.css";
import "../styles/background.scss";
import "../styles/player.scss";
import type { AppProps } from "next/app";
import Background from "./_background";
import Player from "./_player";
import useSWR from "swr";
import { HelloData } from "./api/hello";
import StationDataContext from "./_stationDataContext";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  const { data: stationData, error } = useSWR<HelloData>(
    "/api/hello",
    fetcher,
    {
      refreshWhenHidden: true,
      refreshInterval: (data) => {
        if (data && data.next) {
          const nextEpisodeStart =
            Number(data.next.episode_timestamps.episode_start) * 1000;
          const currentTime = +new Date();
          if (currentTime >= nextEpisodeStart) {
            console.info(
              "possibly fetched outdated info, retrying in a moment..."
            );
            return 5000;
          }
          const millisecondsToNextShow = nextEpisodeStart - currentTime + 3000;
          console.info(
            `fetching data again in ${millisecondsToNextShow / 1000} seconds...`
          );
          return millisecondsToNextShow;
        }
        return 1000 * 60 * 5;
      },
    }
  );
  return (
    <Background>
      <StationDataContext.Provider value={stationData ?? null}>
        <Component {...pageProps} />
        <Player live={stationData ? stationData.live : null} />
      </StationDataContext.Provider>
    </Background>
  );
}

export default MyApp;
