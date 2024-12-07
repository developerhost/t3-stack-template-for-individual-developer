import { TRPCError } from "@trpc/server";
import type { Context } from "../types/context";

/**
 * ユーザーリストを取得する
 *
 * @param {Object} params
 * @param {Context} params.ctx - コンテキストオブジェクト
 * @returns {Promise<Array<{ id: string, name: string, image: string }>>} ユーザーのリストを含むプロミス。件数が100件を超える場合は最初の100件のみを返す
 * @throws {TRPCError} ユーザーリストが見つからない場合、または取得中にエラーが発生した場合にエラーをスロー
 */
export const getUserList = async ({ ctx }: { ctx: Context }) => {
  try {
    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      take: 100,
    });

    if (!users) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "ユーザーリストが見つかりません",
      });
    }

    return users;
  } catch (error) {
    console.error("getUserList error:", error);

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "ユーザーリストの取得中にエラーが発生しました",
    });
  }
};
