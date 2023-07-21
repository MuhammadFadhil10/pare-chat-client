import * as React from "react";
import Stack from "@mui/material/Stack";

const Components = () => {
  return (
    <>
      <Stack
        sx={(theme) => ({
          background: "white",
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "50px",
          width: "30vw",
          boxShadow: 3,
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      ></Stack>
    </>
  );
};

export const BottomMenu = React.memo(Components);
