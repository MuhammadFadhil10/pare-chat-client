"use client";
import { UserAvatar } from "@/components";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Chats() {
  return (
    <Container maxWidth="sm" sx={{ boxShadow: 2, py: 2 }}>
      <Stack direction="row" gap={2} alignItems="center">
        <UserAvatar
          name={
            JSON.parse(localStorage?.user ?? { username: "asddsa asdas" })
              .username
          }
        />
        <Typography fontSize={25} sx={{ color: "text.primary" }}>
          Hello {JSON.parse(localStorage?.user ?? { username: "" }).username}
        </Typography>
      </Stack>
    </Container>
  );
}
