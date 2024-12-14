import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
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
  const prisma = new PrismaClient();
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
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <Link to={`/movies/${video.id}/edit`}>Edit</Link>
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                <Link to={`/movies/${video.id}/delete`}>Remove</Link>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// inspiration for the styling: https://flowbite.com/docs/components
