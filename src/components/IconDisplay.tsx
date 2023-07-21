import * as React from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

interface Props {
  name: string;
  size?: "large" | "medium" | "small";
  color?: string;
}

const Component = ({
  name,
  size = "medium",
  color = "primary.main",
}: Props) => {
  return (
    <>{name === "chat" && <ChatBubbleIcon fontSize={size} sx={{ color }} />}</>
  );
};

export const IconDisplay = React.memo(Component);
