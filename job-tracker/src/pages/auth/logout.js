// pages/logout.js
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediately attempt to sign out when page loads
    signOut({ redirect: false }).then(() => {
      // Redirect to home page after logout
      router.push('/');
    });
  }, []);

  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '2rem',
      padding: '2rem'
    }}>
      <h1>Logging out...</h1>
      <p>You will be redirected to the home page.</p>
    </div>
  );
}