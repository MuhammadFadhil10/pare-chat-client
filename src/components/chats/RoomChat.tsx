import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { Chat, User } from "@/types";
import { ProfileDisplay } from "../ProfileDisplay";
import { socket } from "@/utils";
import { ChatFriendContext } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { Message } from "@/api";
import { Bubble } from "./Bubble";
import { UserAvatar } from "../UserAvatar";

interface Props {
  user: User;
}

const Component = ({ user }: Props) => {
  const { data: rawChats } = useQuery({
    queryFn: () => Message.getChats(JSON.parse(localStorage.user).id),
    queryKey: ["chats"],
  });

  const [message, setMessage] = React.useState("");
  const [chats, setChats] = React.useState<Chat[]>([]);

  const { chatFriend } = React.useContext(ChatFriendContext);

  const onSendMessage = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      socket.emit(
        "message",
        {
          sender: JSON.parse(localStorage.user),
          receiver: chatFriend,
          message,
        },
        (response: any) => {
          setMessage("");

          setChats([...chats, response]);
        }
      );
    },
    [chatFriend, chats, message]
  );

  React.useEffect(() => {
    socket.on("message", (val) => {
      const data = val;

      if (data.receiverId === JSON.parse(localStorage.user).id) {
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

  return (
    <Stack alignItems="center" gap={2} sx={{ width: "100vw" }}>
      <Box sx={{ boxShadow: 1, p: 1, width: "100%", boxSizing: "border-box" }}>
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
        {chats
          .filter(
            (chat) => chat.person?.id === (chatFriend as Partial<User>)?.id
          )
          .map((chat: any, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: chat.sender
                  ? chat.sender.id === JSON.parse(localStorage.user).id
                    ? "flex-end"
                    : "inherit"
                  : "flex-end",
                display: "flex",
                gap: 1,
                flexDirection:
                  chat.sender?.id === JSON.parse(localStorage.user).id
                    ? "row-reverse"
                    : "row",
              }}
            >
              <UserAvatar name={chat.sender.username} />
              <Bubble message={chat.message} />
            </Box>
          ))}
      </Stack>

      <Box
        sx={{
          position: "fixed",
          bottom: "30px",
          width: "60vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
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
