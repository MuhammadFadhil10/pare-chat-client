import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import notFound from "../../../public/no-chat.png";

const Component = () => {
  return (
    <Stack alignItems="center" gap={2} sx={{ width: "100%" }}>
      <Stack alignItems="center">
        <Typography sx={{ color: "text.primary" }} fontSize={26}>
          You have no chat!
        </Typography>
        <Typography sx={{ color: "text.primary" }}>
          Are u lonely? go find a friend to chat, dude!
        </Typography>
      </Stack>

      <Image alt="photo" src={notFound} width={300} />
    </Stack>
  );
};

export const EmptyChat = React.memo(Component);
