"use client";

import { type RouterOutputs } from "@/trpc/react";
import ImageUploading from "react-images-uploading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PencilIcon } from "lucide-react";
import { useUserEditForm } from "./hooks/useUserEditForm";

type User = RouterOutputs["user"]["getUserById"];

export default function UserEditForm({ user }: { user: User }) {
  const { form, imageUpload, onSubmit, onChangeImage, isPending } =
    useUserEditForm(user);

  return (
    <div>
      <Form {...form}>
        <div>
          <ImageUploading
            value={imageUpload}
            onChange={onChangeImage}
            maxNumber={1}
            acceptType={["jpg", "jpeg", "png"]}
          >
            {({ imageList, onImageUpdate }) => (
              <div className="group flex w-full flex-col items-center justify-center overflow-hidden rounded-full bg-transparent">
                {imageList.map((image, index) => (
                  <div key={index}>
                    {image.dataURL && (
                      <div className="relative h-24 w-24">
                        <Image
                          src={image.dataURL}
                          alt={user.name ?? "avatar"}
                          className="rounded-full object-cover"
                          fill
                          priority
                          quality={80}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div
                          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => onImageUpdate(0)}
                        >
                          <PencilIcon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input placeholder="名前" {...field} max={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自己紹介</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="自己紹介"
                    {...field}
                    rows={10}
                    maxLength={200}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-black"
            variant="outline"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            変更
          </Button>
        </form>
      </Form>
    </div>
  );
}
