import { Form } from "@remix-run/react";

export default function AddVideo() {
  return (
    <Form
      method="post"
      className="max-w-lg mx-auto dark:bg-gray-800 p-6 rounded-lg"
    >
      <h1 className="text-2xl mb-5 text-center font-bold dark:text-white ">
        Voeg film toe.
      </h1>
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
        type="submit"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Return
      </button>
    </Form>
  );
}

// inspiration for the styling: https://flowbite.com/docs/components
