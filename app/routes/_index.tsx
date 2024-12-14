import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { prisma } from "../utils/prisma.server";
import { useLoaderData, Link } from "@remix-run/react";

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
  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#get-all-records
  const videos = await prisma.video.findMany();
  return { videos };
};

export default function Index() {
  const { videos } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1 className="text-4xl mb-5 font-bold">Welkom in uw videotheek</h1>

      <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        <Link to="/movies/new">Voeg film toe</Link>
      </button>

      <h2 className="mb-5 text-2xl font-bold text-center">
        Films nu in de Videotheek
      </h2>
      <ul className="flex gap-4 flex-wrap justify-center">
        {videos.map((video) => (
          <li
            key={video.id}
            className="flex flex-col justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {video.Title}
            </h3>
            <p>Genre: {video.Genre}</p>
            <p>Release Year: {video.Release_Year}</p>
            <p>{video.Description}</p>
            <button className="inline-flex items-center px-3 py-2 text-sm w-12 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <Link to={`/movies/${video.id}/edit`}>Edit</Link>
            </button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

// inspiration for the styling: https://flowbite.com/docs/components
