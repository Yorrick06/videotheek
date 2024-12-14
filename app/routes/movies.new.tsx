import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData, Link } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { prisma } from "../utils/prisma.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const title = String(formData.get("Title"));
  const genre = String(formData.get("Genre"));
  const release_year = formData.get("Release_Year");
  const description = String(formData.get("Description"));

  if (!title || !genre || !release_year || !description) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const releaseYearInt = parseInt(release_year);
  const currentYear = new Date().getFullYear();

  if (releaseYearInt < 1900 || releaseYearInt > currentYear) {
    return json(
      { error: "Release year must be between 1900 and " + currentYear },
      { status: 400 }
    );
  }

  try {
    // https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
    const newVideo = await prisma.video.create({
      data: {
        Title: title,
        Genre: genre,
        Release_Year: releaseYearInt,
        Description: description,
      },
    });

    return redirect("/");
  } catch (error) {
    return json(
      { error: "Something went wrong. Please try again." + error },
      { status: 400 }
    );
  }
}

export default function AddVideo() {
  const actionData = useActionData();
  const errorMessage = actionData?.error;

  return (
    <Form
      method="post"
      className="max-w-lg mx-auto dark:bg-gray-800 p-6 rounded-lg"
      action="/movies/new"
    >
      <h1 className="text-2xl mb-5 text-center font-bold dark:text-white ">
        Voeg film toe.
      </h1>
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4 text-center">
          {errorMessage}
        </div>
      )}
      <div className="mb-5">
        <label htmlFor="title" className="block mb-2 text-md dark:text-white">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="Title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="genre" className="block mb-2 text-md dark:text-white">
          Genre
        </label>
        <input
          id="genre"
          type="text"
          name="Genre"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="release_year"
          className="block mb-2 text-md dark:text-white"
        >
          Uitgave jaar
        </label>
        <input
          id="release_year"
          type="text"
          name="Release_Year"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-md dark:text-white"
        >
          Omschrijving
        </label>
        <textarea
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Geef een beschrijving..."
          name="Description"
        ></textarea>
      </div>
      <button
        name="add-video"
        type="submit"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Add video
      </button>
      <button
        name="return"
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        <Link to="/">Return</Link>
      </button>
    </Form>
  );
}

// inspiration for the styling: https://flowbite.com/docs/components