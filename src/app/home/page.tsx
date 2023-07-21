"use client";
import * as React from "react";
import { RoomChat } from "@/components";
import { ChatFriendContext } from "@/context";
import { User } from "@/types";

export default function Page() {
  const { chatFriend } = React.useContext(ChatFriendContext);

  return <>{chatFriend && <RoomChat user={chatFriend as User} />}</>;
}
