import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { User } from "@/types";
import { ProfileDisplay } from "../ProfileDisplay";

interface Props {
  user: User;
}

const Component = ({ user }: Props) => {
  return (
    <Stack sx={{ width: "100vw" }}>
      <Box sx={{ boxShadow: 1, p: 1 }}>
        <ProfileDisplay user={user} onClick={() => undefined} isStatic />
      </Box>

      {/* bubble container */}
      <Stack sx={{ width: "100%", height: "80%" }}></Stack>

      <Box
        sx={{
          position: "fixed",
          bottom: "30px",
          width: "60vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField size="medium" sx={{ width: "70%" }} multiline minRows={1} placeholder="Message" />
      </Box>
    </Stack>
  );
};

export const RoomChat = React.memo(Component);
