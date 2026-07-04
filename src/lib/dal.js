import "server-only";
import { verifySession } from "./session";
import { prisma } from "./prisma";
import { cache } from "react";

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session.isAuth) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        // Exclude password for security
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
});
