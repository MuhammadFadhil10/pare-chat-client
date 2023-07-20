import * as React from "react";
import Avatar from "@mui/material/Avatar";

interface Props {
  name: string;
}

const Component = ({ name }: Props) => {
  const stringAvatar = React.useMemo(() => {
    const splittedName = name.split(" ");

    const firstName = splittedName[0].charAt(0).toUpperCase();
    const lastName = (splittedName[1] ?? "").charAt(0).toUpperCase();

    return {
      sx: {
        bgcolor: "primary.main",
        fontWeight: "bold",
        color: "text.primary",
      },
      children: `${firstName} ${lastName}`,
    };
  }, [name]);

  return <Avatar {...stringAvatar} />;
};

export const UserAvatar = React.memo(Component);
