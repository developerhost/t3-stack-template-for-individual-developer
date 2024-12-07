import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateUser } from "@/server/api/routers/user/updateUser";
import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Context } from "@/server/api/routers/types/context";

// 必須: モックを最上部に記述
vi.mock("@/actions/cloudImage", () => ({
  deleteCloudImage: vi.fn(),
  createCloudImage: vi.fn(),
}));

import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage";

describe("updateUser 関数", () => {
  let mockDb: PrismaClient;

  beforeEach(() => {
    // 各テストの前にモックをリセット
    vi.clearAllMocks();

    mockDb = {
      user: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
    } as unknown as PrismaClient;
  });

  it("画像をアップロードせずにユーザー情報を更新できること", async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const mockUpdate = mockDb.user.update as jest.Mock;
    mockUpdate.mockResolvedValue({});

    const ctx: Context = {
      session: {
        user: { id: "user123", name: null, email: null, image: null },
        expires: "",
      },
      headers: new Headers(),
      db: mockDb,
    };

    const input = {
      name: "Updated User",
      introduction: "This is an updated user.",
    };

    await updateUser({ ctx, input });

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "user123" },
      data: {
        name: "Updated User",
        introduction: "This is an updated user.",
      },
    });
  });

  it("画像をアップロードしてユーザー情報を更新できること", async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const mockFindUnique = mockDb.user.findUnique as jest.Mock;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const mockUpdate = mockDb.user.update as jest.Mock;
    const mockDeleteCloudImage = deleteCloudImage as jest.Mock;
    const mockCreateCloudImage = createCloudImage as jest.Mock;

    mockFindUnique.mockResolvedValue({ image: "old_image_url" });
    mockUpdate.mockResolvedValue({});
    mockDeleteCloudImage.mockResolvedValue(undefined);
    mockCreateCloudImage.mockResolvedValue("new_image_url");

    const ctx: Context = {
      session: {
        user: { id: "user123", name: null, email: null, image: null },
        expires: "",
      },
      headers: new Headers(),
      db: mockDb,
    };

    const input = {
      name: "Updated User",
      introduction: "This is an updated user.",
      base64Image: "test_base64_image",
    };

    await updateUser({ ctx, input });

    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: "user123" },
      select: { image: true },
    });

    expect(mockDeleteCloudImage).toHaveBeenCalledWith("old_image_url");
    expect(mockCreateCloudImage).toHaveBeenCalledWith("test_base64_image");

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "user123" },
      data: {
        name: "Updated User",
        introduction: "This is an updated user.",
        image: "new_image_url",
      },
    });
  });

  it("ユーザーが存在しない場合にエラーをスローすること", async () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const mockFindUnique = mockDb.user.findUnique as jest.Mock;
    mockFindUnique.mockResolvedValue(null);

    const ctx: Context = {
      session: {
        user: { id: "user123", name: null, email: null, image: null },
        expires: "",
      },
      headers: new Headers(),
      db: mockDb,
    };

    const input = {
      name: "Updated User",
      introduction: "This is an updated user.",
      base64Image: "test_base64_image",
    };

    await expect(updateUser({ ctx, input })).rejects.toThrow(TRPCError);
    await expect(updateUser({ ctx, input })).rejects.toThrow(
      "ユーザーが見つかりません",
    );
  });
});
