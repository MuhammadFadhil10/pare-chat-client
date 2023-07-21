import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import notFound from "../../../public/no-results.png";

const Component = () => {
  return (
    <Stack alignItems="center" sx={{ width: "100%" }}>
      <Typography>No users found</Typography>

      <Image alt="photo" src={notFound} width={150} />
    </Stack>
  );
};

export const EmptySearchResult = React.memo(Component);
