import Link from 'next/link';
import styled from 'styled-components';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const HeaderContainer = styled.header`
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding 0 0.5rem;
}
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before{
    content: '📈';
    font-size: 1.5rem;
    vertical-align: middle;
  }

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 600px) {
    display: ${props => (props.open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 1rem;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 100;
  }
`;

const NavLink = styled.span`
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }

  &:hover {
    color: #2563eb;
  }
`;

const LogoutButton = styled.button`
  background: linear-gradient(90deg, #2563eb 60%, #1d4ed8 100%);
  color: white;
  padding: 0.6rem 1.3rem;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
  transition: background 0.2s, transform 0.1s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(90deg, #1d4ed8 60%, #2563eb 100%);
    transform: translateY(-2px) scale(1.03);
  }

`;

const LoginButton = styled.button`
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

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  margin-left: 1rem;

  @media (max-width: 600px) {
    display: block;
  }
`;



export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <HeaderContainer>
      <Nav>
        <Link href="/" passHref>
          <Logo>JobTracker</Logo>
        </Link>
        <Hamburger onClick={() => setMenuOpen(m => !m)}>
          ☰
        </Hamburger>
        <NavLinks open={menuOpen}>
          <Link href="/" passHref>
            <NavLink onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          </Link>
          <Link href="/jobs" passHref>
            <NavLink onClick={() => setMenuOpen(false)}>Applications</NavLink>
          </Link>
          {session ? (
            <LogoutButton onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/auth/login' }) }}>
              Logout
            </LogoutButton>
          ) : (
            <LoginButton onClick={() => { setMenuOpen(false); router.push('/auth/login') }}>
              Login
            </LoginButton>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}