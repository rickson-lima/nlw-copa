import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/rickson-lima.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-15T12:00:00.275Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-14T21:00:00.275Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 7,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
