import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { Context } from "../types/context";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserByIdInput = z.object({ id: z.string() });
type GetUserByIdInput = z.infer<typeof getUserByIdInput>;

/**
 * 指定されたIDに基づいてユーザー情報を取得
 *
 * @param {Object} params
 * @param {Context} params.ctx - コンテキストオブジェクト
 * @param {GetUserByIdInput} params.input - ユーザーIDを含む入力オブジェクト
 * @returns {Promise<Object>}
 * @throws {TRPCError} ユーザーが見つからない場合にエラーをスロー
 */
export const getUserById = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: GetUserByIdInput;
}) => {
  const user = await ctx.db.user.findUnique({
    where: { id: input.id },
    select: {
      id: true,
      name: true,
      image: true,
      introduction: true,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }
  return user;
};
