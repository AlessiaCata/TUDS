import { Dependency } from '../../libs/dependency.js';
import { checkPermission } from '../../libs/CheckPermission.js';

export class UserController {
  constructor() {
    this.userService = Dependency.get('userService');
  }

  async get(req, res) {
    checkPermission(req, ['admin']);
    const { uuid } = req.params;
    const filters = {};
    if (uuid) {
      filters.uuid = uuid;
    } 
    const userList = await this.userService.getList(filters);
    res.send(userList);
  }

  async post(req, res) {
    checkPermission(req, ['admin']);
    await this.userService.create(req.body);
    res.status(204).end();
  }

  async patch(req, res) {
    checkPermission(req, ['admin']);
    const { uuid } = req.params;
    await this.userService.update(uuid, req.body);
    res.status(200).end();
  }

  async delete(req,res){
    checkPermission(req, ['admin']);
    await this.userService.deleteForUuid(req.params.uuid);
    res.status(204).end();
  }
}
