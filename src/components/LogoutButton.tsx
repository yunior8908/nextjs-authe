"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton(props: React.ComponentProps<"button">) {
  const handleLogout = () => signOut({ callbackUrl: "/admin" });

  return <button onClick={handleLogout} {...props} />;
}
