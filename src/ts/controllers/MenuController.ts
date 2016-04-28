import {mainModule} from '../App';

//  @at.controller(SwapApp.mainModule, 'menuController')
//  @at.inject('$location')
export class MenuController {

  static $inject = ['$location'];

  constructor(private $location : ng.ILocationService) {
  }

  isActiveTab(url : string) : boolean {
    return url === this.$location.path();
  }

}

angular.module(mainModule).controller('menuController', MenuController);
