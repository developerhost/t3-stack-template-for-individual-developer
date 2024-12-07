import { TRPCError } from "@trpc/server";
import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage";
import { extractPublicId } from "cloudinary-build-url";
import type { Context } from "../types/context";
import { z } from "zod";

export const updateUserInputSchema = z.object({
  name: z.string().min(1).max(50),
  introduction: z.string().max(200).optional(),
  base64Image: z.string().optional(),
});

type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

/**
 * ユーザー情報の更新ロジック
 *
 * @param {Object} params
 * @param {Context} params.ctx - コンテキストオブジェクト
 * @param {UpdateUserInput} params.input - 入力データ
 * @throws {TRPCError} ユーザーが見つからない場合または更新に失敗した場合
 */
export const updateUser = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateUserInput;
}) => {
  const { name, introduction, base64Image } = input;
  const userId = ctx.session?.user?.id;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "ログインしてください",
    });
  }

  let image_url;

  if (base64Image) {
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      select: {
        image: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "ユーザーが見つかりません",
      });
    }

    if (user.image) {
      const publicId = extractPublicId(user.image);
      await deleteCloudImage(publicId);
    }

    image_url = await createCloudImage(base64Image);
  }

  await ctx.db.user.update({
    where: { id: userId },
    data: {
      name,
      introduction,
      ...(image_url && { image: image_url }),
    },
  });
};
