import { TaskModel } from '@/models/TaskModel';
import { manyTasksMock } from '../../../../cypress/fixtures/mockData';
import { dbConnect } from '@/utils/mongoose';

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
      if (body.action === 'resetTasks') {
        const deleteResult = await TaskModel.deleteMany();

        if (deleteResult.acknowledged) {
          return res.json({
            message: 'tasks successfully deleted'
          });
        }
      }

      if (body.action === 'addManyTasks') {
        const addManyResult = await TaskModel.insertMany(manyTasksMock);
        if (addManyResult.length > 0) {
          return res.json({
            message: 'tasks successfully added'
          });
        }
      }

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
