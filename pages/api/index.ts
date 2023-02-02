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
import getTeam from "../../db/team/queries/getTeam";
import getTeamsForUser from "../../db/team/queries/getTeamsForUser";
import createTeam from "../../db/team/mutations/createTeam";

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
    getTeam,
    getTeamsForUser,
  },
  Mutation: {
    createAthlete,
    deleteAthlete,
    updateAthlete,
    createTeam,
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
    teams: (parent, args, context: AppContext) => {
      const teams = context.prisma.athlete
        .findUnique({
          where: { id: parent.id },
        })
        .teams();
      return teams;
    },
  },
  Team: {
    user: (parent, args, context: AppContext) => {
      const user = context.prisma.team
        .findUnique({
          where: { id: parent.id },
        })
        .user();
      return user;
    },
    athletes: (parent, args, context: AppContext) => {
      const athletes = context.prisma.team
        .findUnique({
          where: { id: parent.id },
        })
        .athletes();
      return athletes;
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

console.log("Apollo Server is running on http://localhost:3000/api");
