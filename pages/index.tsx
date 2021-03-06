import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import styles from "../styles/Home.module.css";
import type { HelloData } from "./api/hello";
import { useStationDataContext } from "../hooks/stationDataContext";

const Home: NextPage = () => {
  const stationData = useStationDataContext();

  if (!stationData) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <h1>hold on</h1>
        </div>
      </div>
    );
  }

  if (stationData.live === null) {
    return <p>offline</p>;
  }

  const image =
    stationData.live.episode_image ?? stationData.live.show_image ?? null;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {image ? (
          <Image
            width={500}
            height={500}
            src={image.url}
            alt={stationData.live.show_title}
          />
        ) : null}
        <h1 className={styles.showTitle}>{stationData.live.show_title}</h1>
        {stationData.next ? (
          <h2>Next up: {stationData.next.show_title}</h2>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
