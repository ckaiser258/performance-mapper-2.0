import { Team } from "@prisma/client";
import { QueryGetTeamsForUserArgs } from "../../../generated/graphql";

const getTeamsForUser = async (
  parent,
  args: QueryGetTeamsForUserArgs,
  context
) => {
  const teams: Team[] = await context.prisma.team.findMany({
    where: {
      userId: args.userId,
    },
    include: {
      athletes: true,
    },
  });
  return teams || [];
};

export default getTeamsForUser;
