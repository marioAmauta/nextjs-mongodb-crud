import { dbConnect } from '@/utils/mongoose';
import { TaskModel } from '@/models/TaskModel';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = await TaskModel.find();
        return res.json(tasks);
      } catch (error) {
        return res.status(500).json({
          error: error.message
        });
      }

    case 'POST':
      try {
        const newTask = new TaskModel(body);
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (error) {
        return res.status(500).json({
          error: error.message
        });
      }

    default:
      return res.status(400).json({
        message: 'This method is not supported'
      });
  }
}
