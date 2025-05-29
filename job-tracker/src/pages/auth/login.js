// pages/login.js
import { signIn } from "next-auth/react";
import styled from 'styled-components';

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
  return (
    <LoginContainer>
      <h1>Job Tracker Login</h1>
      <LoginButton onClick={() => signIn('github')}>
        Sign in with GitHub
      </LoginButton>
    </LoginContainer>
  );
}