import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { prisma } from "../utils/prisma.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Videotheek" },
    { name: "description", content: "Videotheek" },
  ];
};

type Video = {
  id: number;
  Title: string;
  Genre: string;
  Release_Year: number;
  Description: string;
};

type LoaderData = {
  videos: Video[];
};

export const loader: LoaderFunction = async () => {
  const videos = await prisma.video.findMany();
  return { videos };
};


export default function Index() {
  const { videos } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>Welkom in uw videotheek</h1>

      <button>Voeg film toe</button>

      <h2>Films in de Videotheek</h2>
      <ul className="flex gap-4">
        {videos.map((video) => (
          <li key={video.id}>
            <h3>{video.Title}</h3>
            <p>Genre: {video.Genre}</p>
            <p>Release Year: {video.Release_Year}</p>
            <p>{video.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


