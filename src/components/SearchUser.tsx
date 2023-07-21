import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { User } from "@/api";
import { SearchPopover } from "./SearchPopover";
import { useDebounce } from "@/hooks";
import { User as UserType } from "@/types";

const Component = () => {
  const debounce = useDebounce();

  const [data, setData] = React.useState<UserType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<
    HTMLDivElement | HTMLElement | null
  >(null);

  const handleSearch = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (!!e.target.value) {
          setIsLoading(true);
          setAnchorEl(e.target);

          const response = await User.search(e.target.value);

          setIsLoading(false);

          return setData(response);
        }

        setIsLoading(false);
        setAnchorEl(null);
      } catch (error: any) {
        setIsLoading(false);
        setData([]);

        console.log("search error: ", error.response.data.message);
      }
    },
    []
  );

  const debounceSearch = React.useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) =>
      handleSearch(e)
    );
  }, [debounce, handleSearch]);

  return (
    <>
      <Stack sx={{ width: "100%" }}>
        <TextField
          size="small"
          autoComplete="off"
          autoFocus
          placeholder="🔍 Search User"
          onChange={debounceSearch}
        />

        <SearchPopover
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          isLoading={isLoading}
          users={data}
        />
      </Stack>
    </>
  );
};

export const SearchUser = React.memo(Component);
