"use client";

import "./global.css";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "@/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatFriendProvider } from "@/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <ChatFriendProvider>
            <body>{children}</body>
          </ChatFriendProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </html>
  );
}
