import { connect, connection } from 'mongoose';

const conn = {
  isConnected: false
};

export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URI);

  conn.isConnected = db.connections[0].readyState;

  console.log(`Using database "${db.connection.db.databaseName}"`);
}

connection.on('connected', () => {
  console.log('MongoDB is connected');
});

connection.on('disconnected', () => {
  console.log('MongoDB is disconnected');
});

connection.on('error', err => {
  console.log({ err });
});

connection.on('close', () => {
  console.log('MongoDB connection is close');
});
