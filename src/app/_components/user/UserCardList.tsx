import React from "react";
import { UserCard } from "./UserCard";
import { type RouterOutputs } from "@/trpc/react";

type UserListProps = {
  users: RouterOutputs["user"]["getUserList"];
};

export type UserProps = RouterOutputs["user"]["getUserList"][number];

export function UserCardList({ users }: UserListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name ?? "名無し"}
          image={user.image ?? "/assets/img/default.png"}
        />
      ))}
    </div>
  );
}

export default UserCardList;
