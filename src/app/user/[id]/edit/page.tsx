import * as React from "react";

import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserEditForm from "@/app/_components/user/UserEditForm";

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const session = await getServerAuthSession();
  const user = await api.user.getUserById({ id: params.id });
  const isOwner = session?.user.id === user.id;

  if (!user || !isOwner) {
    return notFound();
  }

  return (
    <>
      <div className="mb-4 text-center">
        <Button asChild variant="secondary" className="font-bold">
          <Link href={`/user/${user.id}`}>プロフィールへ</Link>
        </Button>
      </div>
      <UserEditForm user={user} />
    </>
  );
}
