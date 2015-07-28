module at {

    //TODO: Check http://bit.ly/1HYaQw2 on how turning decorators "strongly typed"

    'use strict';

    export function filter(moduleName: string, filterName: string): at.IClassAnnotationDecorator {
      return (target: any): void => {
          angular.module(moduleName).filter(filterName, target.filter);
      };
    }

    export function directiveFactory(moduleName: string, directiveName: string) : at.IClassAnnotationDecorator  {
        return (target: any): void => {
          angular.module(moduleName).directive(directiveName, target.create());
        };
    }

    export function config(moduleName: string, dependencies : string[]) : at.IClassAnnotationDecorator  {
      return (target: any): void => {
        var configList: any[] = dependencies.slice();
        configList.push(target.config);
        angular.module(moduleName).config(configList);
      };
    }

}
