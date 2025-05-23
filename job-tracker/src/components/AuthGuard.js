import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthGuard({ children }) {
  const { status } = useSession({ 
    required: true,
    onUnauthenticated() {
      window.location.href = '/auth/login'; // Full page reload ensures no flash
    }
  });

  if (status === "loading") return null;
   return <>{children}</>;
}