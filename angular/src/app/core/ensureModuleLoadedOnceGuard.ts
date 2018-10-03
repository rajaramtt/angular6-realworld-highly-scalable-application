export class EnsureModuleLoadedOnceGuard {

    constructor(targetModule: any) {
      if (targetModule) {
        throw new Error(`${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`);
      }
    }

  }

  export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
      throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
    }
  }