import { TaskModel } from '@/models/TaskModel';
import { serializeToJSON } from '@/utils/serializeToJSON';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Confirm, Grid } from 'semantic-ui-react';

export default function TaskDetail({ error, task }) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function openConfirm() {
    setIsConfirmOpen(true);
  }
  function closeConfirm() {
    setIsConfirmOpen(false);
  }

  async function deleteTask() {
    try {
      await fetch(`/api/tasks/${task._id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete() {
    setIsDeleting(true);
    deleteTask();
    closeConfirm();
    router.push('/');
  }

  if (error) {
    return (
      <Error
        statusCode={error.statusCode}
        title={error.title}
      />
    );
  }

  return (
    <Grid
      centered
      verticalAlign='middle'
      columns={3}
      stackable
      style={{
        height: '80vh'
      }}
    >
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <Button
            color='red'
            onClick={openConfirm}
            loading={isDeleting}
          >
            Delete
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        open={isConfirmOpen}
        onConfirm={handleDelete}
        onCancel={closeConfirm}
        header='Please confirm'
        content='Are you sure want to delete this task?'
        confirmButton='Delete'
      />
    </Grid>
  );
}

export async function getServerSideProps({ query }) {
  const foundTask = serializeToJSON(await TaskModel.findById(query.id));

  if (!foundTask) {
    return {
      props: {
        error: {
          statusCode: 404,
          title: `Invalid id for Task`
        }
      }
    };
  }

  return {
    props: {
      task: foundTask
    }
  };
}
