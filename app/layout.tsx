import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import AuthContext from "@/src/components/AuthProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "@/src/components/LogoutButton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <AuthContext session={session}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {session ? (
              <Link href="/admin/1" style={{ fontSize: "2rem" }}>
                1
              </Link>
            ) : null}
            {session ? (
              <Link href="/admin/2" style={{ fontSize: "2rem" }}>
                2
              </Link>
            ) : null}
            {session ? (
              <LogoutButton style={{ marginLeft: "auto" }}>logout</LogoutButton>
            ) : null}
          </div>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
