import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { useLoaderData, Link, Form, useSubmit } from "@remix-run/react";
import { useState } from "react";

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
  q: string;
  page: number;
  cursor: number;
  cursorUrl: number;
  nextPage: number;
};

const prisma = new PrismaClient();

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  let firstDate = url.searchParams.get("firstDate") || "1900";
  let secondDate = url.searchParams.get("secondDate") || "2024";
  let cursorUrl = Number(url.searchParams.get("cursor")) || 0;

  const page = url.searchParams.get("page") || null;

  const direction = url.searchParams.get("direction") || null;

  let takeAmount = 10;

  // https://www.prisma.io/docs/orm/prisma-client/queries/pagination#example-paging-backwards-with-cursor-based-pagination
  if (direction == "forwards") {
    takeAmount = 10;
  } else if (direction == "backwards") {
    takeAmount = -10;
  }

  let error = null;

  if (firstDate > secondDate) {
    [firstDate, secondDate] = [secondDate, firstDate];
    error = "De datums waren omgewisseld. Deze zijn automatisch gecorrigeerd.";
  }

  const query = {
    take: takeAmount,
    where: {
      Title: {
        contains: q,
      },
      Release_Year: {
        gte: parseInt(firstDate),
        lte: parseInt(secondDate),
      },
    },
  };

  // https://www.prisma.io/docs/orm/prisma-client/queries/pagination#cursor-based-pagination
  if (page) {
    query.cursor = {
      id: cursorUrl,
    };
    query.skip = 1;
  }

  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#get-all-records
  const videos = await prisma.video.findMany(query);

  let cursor = null;

  // Pak 10 video's en gebruik hiervan het laatste id wat gevonden is.
  const countMax = Math.min(videos.length - 1, 9);
  const lastVideo = videos[countMax];
  cursor = lastVideo.id;

  if (direction === "backwards") {
    cursorUrl = cursor - 10;
  }

  let nextPage = 1;

  const nextVideo = await prisma.video.findUnique({
    where: { id: cursor + 1 },
  });

  if (!nextVideo) {
    nextPage = 0;
  }

  return { videos, q, error, page, cursor, cursorUrl, nextPage };
};

type ActionData = {
  videos: Video[];
  error?: string;
};

export default function Index() {
  const { videos, q, page, cursor, cursorUrl, nextPage } =
    useLoaderData<LoaderData>();
  const submit = useSubmit();

  console.log("Currunt cursor: " + cursor + ". Cursor from url: " + cursorUrl);
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    firstDate: currentYear - 1,
    secondDate: currentYear,
  });

  const actionData = useLoaderData<ActionData>();
  const errorMessage = actionData?.error;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="mb-4">
          <h1 className="text-4xl mb-5 font-bold">Welkom in uw videotheek</h1>

          <Link
            to="/movies/new"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Voeg film toe
          </Link>
        </div>

        <div>
          <h2 className="mb-5 text-2xl font-bold text-center">
            Films nu in de Videotheek
          </h2>

          {errorMessage && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <Form
              id="search-form"
              role="search"
              className="w-full md:max-w-sm mx-auto"
            >
              <input
                aria-label="Search contacts"
                defaultValue={q || ""}
                id="q"
                name="q"
                placeholder="Search"
                type="search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                onChange={(event) => {
                  const isFirstSearch = q === null;
                  submit(event.currentTarget, {
                    replace: !isFirstSearch,
                  });
                }}
              />

              <div className="max-w-lg mx-auto flex gap-2 items-center">
                <input
                  type="number"
                  min="1900"
                  max={currentYear}
                  value={formData.firstDate}
                  name="firstDate"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  type="number"
                  min="1900"
                  max={currentYear}
                  value={formData.secondDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="secondDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm py-2.5 px-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Filter
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className="w-full mt-5 md:mt-0 md:w-1/5">
          <Link
            to={
              Number(nextPage) === 0
                ? "/"
                : `/?page=${
                    Number(page || "0") + 1
                  }&cursor=${cursor}&direction=forwards`
            }
            className={
              Number(nextPage) === 0
                ? "bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-400 font-bold rounded-lg text-sm py-2.5 px-5 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-900 text-gray-400 hover:text-gray-400 pointer-events-none mb-3"
                : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm py-2.5 px-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-3"
            }
          >
            Volgende pagina
          </Link>
          <br></br>
          <br></br>
          <Link
            to={
              Number(page) > 1
                ? `/?page=${Number(page) - 1}&cursor=${
                    cursorUrl + 1
                  }&direction=backwards`
                : "/"
            }
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm py-2.5 px-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Pagina terug
          </Link>
        </div>
      </div>

      <br></br>
      <hr></hr>
      <br></br>

      <ul className="flex gap-4 flex-wrap justify-center">
        {videos.map((video) => (
          <li
            key={video.id}
            className="flex flex-col justify-between w-full sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {video.Title}
            </h3>
            <p>Genre: {video.Genre}</p>
            <p>Release Year: {video.Release_Year}</p>
            <p className="mb-3 truncate">{video.Description}</p>
            <div>
              <Link
                to={`/movies/${video.id}/edit`}
                className="text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button"
              >
                Edit
              </Link>
              <Link
                to={`/movies/${video.id}/delete`}
                className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                type="button"
              >
                Remove
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// inspiration for the styling: https://flowbite.com/docs/components
