import { Menu, Container, Button } from 'semantic-ui-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function Navbar() {
  const router = useRouter();

  return (
    <Menu
      inverted
      attached
    >
      <Container>
        <Menu.Item>
          <Link href='/'>
            <Image
              src='/favicon.ico'
              alt='brand-logo'
              width={40}
              height={40}
              priority
            />
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button
              primary
              size='mini'
              onClick={() => router.push('/tasks/new')}
            >
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
