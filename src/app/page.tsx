"use client";

import * as React from "react";
import { socket } from "@/utils";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [msg, setMsg] = React.useState("");
  const [history, setHistory] = React.useState<unknown[]>([]);

  const theme = useTheme();

  socket.on("connection", () => {
    console.log("connect");
  });

  socket.on("message", (val) => {
    setHistory([...history, val]);
  });

  const onSendMessage = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      socket.emit(
        "message",
        JSON.stringify({ message: msg }),
        (response: unknown) => {
          setMsg("");

          // setHistory([...history, response]);
        }
      );
    },
    [msg]
  );

  return (
    <main>
      <div>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          asd
        </Typography>

        {history.map((text, index) => (
          <Typography key={index}>{text as string}</Typography>
        ))}

        <form onSubmit={onSendMessage}>
          <TextField value={msg} onChange={(e) => setMsg(e.target.value)} />
        </form>
      </div>
    </main>
  );
}
