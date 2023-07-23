"use client";

import * as React from "react";
import { SearchUser, UserAvatar } from "@/components";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EmptyChat } from "../empty";
import { socket } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Message } from "@/api";
import { Chat } from "@/types";
import { ProfileDisplay } from "../ProfileDisplay";
import { ChatFriendContext } from "@/context";

const Component = () => {
  const { data: rawChats } = useQuery({
    queryFn: () => Message.getChats(JSON.parse(localStorage.user).id),
    queryKey: ["chats"],
  });

  const { setChatFriend } = React.useContext(ChatFriendContext);

  const [chats, setChats] = React.useState<Chat[]>([]);

  socket.on("message", (val) => {
    setChats(val);
  });

  React.useEffect(() => {
    if (rawChats) setChats(rawChats);
  }, [rawChats]);

  const filteredChats = React.useMemo(() => {
    if (!chats) return [];

    const tempChat: Chat[] = [];

    chats
      .slice()
      .reverse()
      .forEach((chat) => {
        const existPersonChat = tempChat.find(
          (personChat) => personChat.person.id === chat.person.id
        );
        
        if (!existPersonChat) {
          tempChat.push(chat);
        }
      });

    return tempChat;
  }, [chats]);

  return (
    <Container maxWidth="sm" sx={{ boxShadow: 2, py: 2, height: "100vh" }}>
      <Stack gap={2}>
        <Stack direction="row" gap={2} alignItems="center">
          <UserAvatar
            name={
              JSON.parse(localStorage?.user ?? { username: "asddsa asdas" })
                .username
            }
          />
          <Typography fontSize={25} sx={{ color: "text.primary" }}>
            Hello,{" "}
            {JSON.parse(localStorage?.user ?? { username: "Buddy" }).username}!
          </Typography>
        </Stack>

        <SearchUser />

        <Divider />

        {/* chat list */}
        <Typography sx={{ color: "text.primary" }}>Your chats</Typography>

        {filteredChats.length === 0 && <EmptyChat />}

        {filteredChats.map((chat) => (
          <>
            <ProfileDisplay
              user={chat.person}
              message={chat.message}
              boldName
              onClick={() =>
                setChatFriend({
                  id: chat.person.id,
                  username: chat.person.username,
                })
              }
            />
          </>
        ))}
      </Stack>
    </Container>
  );
};

export const Chats = React.memo(Component);
