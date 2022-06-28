// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

interface TopLevel {
  helsinki: Helsinki;
  tallinn: Tallinn;
}

interface Helsinki {
  live_show: false | PurpleLiveShow;
  next_show: false | NextShowClass;
  video_stream?: string;
}

interface PurpleLiveShow {
  artist: string;
  episode_id: number;
  episode_image?: Image;
  episode_time: EpisodeTime;
  episode_timestamps: EpisodeTime;
  show_image?: ShowImage;
  show_title: string;
  slug: string;
  taxonomies: Taxonomies;
  title: string;
  is_repeat?: boolean;
  subtitle?: string;
}

interface Image {
  ID: number;
  alt: string;
  caption: string;
  description: string;
  height: number;
  sizes: Sizes;
  srcset: boolean | string;
  title: string;
  url: string;
  width: number;
}

interface Sizes {
  "1400px": string;
  "1400px-height": number;
  "1400px-width": number;
  "1536x1536": string;
  "1536x1536-height": number;
  "1536x1536-width": number;
  "1600px"?: string;
  "1600px-height"?: number;
  "1600px-width"?: number;
  "1800px": string;
  "1800px-height": number;
  "1800px-width": number;
  "2000px": string;
  "2000px-height": number;
  "2000px-width": number;
  "2048x2048": string;
  "2048x2048-height": number;
  "2048x2048-width": number;
  "2200px"?: string;
  "2200px-height"?: number;
  "2200px-width"?: number;
  "2400px": string;
  "2400px-height": number;
  "2400px-width": number;
  "2800px": string;
  "2800px-height": number;
  "2800px-width": number;
  "3200px"?: string;
  "3200px-height"?: number;
  "3200px-width"?: number;
  "3500px": string;
  "3500px-height": number;
  "3500px-width": number;
  large: string;
  "large-height": number;
  "large-width": number;
  medium: string;
  "medium-height": number;
  "medium-width": number;
  medium_large: string;
  "medium_large-height": number;
  "medium_large-width": number;
  thumbnail: string;
  "thumbnail-height": number;
  "thumbnail-width": number;
  thumbnail_lqip: string;
  "thumbnail_lqip-height": number;
  "thumbnail_lqip-width": number;
}

interface EpisodeTime {
  episode_end: string;
  episode_start: string;
}

interface ShowImage {
  ID: number;
  alt: string;
  caption: string;
  description: string;
  height: number;
  sizes: Sizes;
  srcset: string;
  title: string;
  url: string;
  width: number;
}

interface Taxonomies {
  channel: Channel[];
  genres?: Channel[];
}

interface Channel {
  name: string;
  slug: string;
}

interface NextShowClass {
  episode_time: EpisodeTime;
  episode_timestamps: EpisodeTime;
  show_title: string;
  slug: string;
  title: string;
  is_repeat?: boolean;
}

interface Tallinn {
  live_show: boolean | FluffyLiveShow;
  next_show: boolean | NextShowClass;
  video_stream?: string;
}

interface FluffyLiveShow {
  artist: string;
  episode_id: number;
  episode_time: EpisodeTime;
  episode_timestamps: EpisodeTime;
  show_image?: Image;
  show_title: string;
  slug: string;
  taxonomies: Taxonomies;
  title: string;
  episode_image?: Image;
  subtitle?: string;
  is_repeat?: boolean;
}

const fetchLive = (): Promise<TopLevel> =>
  fetch("https://admin.idaidaida.net/wp-json/ida/v3/live")
    .then((res) => res.json())
    .then((json) => json as TopLevel);

export type HelloData = {
  live: Exclude<Helsinki["live_show"], false> | null;
  next: Exclude<Helsinki["next_show"], false> | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HelloData>
) {
  const live = await fetchLive();
  const json = {
    live: live.helsinki.live_show === false ? null : live.helsinki.live_show,
    next: live.helsinki.next_show === false ? null : live.helsinki.next_show,
  };
  res.status(200).json(json);
}
