"use client";
import React, { useReducer } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [state, setState] = useReducer((st, newSt) => ({ ...st, ...newSt }), {
    loading: false,
  });

  console.log(state);

  console.log("login page");

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    setState({ loading: true });

    signIn("credentials", {
      username: ev.currentTarget.username.value,
      password: ev.currentTarget.password.value,

      redirect: true,
      callbackUrl:
        new URLSearchParams(window.location.search).get("callbackUrl") ||
        "/admin",
    }).finally(() => {
      setState({ loading: false });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" />
      </div>
      <button type="submit">
        <span>login</span> {state.loading ? "loading..." : null}
      </button>
    </form>
  );
}
