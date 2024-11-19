import mongoose, { Schema } from 'mongoose';

export const PetModel = mongoose.model(
  'Pet',
  new Schema({
    uuid: String,
    deletedAt: Date,
    nombre: String,
    descripcion: String,
    imagen: String,
  })
);

export class PetMongo {
  async getList(filters) {
    filters ??= {}; 
    filters.deletedAt ??= null;
    return PetModel.find(filters).exec();
  }

  async create(petData) {
    return await PetModel.create(petData);
  }

  async update(filters, data) {
    return await PetModel.updateOne(filters, data);
  }

  async updateForUuid(uuid, data) {
    return this.update({uuid}, data);
  }

  async delete(uuid) {
    return await PetModel.deleteOne({ uuid });
  }
}
