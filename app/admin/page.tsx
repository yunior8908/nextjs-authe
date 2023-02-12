import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return <h1>{session?.user?.name}</h1>;
}
