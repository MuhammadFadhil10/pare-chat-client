"use client";
import { UserAvatar, Chats, Menu } from "@/components";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Page() {
  return (
    <>
      <Menu />
      <Chats />
    </>
  );
}
