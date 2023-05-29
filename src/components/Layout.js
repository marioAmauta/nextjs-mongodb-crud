import { Container } from 'semantic-ui-react';
import { Navbar } from './Navbar';

export function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: '100dvh'
      }}
    >
      <Navbar />
      <Container
        style={{
          paddingBlock: '3rem'
        }}
      >
        {children}
      </Container>
    </div>
  );
}
