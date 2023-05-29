import { TaskModel } from '@/models/TaskModel';
import { dbConnect } from '@/utils/mongoose';
import { serializeToJSON } from '@/utils/serializeToJSON';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Card, Grid } from 'semantic-ui-react';

export default function HomePage({ tasks }) {
  const router = useRouter();

  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign='middle'
        columns={1}
        style={{
          height: '80vh'
        }}
      >
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h2>There are no tasks yet</h2>
            <Image
              src='https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=826&t=st=1685355481~exp=1685356081~hmac=660a47c545b7203e17b79dfc52eb1b9e8304f848b37e780c6e14432f445ea549'
              alt='no data image'
              width={300}
              height={300}
            />
            <div>
              <Button
                primary
                onClick={() => router.push('/tasks/new')}
              >
                Create a Task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Card.Group
        itemsPerRow={3}
        stackable
      >
        {tasks.map(task => {
          const createdAt = new Date(task.createdAt).toLocaleString();
          const updatedAt = new Date(task.updatedAt).toLocaleString();

          return (
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <p>{task.description}</p>
                <p>Created at {createdAt}</p>
                {!(createdAt.localeCompare(updatedAt) === 0) && <p>Updated at {updatedAt}</p>}
              </Card.Content>
              <Card.Content
                extra
                textAlign='center'
              >
                <Button
                  primary
                  onClick={() => router.push(`/tasks/${task._id}`)}
                >
                  View
                </Button>
                <Button
                  primary
                  onClick={() => router.push(`/tasks/${task._id}/edit`)}
                >
                  Edit
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const tasks = serializeToJSON(await TaskModel.find());

  return {
    props: {
      tasks
    }
  };
}
