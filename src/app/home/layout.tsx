"use client";
import { Chats } from "@/components";
import Stack from "@mui/material/Stack";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack direction="row">
      <Chats />
      {children}
    </Stack>
  );
}
