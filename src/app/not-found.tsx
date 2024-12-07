"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex h-[80vh] flex-col justify-between">
        <div className="flex flex-grow flex-col items-center justify-center gap-4 px-4">
          <h4 className="scroll-m-20 text-2xl font-bold tracking-normal">
            このページは利用できません
          </h4>
          <span className="w-full max-w-[350px] text-center">
            以下の原因が考えられます:
            <ul className="w-full max-w-[350px] list-inside list-disc">
              <li className="ml-20 text-left">リンクが壊れている</li>
              <li className="ml-20 text-left">存在しないページ</li>
              <li className="ml-20 text-left">ページに対する権限がない</li>
              <li className="ml-20 text-left">ページが削除された</li>
            </ul>
          </span>
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
    </>
  );
}
