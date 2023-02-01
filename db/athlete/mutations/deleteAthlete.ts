import { Athlete } from "@prisma/client";
import { MutationDeleteAthleteArgs } from "../../../generated/graphql";

const deleteAthlete = (
  parent,
  args: MutationDeleteAthleteArgs,
  context
): Athlete =>
  context.prisma.athlete.delete({
    where: {
      id: args.id,
    },
  });

export default deleteAthlete;
