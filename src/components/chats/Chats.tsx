"use client";

import * as React from "react";
import { SearchUser, UserAvatar } from "@/components";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Component = () => {
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
        <Typography>Your chats</Typography>
      </Stack>
    </Container>
  );
};

export const Chats = React.memo(Component);
