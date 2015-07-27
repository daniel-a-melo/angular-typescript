module at {

    'use strict';

    export function filter(moduleName: string, filterName: string): at.IClassAnnotationDecorator {
      return (target: any): void => {
          angular.module(moduleName).filter(filterName, target.filter);
      };
    }

}
