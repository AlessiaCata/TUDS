import { ConflictError } from '../../libs/conflict_error.js';
import { Dependency } from '../../libs/dependency.js';
import { MissingParameterError } from '../../libs/missing_parameter_error.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

export class PetService {
  constructor() {
    this.petData = Dependency.get('petData');
  }

  async getList(filters, option) {
    return this.petData.getList(filters, option);
  }

  async getForNombreOrNull(nombre) {
    const petList = await this.petData.getList({ nombre });
    return petList.length ? petList[0] : null;
  }

  async getForUuidOrNull(uuid) {
    const petList = await this.petData.getList({ uuid });
    return petList.length ? petList[0] : null;
  }


  async create(data) {
    if (!data?.nombre) {
      throw new MissingParameterError('nombre');
    }
    
    if (await this.getForNombreOrNull(data.nombre)) {
      throw new ConflictError('El usuario ya existe.');
    }

    data.uuid = uuid.v4();
    data.hashedPassword = await this.hashPassword(data.password);
    delete data.password;

    this.petData.create(data);
  }

  async deleteForUuid(uuid){
    const data ={};
    data.deletedAt = new Date();
    return this.petData.updateForUuid(uuid, data);       
  }

  async toggleEnabled(uuid) {
    const pet = await this.getForUuidOrNull(uuid);
    if (!pet) {
      throw new Error('Animal no encontrado');
    }

    pet.isEnabled = !pet.isEnabled;
    await this.petData.update(pet.uuid, { isEnabled: pet.isEnabled });

    return pet;
  }

  async update(uuid, data) {
    data = { ...data };
    data.updatedAt = new Date();
    return this.petData.update({ uuid }, data); 
  }
}


