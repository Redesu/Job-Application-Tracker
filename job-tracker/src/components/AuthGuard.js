import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = '/auth/login';
    }
  });

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/auth/login?sessionExpired=true' });
    }
  }, [session]);

  if (status === "loading") return null;
  return <>{children}</>;
}