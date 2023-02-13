import { getServerSession, User } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface Profile extends User {
  first_name: string;
}

export default async function Admin() {
  const session = await getServerSession(authOptions);

  const user = session?.user as Profile;

  return <h1>{user?.first_name}</h1>;
}
