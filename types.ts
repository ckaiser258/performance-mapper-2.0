import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";

export interface AppContext {
  prisma: PrismaClient;
  token: JWT | null;
}
