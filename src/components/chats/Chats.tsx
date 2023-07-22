"use client";

import * as React from "react";
import { SearchUser, UserAvatar } from "@/components";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EmptyChat } from "../empty";
import { socket } from "@/utils";

const Component = () => {
  const [history, setHistory] = React.useState<unknown[]>([]);

  socket.on("message", (val) => {
    setHistory([...history, JSON.parse(val)]);
  });

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

        {history.length === 0 && <EmptyChat />}

        {/* {history.map((h: any, index) => (
          <Typography key={index}>{h.message}</Typography>
        ))} */}

        <Typography>
          {(history[history.length - 1] as any)?.receiverId ===
            JSON.parse(localStorage.user).id &&
            (history[history.length - 1] as any)?.message}
        </Typography>
      </Stack>
    </Container>
  );
};

export const Chats = React.memo(Component);
