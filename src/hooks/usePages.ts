import * as React from "react";
import type { Page } from "@/types";

export const usePages = () => {
  const memoizedPages: Page[] = React.useMemo(() => {
    return [
      {
        label: "Chats",
        paths: ["/home", "/home/chats"],
        to: "/home/chats",
        icon: "chat",
      },
      {
        label: "Search",
        paths: ["/home/search"],
        to: "/home/search",
        icon: "search",
      },
    ] as Page[];
  }, []);

  return {
    memoizedPages,
  };
};
