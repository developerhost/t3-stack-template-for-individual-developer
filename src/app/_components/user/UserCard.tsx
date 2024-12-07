import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import type { UserProps } from "./UserCardList";

export function UserCard({ id, name, image }: UserProps) {
  return (
    <Card className="mx-auto w-[200px] bg-white bg-opacity-10 pt-2 shadow-lg hover:bg-gray-900">
      <Link href={`/user/${id}`}>
        <CardContent className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={image ?? "/assets/img/default.png"}
              alt="avatar"
            />
            <AvatarFallback>{name?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-bold text-white">
              {name}
            </CardTitle>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default UserCard;
