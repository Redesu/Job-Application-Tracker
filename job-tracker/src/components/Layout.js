import Header from './Header';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
    </LayoutContainer>
  );
}