import mongoose, { Schema } from 'mongoose';

export const UserModel = mongoose.model(
  'User',
  new Schema({
    uuid: String,
    deletedAt: Date,
    username: String,
    displayName: String,
    hashedPassword: String,
    isEnabled: Boolean,
    roles: String,
  })
);

export class UserMongo {
  async getList(filters) {
    filters ??= {}; 
    filters.deletedAt ??= null;
    return UserModel.find(filters).exec();
  }

  async create(userData) {
    return await UserModel.create(userData);
  }

  async update(filters, data) {
    return await UserModel.updateOne(filters, data);
  }

  async updateForUuid(uuid, data) {
    return this.update({uuid}, data);
  }

  async delete(uuid) {
    return await UserModel.deleteOne({ uuid });
  }
}
