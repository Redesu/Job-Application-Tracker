import Link from 'next/link';
import styled from 'styled-components';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

const HeaderContainer = styled.header`
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.span`  // Changed from 'a' to 'span'
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.span`  // Changed from 'a' to 'span'
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

const LogoutButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  border: none;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;


export default function Header() {
  const { data: session } = useSession();
  return (
    <HeaderContainer>
      <Nav>
        <Link href="/" passHref>
          <Logo>JobTracker</Logo>
        </Link>
        
        <NavLinks>
          <Link href="/" passHref>
            <NavLink>Dashboard</NavLink>
          </Link>
          <Link href="/jobs" passHref>
            <NavLink>Applications</NavLink>
          </Link>
        {session && (
          <LogoutButton href="/auth/logout" onClick={() => signOut({ callbackUrl: '/auth/login'})}>Logout</LogoutButton>
        )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}