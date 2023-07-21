import { User } from "@/api";
import * as React from "react";

export const useSearch = () => {
  const handleSearch = React.useCallback(async (username: string) => {
    try {
      const response = await User.search(username);

      return response;
    } catch (error: any) {
      console.log("search error: ", error.response.data.message);

      throw Error(error.response.data.message);
    }
  }, []);

  return {
    handleSearch,
  };
};
