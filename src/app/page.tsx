"use client";
import { socket } from "@/utils";
import { useTheme, Typography } from "@mui/material";
export default function Home() {
  const theme = useTheme();

  socket.on("connection", () => {
    console.log("connect");
  });

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
      </div>
    </main>
  );
}
