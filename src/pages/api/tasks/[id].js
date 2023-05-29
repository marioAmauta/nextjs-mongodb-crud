import { TaskModel } from '@/models/TaskModel';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id }
  } = req;

  switch (method) {
    case 'GET':
      try {
        const foundTask = await TaskModel.findById(id);

        if (!foundTask) return res.status(404).json({ message: 'Task not found' });

        return res.status(200).json(foundTask);
      } catch (error) {
        return res.status(500).json({
          error: error.message
        });
      }

    case 'PUT':
      try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, body, {
          new: true
        });

        if (!updatedTask) {
          return res.status(400).json({
            message: 'Task not found'
          });
        }

        return res.status(200).json(updatedTask);
      } catch (error) {
        return res.status(500).json({
          error: error.message
        });
      }

    case 'DELETE':
      try {
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
          return res.status(404).json({ message: 'Cannot delete a task that does not exists' });
        }

        return res.status(200).json({
          message: `Task with title: "${deletedTask.title}" was successfully deleted`
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message
        });
      }

    default:
      return res.status(400).json({
        message: 'This method is not supported'
      });
  }
}
