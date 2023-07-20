"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";

interface Props {
  type: "signup" | "signin";
  width?: number | string;
}

const Component: React.FC<Props> = ({ type, width = "100%" }) => {
  const { register, handleSubmit } = useForm();
  const { signinState, signupState, handleSignIn } = useAuth();
  const [typeState, setTypeState] = React.useState(type);

  return (
    <Stack sx={{ width }}>
      <Typography fontSize={26} mb={2} sx={{ color: "text.primary" }}>
        {typeState === "signin" ? "Sign In" : "Sign Up"}
      </Typography>

      {(!!signinState.error || signupState.error) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeState === "signin" ? signinState.error : signupState.error}
        </Alert>
      )}

      <form
        onSubmit={handleSubmit((data) => {
          if (typeState === "signin") {
            return handleSignIn(data);
          }
        })}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          size="small"
          type="text"
          label="Username"
          {...register("username")}
        />
        <TextField
          size="small"
          type="password"
          label="Password"
          {...register("password")}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          {(signinState.isLoading || signupState.isLoading) && (
            <CircularProgress size={25} sx={{ color: "text.primary" }} />
          )}

          {!signinState.isLoading &&
            !signupState.isLoading &&
            typeState === "signin" &&
            "Sign In"}

          {!signinState.isLoading &&
            !signupState.isLoading &&
            typeState === "signup" &&
            "Sign Up"}
        </Button>

        {typeState === "signin" && (
          <Typography component="div" sx={{ display: "flex", gap: 1 }}>
            Don&apos;t have an account?{" "}
            <Typography
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setTypeState("signup")}
            >
              Sign Up
            </Typography>
          </Typography>
        )}

        {typeState === "signup" && (
          <Typography component="div" sx={{ display: "flex", gap: 1 }}>
            Already have an account?{" "}
            <Typography
              sx={{
                color: "text.primary",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setTypeState("signin")}
            >
              Sign In
            </Typography>
          </Typography>
        )}
      </form>
    </Stack>
  );
};

export const AuthForm = React.memo(Component);
