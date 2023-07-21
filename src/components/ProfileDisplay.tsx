import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserAvatar } from "./UserAvatar";

import { User } from "@/types";

interface Props {
  user: User;
  onClick: () => void;
  isStatic?: boolean;
}

const Component = ({ user, onClick, isStatic }: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          cursor: !isStatic ? "pointer" : "default",
          ":hover": {
            background: !isStatic ? "#efefef" : "",
            transition: "300ms",
          },
        }}
        onClick={() => !isStatic && onClick()}
      >
        <UserAvatar name={user.username} />
        <Typography>{user.username}</Typography>
      </Box>
    </>
  );
};

export const ProfileDisplay = React.memo(Component);
