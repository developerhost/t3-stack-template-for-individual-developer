import { type PrismaClient } from "@prisma/client";
import { type Session } from "next-auth";

type PartialSession = Omit<Session, "expires"> & { expires?: string };

export type Context = {
  session: PartialSession | null;
  headers: Headers;
  db: PrismaClient<
    {
      log: ("warn" | "error")[];
    },
    never
  >;
};
