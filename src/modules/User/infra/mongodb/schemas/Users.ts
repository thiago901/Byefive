import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requered: true,
  },
  email: {
    type: String,
    requered: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
