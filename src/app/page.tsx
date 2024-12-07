import { HydrateClient } from "@/trpc/server";
import SafeSuspense from "./_components/SafeSuspense";
import Game from "./_components/game/Game";
import GA from "./_components/GA";

export default async function Home() {
  return (
    <HydrateClient>
      <SafeSuspense>
        <h1 className="mb-6 text-2xl font-bold">
          1/2をひたすら当てていき
          <br />
          ベスト記録を目指すシンプルな
          <br />
          ブラウザゲーム
        </h1>
        <Game />
        <GA />
      </SafeSuspense>
    </HydrateClient>
  );
}
