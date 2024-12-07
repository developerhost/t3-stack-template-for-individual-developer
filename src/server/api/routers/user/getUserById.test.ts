import { describe, it, expect, vi } from "vitest";
import { getUserById } from "@/server/api/routers/user/getUserById";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Context } from "@/server/api/routers/types/context";

describe("getUserById 関数", () => {
  it("存在するユーザーIDを渡した場合、ユーザー情報を取得できること", async () => {
    // モックの Prisma クライアント
    const mockFindUnique = vi.fn().mockResolvedValue({
      id: "user123",
      name: "Test User",
      image: "test_image_url",
      introduction: "Hello, this is a test user.",
    });

    const mockDb = {
      user: {
        findUnique: mockFindUnique,
      },
    } as unknown as PrismaClient;

    const mockHeaders = new Headers({ "Content-Type": "application/json" });

    const ctx: Context = {
      session: null,
      headers: mockHeaders,
      db: mockDb,
    };

    const input = { id: "user123" };

    const result = await getUserById({ ctx, input });

    expect(result).toEqual({
      id: "user123",
      name: "Test User",
      image: "test_image_url",
      introduction: "Hello, this is a test user.",
    });

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: "user123" },
      select: { id: true, name: true, image: true, introduction: true },
    });
  });

  it("存在しないユーザーIDを渡した場合、エラーが発生すること", async () => {
    // モックの Prisma クライアント
    const mockFindUnique = vi.fn().mockResolvedValue(null);

    const mockDb = {
      user: {
        findUnique: mockFindUnique,
      },
    } as unknown as PrismaClient;

    const mockHeaders = new Headers({ "Content-Type": "application/json" });

    const ctx: Context = {
      session: null,
      headers: mockHeaders,
      db: mockDb,
    };

    const input = { id: "non existent user" };

    await expect(getUserById({ ctx, input })).rejects.toThrow(TRPCError);
    await expect(getUserById({ ctx, input })).rejects.toThrow("User not found");

    // 呼び出し引数の確認
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: "non existent user" },
      select: { id: true, name: true, image: true, introduction: true },
    });
  });
});
