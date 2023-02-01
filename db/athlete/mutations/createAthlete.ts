import { Athlete } from "@prisma/client";
import { MutationCreateAthleteArgs } from "../../../generated/graphql";

const createAthlete = async (
  parent,
  args: MutationCreateAthleteArgs,
  context,
  info
) => {
  const athlete: Athlete = await context.prisma.athlete.create({
    data: {
      userId: args.userId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      picture: args.picture,
    },
  });
  return athlete;
};
export default createAthlete;
