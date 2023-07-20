import { Auth, setAuthToken } from "@/api";
import { useRouter } from "next/navigation";
import * as React from "react";

export const useAuth = () => {
  const { push } = useRouter();

  const [signinState, setSigninState] = React.useState({
    isLoading: false,
    error: "",
  });

  const [signupState, setSignupState] = React.useState({
    isLoading: false,
    error: "",
  });

  const handleSignIn = React.useCallback(
    async (payload: unknown) => {
      try {
        setSigninState({ error: "", isLoading: true });

        const response = await Auth.signin(payload);

        setSigninState({ error: "", isLoading: false });

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        setAuthToken(response.token);

        push("/chats");
      } catch (error: any) {
        setSigninState({
          error: error.response.data.message,
          isLoading: false,
        });
        console.log("error signin: ", error.response.data.message);
      }
    },
    [push]
  );

  return {
    signinState,
    signupState,
    handleSignIn,
  };
};
