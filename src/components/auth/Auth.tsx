import * as React from "react";
import { AuthForm } from "./AuthForm";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import pareImage from "../../../public/pare1.png";
import Image from "next/image";

const Component: React.FC = () => {
  return (
    <Container maxWidth={false}>
      <Stack direction="row" gap={5}>
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={0}
          sx={{
            height: "100vh",
            width: "600px",
            bgcolor: "primary.main",
            color: "text.primary",
          }}
        >
          <Typography fontSize={32}>Welcome to Pare Chat!</Typography>

          <Image src={pareImage} alt="logo" width={300} height={200} />
        </Stack>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AuthForm type="signin" width={300} />
        </Box>
      </Stack>
    </Container>
  );
};

export const Auth = React.memo(Component);
