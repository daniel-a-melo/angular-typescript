import {mainModule} from '../App';

//@at.filter(SwapApp.mainModule, 'naFilter')
export class NotApplicableFilter {

  static filter() {
    return function (input : string) {
      if (input == 'n/a') {
        return 'Not applicable'
      } else {
        return input;
      }
    }
  }
}

angular.module(mainModule).filter('naFilter', NotApplicableFilter.filter);
