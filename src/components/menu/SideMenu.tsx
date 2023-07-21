"use client";

import * as React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { usePathname, useRouter } from "next/navigation";
import { usePages } from "@/hooks";
import { IconDisplay } from "../IconDisplay";

const Components = () => {
  const pathName = usePathname();
  const { push } = useRouter();
  const { memoizedPages } = usePages();
  return (
    <>
      <Stack
        justifyContent="flex-start"
        gap={2}
        sx={(theme) => ({
          background: "white",
          boxShadow: 3,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: "18vw",

          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        })}
      >
        {/* brand */}
        <Box sx={{ px: 2 }}>
          <Typography fontSize={26} sx={{ color: "text.primary" }}>
            Pare Chat
          </Typography>
        </Box>

        {/* pages */}
        <Stack gap={1}>
          {memoizedPages
            .filter((page) => page.label !== "Search")
            .map((page, index) => (
              <Box
                key={index}
                sx={{
                  cursor: "pointer",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: page.paths.includes(pathName)
                    ? "primary.main"
                    : "transparent",
                  px: 2,
                  "&:hover": {
                    bgcolor: "primary.main",
                    transition: "300ms",
                  },
                }}
                onClick={() => push(page.to)}
              >
                <IconDisplay name={page.icon ?? ""} color="text.primary" />
                <Typography sx={{ color: "text.primary" }}>
                  {page.label}
                </Typography>
              </Box>
            ))}
        </Stack>
      </Stack>
    </>
  );
};

export const SideMenu = React.memo(Components);
