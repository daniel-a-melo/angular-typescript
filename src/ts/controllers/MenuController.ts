import {mainModule} from '../App';
import {controller, inject} from '../decorators/at-angular';

@controller(mainModule, 'menuController')
@inject('$location')
export class MenuController {

  constructor(private $location : ng.ILocationService) {
  }

  isActiveTab(url : string) : boolean {
    return url === this.$location.path();
  }

}
