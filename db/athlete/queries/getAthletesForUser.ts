import { Athlete } from "@prisma/client";
import { QueryGetAthletesForUserArgs } from "../../../generated/graphql";

const getAthletesForUser = async (
  parent,
  args: QueryGetAthletesForUserArgs,
  context
) => {
  const athletes: Athlete[] = await context.prisma.athlete.findMany({
    where: {
      userId: args.userId,
    },
    include: {
      teams: true,
    },
  });
  return athletes || [];
};

export default getAthletesForUser;
