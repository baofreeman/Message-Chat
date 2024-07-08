"use server";

import prisma from "../libs/prismadb";

const getMessages = async (conversationId: string, page: number) => {
  const limit = -8;
  const skip = (page - 1) * limit;
  // const skip = 12;
  console.log("skipppppppppppp", skip);
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      skip: skip,
      take: limit,
      include: {
        seen: true,
        sender: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessages;
