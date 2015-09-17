namespace at {

    //TODO: Check http://bit.ly/1HYaQw2 on how turning decorators "strongly typed"

    'use strict';

    interface ngFilter {
      (... args : any[]) : (input : string) => string;
    }

    interface ngDirectiveFactory {
      create() : Function;
    }

    export function filter(moduleName: string, filterName: string, dependencies? : string[]) {
      return (target: Object, propertyKey : string, descriptor : TypedPropertyDescriptor<ngFilter>) => {
        if (!dependencies) {
          angular.module(moduleName).filter(filterName, descriptor.value);
        } else {
          let configList: any[] = dependencies.slice();
          configList.push(descriptor.value);
          angular.module(moduleName).filter(filterName, configList);
        }
      };
    }

    export function config(moduleName: string, dependencies : string[])  {
      return (target: Object, propertyKey : string, descriptor : TypedPropertyDescriptor<any>) => {
        if (!dependencies) {
          angular.module(moduleName).config(descriptor.value);
        } else {
          let configList: any[] = dependencies.slice();
          configList.push(descriptor.value);
          angular.module(moduleName).config(configList);
        }
      };
    }

    export function directiveFactory(moduleName: string, directiveName: string)  {
        return (target: ngDirectiveFactory): void => {
          angular.module(moduleName).directive(directiveName, <any>target.create());
        };
    }



}
