import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  message: string;
}

const Component = ({ message }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: "80%",
        height: "auto",
        backgroundColor: "primary.main",
        p: 1,
        borderRadius: 2,
      }}
    >
      <Typography sx={{ color: "text.primary" }}>{message}</Typography>
    </Box>
  );
};

export const Bubble = React.memo(Component);
