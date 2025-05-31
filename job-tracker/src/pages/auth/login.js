import { signIn } from "next-auth/react";
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
`;

const LoginButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #555;
  }
`;

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }

  if(status === 'loading') return null;
  
  return (
    <LoginContainer>
      <h1>Job Tracker Login</h1>
      <LoginButton onClick={() => signIn('github')}>
        Sign in with GitHub
      </LoginButton>
    </LoginContainer>
  );
}