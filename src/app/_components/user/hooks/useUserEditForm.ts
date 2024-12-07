import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api, type RouterOutputs } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { type ImageListType } from "react-images-uploading";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }).max(50, {
    message: "名前は50文字以内です",
  }),
  introduction: z
    .string()
    .max(200, { message: "自己紹介は200文字以内です" })
    .optional(),
});

type InputType = z.infer<typeof schema>;
type User = RouterOutputs["user"]["getUserById"];

export const useUserEditForm = (user: User) => {
  const router = useRouter();
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: user.image ?? "/assets/img/default.png",
    },
  ]);

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name ?? "名無し",
      introduction: user.introduction ?? "",
    },
  });

  const { mutate: updateUser, isPending } = api.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success("ユーザー情報を更新しました");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<InputType> = (data) => {
    let base64Image;

    if (imageUpload[0]?.dataURL?.startsWith("data:image")) {
      base64Image = imageUpload[0].dataURL;
    }
    updateUser({
      name: data.name,
      introduction: data.introduction,
      base64Image,
    });
  };

  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file;
    const maxFileSize = 5 * 1024 * 1024;

    if (file && file.size > maxFileSize) {
      toast.error("5MB以下の画像を選択してください");
      return;
    }

    setImageUpload(imageList);
  };

  return {
    form,
    imageUpload,
    onSubmit,
    onChangeImage,
    isPending,
  };
};
