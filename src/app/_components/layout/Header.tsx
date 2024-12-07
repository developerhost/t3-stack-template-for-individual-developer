import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { PersonIcon, ExitIcon, EnterIcon } from "@radix-ui/react-icons";

export default async function Header() {
  const session = await getServerAuthSession();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b-2 bg-black bg-opacity-80 px-4 py-3 text-primary-foreground shadow-sm">
      <Link href="/" className="text-lg font-bold">
        1-infinity
      </Link>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={session.user.image ?? "/assets/img/default.png"}
                alt="User Avatar"
              />
              <AvatarFallback>
                {session.user.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={`/user/${session.user.id}`}>
                <PersonIcon className="mr-2 h-4 w-4" /> プロフィール
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/api/auth/signout">
                <ExitIcon className="mr-2 h-4 w-4" /> ログアウト
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="secondary">
          <Link href="/api/auth/signin">
            <EnterIcon className="mr-2 h-4 w-4" /> ログイン
          </Link>
        </Button>
      )}
    </header>
  );
}
