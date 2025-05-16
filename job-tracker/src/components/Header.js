import Link from 'next/link';
import styled from 'styled-components';

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

export default function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <Link href="/" passHref legacyBehavior>
          <Logo as="a">JobTracker</Logo>
        </Link>
        
        <NavLinks>
          <Link href="/" passHref legacyBehavior>
            <NavLink as="a">Dashboard</NavLink>
          </Link>
          <Link href="/jobs" passHref legacyBehavior>
            <NavLink as="a">Applications</NavLink>
          </Link>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}