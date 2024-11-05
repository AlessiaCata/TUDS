import { ConflictError } from '../../libs/conflict_error.js';
import { Dependency } from '../../libs/dependency.js';
import { MissingParameterError } from '../../libs/missing_parameter_error.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

export class UserService {
  constructor() {
    this.userData = Dependency.get('userData');
  }

  async getList(filters, option) {
    return this.userData.getList(filters, option);
  }

  async getForUsernameOrNull(username) {
    const userList = await this.userData.getList({ username });
    return userList.length ? userList[0] : null;
  }

  async getForUuidOrNull(uuid) {
    const userList = await this.userData.getList({ uuid });
    return userList.length ? userList[0] : null;
  }

  async hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  ////////////////////////////////////////////////////77
  
  async create(data) {
    if (!data?.username) {
      throw new MissingParameterError('username');
    }
    if (!data.displayName) {
      throw new MissingParameterError('displayName');
    }
    if (!data.password) {
      throw new Error('Password');
    }
    if (await this.getForUsernameOrNull(data.username)) {
      throw new ConflictError('El usuario ya existe.');
    }

    data.uuid = uuid.v4();
    data.hashedPassword = await this.hashPassword(data.password);
    delete data.password;

    this.userData.create(data);
  }

  ////////////////////////////////////////////////////////////7
  async deleteForUuid(uuid){
    const data ={};
    data.deletedAt = new Date;
    return this.userData.update({uuid}, data);       
}

/////////////////////////////////////////////////////////////////

  async toggleEnabled(uuid) {
    const user = await this.getForUuidOrNull(uuid);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Cambia el estado de habilitado/deshabilitado
    user.isEnabled = !user.isEnabled;
    await this.userData.update(user.uuid, { isEnabled: user.isEnabled });

    return user;
  }
}

