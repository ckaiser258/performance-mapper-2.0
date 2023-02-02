import { MutationUpdateAthleteArgs } from "../../../generated/graphql";
import { AppContext } from "../../../types";

const updateAthlete = async (
  parent,
  args: MutationUpdateAthleteArgs,
  context: AppContext
) =>
  await context.prisma.athlete.update({
    where: { id: args.id },
    data: {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      picture: args.picture,
      teams: {
        connect: args.teamIds.map((id) => ({ id })),
      },
    },
  });

export default updateAthlete;
