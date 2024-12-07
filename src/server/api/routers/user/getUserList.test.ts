import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUserList } from "@/server/api/routers/user/getUserList";
import { type Context } from "@/server/api/routers/types/context";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

// PrismaClientのモック作成
const mockFindMany = vi.fn(); // findManyメソッドをモック化
const mockDb = {
  user: {
    findMany: mockFindMany, // モックを適用
  },
} as unknown as PrismaClient;

const mockHeaders = new Headers({ "Content-Type": "application/json" });
const mockContext: Context = {
  session: null,
  headers: mockHeaders,
  db: mockDb,
};

describe("getUserList", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // すべてのモックをリセット
  });

  afterEach(() => {
    vi.restoreAllMocks(); // モックの状態を元に戻す
  });

  it("正常にユーザーリストを取得できる場合", async () => {
    // モックデータ
    const mockUsers = [
      { id: "1", name: "山田太郎", image: "https://example.com/image1.png" },
      { id: "2", name: "鈴木花子", image: "https://example.com/image2.png" },
    ];

    // モック設定
    mockFindMany.mockResolvedValue(mockUsers);

    // テスト実行
    const result = await getUserList({ ctx: mockContext });

    // 結果の確認
    expect(result).toEqual(mockUsers);
    expect(mockFindMany).toHaveBeenCalledOnce();
    expect(mockFindMany).toHaveBeenCalledWith({
      select: { id: true, name: true, image: true },
      take: 100,
    });
  });

  it("ユーザーリストが空の場合", async () => {
    // モック設定
    mockFindMany.mockResolvedValue([]);

    // テスト実行
    const result = await getUserList({ ctx: mockContext });

    // 結果の確認
    expect(result).toEqual([]);
    expect(mockFindMany).toHaveBeenCalledOnce();
    expect(mockFindMany).toHaveBeenCalledWith({
      select: { id: true, name: true, image: true },
      take: 100,
    });
  });

  it("データベースエラーが発生した場合", async () => {
    // モック設定
    mockFindMany.mockRejectedValue(new Error("データベースエラー"));

    try {
      // テスト実行
      await getUserList({ ctx: mockContext });
    } catch (error) {
      // エラーの確認
      expect(error).toBeInstanceOf(TRPCError);
      expect(error).toMatchObject({
        code: "INTERNAL_SERVER_ERROR",
        message: "ユーザーリストの取得中にエラーが発生しました",
      });
    }

    // 呼び出し確認
    expect(mockFindMany).toHaveBeenCalledOnce();
  });
});
