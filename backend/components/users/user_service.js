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
    return this.userData.getList(filters,option);
  }

  async getForUsernameOrNull(username) {
    const userList = await this.userData.getList({username});
    if(userList.length){
      return userList[0];
    }
    return null;

  }

  async getForUuidOrNull(uuid) {
    const userList = await this.userData.getList({uuid});
    if(userList.length){
      return userList[0];
    }
    return null;

  }

  async hashPassword(password){
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
   
  }

  async checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

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
}


