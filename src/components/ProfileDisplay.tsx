import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserAvatar } from "./UserAvatar";

interface Props {
  name: string;
}

const Component = ({ name }: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          cursor: "pointer",
          ":hover": {
            background: "#efefef",
            transition: "300ms",
          },
        }}
      >
        <UserAvatar name={name} />
        <Typography>{name}</Typography>
      </Box>
    </>
  );
};

export const ProfileDisplay = React.memo(Component);
