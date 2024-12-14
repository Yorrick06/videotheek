import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export const loader: LoaderFunction = async ({ params }) => {
  const id = parseInt(params.id);

  const prisma = new PrismaClient();

  try {
    const video = await prisma.video.delete({
      where: {
        id: id,
      },
    });

    redirect("/");
  } catch (error) {
    redirect("/");
  }
};
