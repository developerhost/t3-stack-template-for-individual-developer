import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { getUserById } from "./user/getUserById";
import { getUserList } from "./user/getUserList";
import { updateUser, updateUserInputSchema } from "./user/updateUser";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(getUserById),

  getUserList: publicProcedure.query(getUserList),

  updateUser: protectedProcedure
    .input(updateUserInputSchema)
    .mutation(updateUser),
});
