import { Dependency } from '../../libs/dependency.js';

export class UserController {
  constructor() {
    this.userService = Dependency.get('userService');
  }

  async get(req, res) {
    const userList = await this.userService.getList();
    res.send(userList);
  }

  async post(req, res) {
    await this.userService.create(req.body);
    res.status(204).end();
  }

  async patch(req, res) {
    const { uuid } = req.params;
    await this.userService.update(uuid, req.body);
    res.status(200).end();
  }

  ////////////////////////////////////////////

  async delete(req, res) {
    const { uuid } = req.params;
    await this.userService.delete(uuid);
    res.status(200).end();
  }

  //async delete(req,res){
    //checkPermission(req, ['user', 'admin']);
    //await this.userService.deleteForUuid(req.query.uuid);
    //res.status(204).end();
  //}
}
