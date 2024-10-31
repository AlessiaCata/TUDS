/* eslint-disable quotes */
export class UserMockup {
  static list = [
    {
      uuid: '16bc8515-f23e-45d0-b669-efe1cc540111',
      username: 'admin',
      displayName: 'Administrador',
      hashedPassword: "$2b$10$k8kN/AJLXkdk90663RG5h.Iwlm5RDli9gE1dwzb23yuuh/mHCEraq",
      isEnabled: true,
      roles: 'admin',
    },
    {
      uuid: 'bb62abbe-777c-41c9-86d7-82432f5ce05f',
      username: 'pedro',
      displayName: 'Pedro Pe',
      hashedPassword: "$2b$10$k8kN/AJLXkdk90663RG5h.Iwlm5RDli9gE1dwzb23yuuh/mHCEraq",
      isEnabled: true,
      roles: 'user',
    }
  ];

  async getList(filters, options) {
    const result = [];
    if (filters) {
      for (const item of UserMockup.list) {
        let includeItem = true;
        for (const filterName in filters) {
          const filterValue = filters[filterName];
          if (item[filterName] != filterValue) {
            includeItem = false;
            break;
          }
        }
        if (includeItem) {
          result.push(item);
        }
      }
    } else {
      result.push(...UserMockup.list);
    }

    if (options?.skip) {
      result.splice(0, options.skip);
    }
    if (options?.limit) {
      result.splice(options.limit, result.length);
    }

    return result;
  }

  create(data) {
    UserMockup.list.push(data);
  }

  update(uuid, updates) {
    const userIndex = UserMockup.list.findIndex(user => user.uuid === uuid);
    if (userIndex !== -1) {
      UserMockup.list[userIndex] = { ...UserMockup.list[userIndex], ...updates };
      return UserMockup.list[userIndex];
    }
    return null;
  }

  delete(uuid) {
    const userIndex = UserMockup.list.findIndex(user => user.uuid === uuid);
    if (userIndex !== -1) {
      return UserMockup.list.splice(userIndex, 1)[0];
    }
    return null;
  }
}

