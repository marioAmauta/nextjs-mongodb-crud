import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';

export default function FormTaskPage() {
  const router = useRouter();
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  function handleChange(event) {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let errors = validate();

    if (Object.keys(errors).length) {
      return setErrors(errors);
    }

    setIsCreatingTask(true);

    if (router.query.id) {
      updateTask();
    } else {
      await createTask();
    }

    router.push('/');
  }

  async function createTask() {
    try {
      await fetch('/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateTask() {
    try {
      await fetch(`/api/tasks/${router.query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
    } catch (error) {
      console.error(error);
    }
  }

  function validate() {
    const errors = {};

    if (!newTask.title) errors.title = 'Title is required';
    if (!newTask.description) errors.description = 'Description is required';

    return errors;
  }

  const getTask = useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks/${router.query.id}`);
      const data = await res.json();

      setNewTask({
        title: data.title,
        description: data.description
      });
    } catch (error) {
      console.error(error);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (router.query.id) {
      getTask();
    }
  }, [router.query.id, getTask]);

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
        <Grid.Column>
          <h1 style={{ marginBottom: '3rem' }}>
            {router.query.id ? 'Update Task' : 'Create Task'}
          </h1>
          <Form
            style={{
              border: '0.1px solid lightGray',
              borderRadius: '5px',
              padding: '2rem'
            }}
            onSubmit={handleSubmit}
          >
            <Form.Input
              label='Title'
              placeholder='Type a title'
              name='title'
              onChange={handleChange}
              error={
                errors.title && {
                  content: errors.title
                }
              }
              value={newTask.title}
            />
            <Form.TextArea
              style={{
                resize: 'none'
              }}
              label='Description'
              placeholder='Type a description'
              name='description'
              onChange={handleChange}
              error={
                errors.description && {
                  content: errors.description
                }
              }
              value={newTask.description}
            />
            <Button
              style={{
                display: 'block',
                margin: '2rem auto 0 auto'
              }}
              primary
              fluid
              loading={isCreatingTask}
            >
              {router.query.id ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
