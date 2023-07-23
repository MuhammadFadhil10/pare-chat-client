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

  const { chatFriend, setChatFriend } = React.useContext(ChatFriendContext);

  const [chats, setChats] = React.useState<Chat[]>([]);

  socket.on("message", (val) => {
    // const existPersonChat = val.find(
    //   (personChat: any) =>
    //     personChat.receiver.id === JSON.parse(localStorage.user).id ||
    //     personChat.sender.id === JSON.parse(localStorage.user).id
    // );

    // alert(JSON.stringify(existPersonChat));

    // if (existPersonChat) {
    console.log("asd");
    setChats(val);
    // }
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
          (personChat) =>
            personChat.person.id === chat.person.id &&
            (personChat.receiver.id === JSON.parse(localStorage.user).id ||
              personChat.sender.id === JSON.parse(localStorage.user).id)
        );

        if (!existPersonChat) {
          tempChat.push(chat);
        }
      });

    return tempChat;
  }, [chats]);

  React.useEffect(() => {
    console.log("filteredChats: ", filteredChats);
  }, [filteredChats]);

  React.useEffect(() => {
    socket.emit("join-room", JSON.parse(localStorage.user).id);
  }, []);

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
