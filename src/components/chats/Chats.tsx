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
import { Chat, User } from "@/types";
import { ProfileDisplay } from "../ProfileDisplay";
import { ChatFriendContext } from "@/context";

const Component = () => {
  const [userLoggedin, setUserLoggedin] = React.useState<User>();

  if (typeof window !== "undefined") {
    setUserLoggedin(JSON.parse(localStorage.user));
  }

  const { data: rawChats } = useQuery({
    queryFn: () =>
      userLoggedin ? Message.getChats(userLoggedin.id) : undefined,
    queryKey: ["chats", userLoggedin],
  });

  const { chatFriend, setChatFriend } = React.useContext(ChatFriendContext);

  const [chats, setChats] = React.useState<Chat[]>([]);

  socket.on("message", (val) => {
    setChats(val);
  });

  React.useEffect(() => {
    if (rawChats) setChats(rawChats);
  }, [rawChats]);

  const filteredChats = React.useMemo(() => {
    if (!chats || !userLoggedin) return [];

    const tempChat: Chat[] = [];

    chats
      .slice()
      .reverse()
      .forEach((chat) => {
        const existPersonChat = tempChat.find(
          (personChat) =>
            personChat.person.id === chat.person.id &&
            (personChat.receiver.id === userLoggedin.id ||
              personChat.sender.id === userLoggedin.id)
        );

        if (!existPersonChat) {
          tempChat.push(chat);
        }
      });

    return tempChat;
  }, [chats, userLoggedin]);

  React.useEffect(() => {
    if (userLoggedin) {
      socket.emit("join-room", userLoggedin.id);
    }
  }, [userLoggedin]);

  return (
    <Container
      maxWidth="sm"
      sx={(theme) => ({
        boxShadow: 2,
        py: 2,
        height: "100vh",
        [theme.breakpoints.between("xs", "lg")]: {
          display: chatFriend ? "none" : "block",
        },
      })}
    >
      <Stack gap={2}>
        {userLoggedin && (
          <Stack direction="row" gap={2} alignItems="center">
            <UserAvatar name={userLoggedin.username} />
            <Typography fontSize={25} sx={{ color: "text.primary" }}>
              Hello, {userLoggedin.username}!
            </Typography>
          </Stack>
        )}

        <SearchUser />

        <Divider />

        {/* chat list */}
        <Typography sx={{ color: "text.primary" }}>Your chats</Typography>

        {filteredChats.length === 0 && <EmptyChat />}

        {filteredChats.map((chat) => (
          <>
            {chat?.person && (
              <ProfileDisplay
                key={chat.id}
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
            )}
          </>
        ))}
      </Stack>
    </Container>
  );
};

export const Chats = React.memo(Component);
