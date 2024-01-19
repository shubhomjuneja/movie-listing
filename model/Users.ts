import { Schema, model, Document, models } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const modelName = 'Users';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Users = (models[modelName] as any) || model<IUser>(modelName, userSchema);

export default Users;
