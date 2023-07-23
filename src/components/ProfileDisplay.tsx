import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserAvatar } from "./UserAvatar";

import { User } from "@/types";

interface Props {
  user: User;
  onClick?: () => void;
  isStatic?: boolean;
  boldName?: boolean;
  message?: string;
}

const Component = ({
  user,
  onClick,
  isStatic,
  boldName = false,
  message,
}: Props) => {
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
        onClick={() => !isStatic && onClick && onClick()}
      >
        <UserAvatar name={user.username} />
        <Box>
          <Typography
            sx={{
              fontWeight: boldName ? "bold" : "inherit",
              color: "text.primary",
            }}
          >
            {user.username}
          </Typography>
          {!!message && <Typography>{message}</Typography>}
        </Box>
      </Box>
    </>
  );
};

export const ProfileDisplay = React.memo(Component);
