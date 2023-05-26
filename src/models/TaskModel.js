import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, 'Title is required'],
      unique: true,
      trim: true,
      maxLength: [40, 'Title must be less than 50 characters']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [200, 'Description must be less than 200 characters']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const TaskModel = models?.Task || model('Task', taskSchema);
