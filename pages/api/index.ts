import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { getToken, JWT } from "next-auth/jwt";
import fs from "fs";
import path from "path";
import { AppContext } from "../../types";
import getAthletesForUser from "../../db/athlete/queries/getAthletesForUser";
import getAthlete from "../../db/athlete/queries/getAthlete";
import createAthlete from "../../db/athlete/mutations/createAthlete";
import deleteAthlete from "../../db/athlete/mutations/deleteAthlete";
import updateAthlete from "../../db/athlete/mutations/updateAthlete";

const prisma = new PrismaClient();

interface MyContext {
  prisma: PrismaClient;
  token?: JWT;
}

const resolvers = {
  Query: {
    info: () => "This is the API of Performance Mapper 2.0",
    getAthletesForUser,
    getAthlete,
  },
  Mutation: {
    createAthlete,
    deleteAthlete,
    updateAthlete,
  },
  Athlete: {
    user: (parent, args, context: AppContext) => {
      const user = context.prisma.athlete
        .findUnique({
          where: { id: parent.id },
        })
        .user();
      return user;
    },
  },
};

const server = new ApolloServer<MyContext>({
  typeDefs: fs.readFileSync(
    path.join(path.resolve(process.cwd()), "schema.graphql"),
    "utf8"
  ),
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    prisma,
    token: await getToken({
      req,
      secret: process.env.JWT_SECRET,
    }),
  }),
});
