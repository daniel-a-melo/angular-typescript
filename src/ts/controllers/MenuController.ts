module SwapApp.Controllers {

  @at.controller(SwapApp.mainModule, 'menuController')
  @at.inject('$location')
  export class MenuController {

    constructor(private $location : ng.ILocationService) {
    }

    isActiveTab(url : string) : boolean {
      return url === this.$location.path();
    }

  }


}
