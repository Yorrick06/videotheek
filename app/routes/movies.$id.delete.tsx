import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.id);

  try {
    await prisma.video.delete({
      where: {
        id: id,
      },
    });

    return redirect("/");
  } catch (error) {
    return redirect("/");
  }
};
