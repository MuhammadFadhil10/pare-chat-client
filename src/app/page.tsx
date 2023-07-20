"use client";

import * as React from "react";
import { socket } from "@/utils";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Auth } from "@/components";

export default function Home() {
  // const [msg, setMsg] = React.useState("");
  // const [history, setHistory] = React.useState<unknown[]>([]);

  // const theme = useTheme();

  // socket.on("connection", () => {
  //   console.log("connect");
  // });

  // socket.on("message", (val) => {
  //   setHistory([...history, val]);
  // });

  // const onSendMessage = React.useCallback(
  //   (e: React.FormEvent) => {
  //     e.preventDefault();

  //     socket.emit(
  //       "message",
  //       JSON.stringify({ message: msg }),
  //       (response: unknown) => {
  //         setMsg("");

  //         // setHistory([...history, response]);
  //       }
  //     );
  //   },
  //   [msg]
  // );

  // const isLoggedIn = React.useRef<boolean>(localStorage.token);

  // const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   if (localStorage?.token) setIsLoggedIn(true);
  // }, [localStorage?.token]);

  return (
    <main>
      <Auth />
    </main>
  );
}
