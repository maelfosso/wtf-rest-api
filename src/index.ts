import mongoose from 'mongoose';
import { app } from './app';

const { MONGO_URI } = process.env;

const start = async () => {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI must be defined!')
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('Connected to MongoDB');

    app.listen(3000, () => {
      console.log('Listening on port 3000 !!!');
    })

  } catch (err) {
    console.error(err);
  }

}

console.log("Run !!!!");
