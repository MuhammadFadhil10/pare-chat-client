import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { User } from "@/types";
import { ProfileDisplay } from "../ProfileDisplay";
import { socket } from "@/utils";
import { ChatFriendContext } from "@/context";

interface Props {
  user: User;
}

const Component = ({ user }: Props) => {
  const [message, setMessage] = React.useState("");
  const [history, setHistory] = React.useState<unknown[]>([]);

  const { chatFriend } = React.useContext(ChatFriendContext);

  React.useEffect(() => {
    socket.on("message", (val) => {
      const data = JSON.parse(val);

      if (data.receiverId === JSON.parse(localStorage.user).id) {
        setHistory([...history, data]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [history, user.id]);

  const onSendMessage = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      socket.emit(
        "message",
        JSON.stringify({
          senderId: JSON.parse(localStorage.user).id,
          receiverId: chatFriend?.id,
          message,
        }),
        (response: string) => {
          setMessage("");

          setHistory([...history, JSON.parse(response)]);
        }
      );
    },
    [chatFriend?.id, history, message]
  );

  return (
    <Stack alignItems="center" sx={{ width: "100vw" }}>
      <Box sx={{ boxShadow: 1, p: 1 }}>
        <ProfileDisplay user={user} onClick={() => undefined} isStatic />
      </Box>

      {/* bubble container */}
      <Stack sx={{ width: "700px", height: "80%", px: 2 }}>
        {history.map((h: any, index) => (
          <Typography
            key={index}
            sx={{
              alignSelf:
                h.senderId === JSON.parse(localStorage.user).id
                  ? "flex-end"
                  : "inherit",
            }}
          >
            {h.message}
          </Typography>
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
