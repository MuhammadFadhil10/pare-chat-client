import * as React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ProfileDisplay } from "./ProfileDisplay";
import { User } from "@/types";

interface Props {
  anchorEl: HTMLDivElement | HTMLElement | null;
  onClose: () => void;
  isLoading: boolean;
  users: User[];
}

const Component = ({ anchorEl, onClose, isLoading, users }: Props) => {
  const open = Boolean(anchorEl);

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableAutoFocus={true}
        disableEnforceFocus={true}
      >
        <Box
          sx={{
            width: "400px",
            minHeight: "50px",
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
        >
          <Typography>Search result:</Typography>

          {isLoading && (
            <>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton width="60%" height="40px" />
              </Box>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}
              >
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton width="40%" height="40px" />
              </Box>
            </>
          )}

          {users.length > 0 && (
            <Stack gap={2}>
              {users?.map((user) => (
                <ProfileDisplay key={user.id} name={user.username} />
              ))}
            </Stack>
          )}
        </Box>
      </Popover>
    </>
  );
};

export const SearchPopover = React.memo(Component);
