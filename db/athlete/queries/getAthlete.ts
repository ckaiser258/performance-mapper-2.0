import { QueryGetAthleteArgs } from "../../../generated/graphql";

const getAthlete = async (parent, args: QueryGetAthleteArgs, context) =>
  await context.prisma.athlete.findUnique({
    where: {
      id: args.id,
    },
  });

export default getAthlete;
