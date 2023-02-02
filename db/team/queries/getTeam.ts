import { QueryGetTeamArgs } from "../../../generated/graphql";

const getTeam = async (parent, args: QueryGetTeamArgs, context) =>
  await context.prisma.team.findUnique({
    where: {
      id: args.id,
    },
    include: {
      athletes: true,
    },
  });

export default getTeam;
