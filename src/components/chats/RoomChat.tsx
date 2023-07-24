"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Chat, User } from "@/types";
import { ProfileDisplay } from "../ProfileDisplay";
import { socket } from "@/utils";
import { ChatFriendContext } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { Message } from "@/api";
import { Bubble } from "./Bubble";
import { UserAvatar } from "../UserAvatar";
import dynamic from "next/dynamic";

interface Props {
  user: User;
}

const Component = ({ user }: Props) => {
  let userLoggedin: User | undefined;

  if (typeof window !== "undefined") {
    userLoggedin = JSON.parse(localStorage.user);
  }

  const { data: rawChats } = useQuery({
    queryFn: () =>
      userLoggedin ? Message.getChats(userLoggedin.id) : undefined,
    queryKey: ["chats", userLoggedin],
  });

  const [message, setMessage] = React.useState("");
  const [chats, setChats] = React.useState<Chat[]>([]);

  const { chatFriend, setChatFriend } = React.useContext(ChatFriendContext);

  const onSendMessage = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      socket.emit(
        "message",
        {
          sender: userLoggedin,
          receiver: chatFriend,
          message,
        },
        (response: any) => {
          setMessage("");

          setChats([...chats, response]);
        }
      );
    },
    [chatFriend, chats, message, userLoggedin]
  );

  React.useEffect(() => {
    socket.on("message", (val) => {
      const data = val;

      if (data.receiverId === userLoggedin?.id) {
        setChats([...chats, data]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [chats, user.id]);

  React.useEffect(() => {
    if (rawChats) setChats(rawChats);
  }, [rawChats]);

  React.useEffect(() => {
    if (chats.length > 0) {
      console.log(
        "new chats: ",
        chats.filter(
          (chat) => chat.person.id === (chatFriend as Partial<User>).id
        )
      );
    }
  }, [chatFriend, chats]);

  return (
    <Stack alignItems="center" gap={2} sx={{ width: "100vw" }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          boxShadow: 1,
          p: 1,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <ArrowBackIcon
          fontSize="medium"
          sx={(theme) => ({
            color: "text.primary",
            cursor: "pointer",
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
          onClick={() => setChatFriend(null)}
        />
        <ProfileDisplay
          user={user}
          onClick={() => undefined}
          isStatic
          boldName
        />
      </Box>

      {/* bubble container */}
      <Stack
        gap={2}
        sx={{ width: "90%", height: "70%", px: 2, overflowY: "auto" }}
      >
        {userLoggedin &&
          chats
            .filter(
              (chat) => chat.person.id === (chatFriend as Partial<User>).id
            )
            .map((chat: any, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: chat.sender
                    ? chat.sender.id === userLoggedin?.id
                      ? "flex-end"
                      : "inherit"
                    : "flex-end",
                  display: "flex",
                  gap: 1,
                  flexDirection:
                    chat.sender?.id === userLoggedin?.id
                      ? "row-reverse"
                      : "row",
                }}
              >
                {chat.sender && <UserAvatar name={chat.sender.username} />}

                <Bubble message={chat.message} />
              </Box>
            ))}
      </Stack>

      <Box
        sx={(theme) => ({
          position: "fixed",
          bottom: "30px",
          width: "60vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          [theme.breakpoints.between("xs", "lg")]: {
            width: "100%",
          },
        })}
      >
        <TextField
          size="medium"
          value={message}
          sx={{ width: "70%" }}
          multiline
          minRows={1}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendIcon
          fontSize="large"
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={onSendMessage}
        />
      </Box>
    </Stack>
  );
};

export const RoomChat = React.memo(Component);
