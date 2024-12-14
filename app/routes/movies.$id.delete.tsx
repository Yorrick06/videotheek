import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id ? parseInt(params.id, 10) : NaN;

  if (isNaN(id)) {
    return redirect("/");
  }

  const prisma = new PrismaClient();

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
