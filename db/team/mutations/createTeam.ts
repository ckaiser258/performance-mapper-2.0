import { Team } from "@prisma/client";
import { MutationCreateTeamArgs } from "../../../generated/graphql";
import { AppContext } from "../../../types";

const createTeam = async (
  parent,
  args: MutationCreateTeamArgs,
  context: AppContext,
  info
) => {
  const team: Team = await context.prisma.team.create({
    data: {
      name: args.name,
      userId: args.userId,
      athletes: {
        connect: args.athleteIds.map((id) => ({ id })),
      },
    },
    include: {
      athletes: true,
    },
  });
  return team;
};

export default createTeam;
