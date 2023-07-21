import { User } from "@/types";
import * as React from "react";

export const ChatFriendContext = React.createContext<{
  chatFriend: Partial<User> | null;
  setChatFriend: React.Dispatch<React.SetStateAction<Partial<User> | null>>;
}>({ chatFriend: null, setChatFriend: () => undefined });

interface Props {
  children: React.ReactNode;
}

export const ChatFriendProvider = ({ children }: Props) => {
  const [chatFriend, setChatFriend] = React.useState<Partial<User> | null>(
    null
  );

  return (
    <ChatFriendContext.Provider value={{ chatFriend, setChatFriend }}>
      {children}
    </ChatFriendContext.Provider>
  );
};
