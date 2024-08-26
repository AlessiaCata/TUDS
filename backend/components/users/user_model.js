import mongoose, { Schema } from 'mongoose';

export const UserModel = mongoose.model(
  'User',
  new Schema({
    uuid: String,
    username: String,
    displayName: String,
    hashedPassword: String,
    isEnabled: Boolean, 
    roles: String,
  })
);

export class UserMongo {
  async getList(filters, /*options*/) {
    return UserModel.find(filters).exec();
  }

  async create(userData) {
     
      return await UserModel.create(userData);
    
    
  }
}
