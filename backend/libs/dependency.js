export class Dependency {
  static dependenciesList = {};

  static add(dependencyName, dependency){
    if(dependencyName in this.dependenciesList){
      throw new Error(`Dependency ${dependencyName} already exists.`);
    }
    this.dependenciesList[dependencyName] = dependency;
  }

  static get(dependencyName){
    if(!(dependencyName in this.dependenciesList)){
      throw new Error(`Dependency ${dependencyName} does not exist.`);
    }

    let dependency = this.dependenciesList[dependencyName];
    if (typeof dependency === 'function'){
      dependency = dependency();
    }

    return dependency;
  }

}