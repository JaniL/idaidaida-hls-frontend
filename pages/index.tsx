import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import styles from "../styles/Home.module.css";
import type { HelloData } from "./api/hello";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/hello", fetcher);

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <h1>hold on</h1>
        </div>
      </div>
    );
  }

  const stationData = data as HelloData;

  if (stationData.live === null) {
    return <p>offline</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {stationData.live.episode_image ? (
          <Image
            width={500}
            height={500}
            src={stationData.live.episode_image.url}
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
