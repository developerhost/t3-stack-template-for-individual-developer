"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-[80vh] flex-col justify-between">
      <div className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
        <h4 className="scroll-m-20 text-2xl font-bold tracking-normal">
          サーバー側でエラーが発生しました
        </h4>
        <p className="text-gray-600">{error.message}</p>
        <div className="flex gap-4">
          <Button
            className="rounded-xl px-4 text-black hover:bg-transparent hover:text-white active:scale-90"
            variant={"outline"}
            size={"sm"}
            onClick={() => reset()}
          >
            再試行
          </Button>
          <Button
            asChild
            className="rounded-xl px-4 text-black hover:bg-transparent hover:text-white active:scale-90"
            variant={"outline"}
            size={"sm"}
          >
            <Link href={"/"}>ホームへ戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
