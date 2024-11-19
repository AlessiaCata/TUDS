import { Dependency } from '../../libs/dependency.js';
import { checkPermission } from '../../libs/CheckPermission.js';

export class petController {
  constructor() {
    this.petService = Dependency.get('petService');
  }

  async get(req, res) {
    checkPermission(req, ['admin']);
    const { uuid } = req.params;
    const filters = {};
    if (uuid) {
      filters.uuid = uuid;
    } 
    const petList = await this.petService.getList(filters);
    res.send(petList);
  }

  async post(req, res) {
    checkPermission(req, ['admin']);
    await this.petService.create(req.body);
    res.status(204).end();
  }

  async patch(req, res) {
    checkPermission(req, ['admin']);
    const { uuid } = req.params;
    await this.petService.update(uuid, req.body);
    res.status(200).end();
  }

  async delete(req,res){
    checkPermission(req, ['admin']);
    await this.petService.deleteForUuid(req.params.uuid);
    res.status(204).end();
  }
}
