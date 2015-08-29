//Source : http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
import {mainModule} from '../AppConfig';

interface IHighlightScope extends ng.IScope {
  value : string;
}


//@at.directiveFactory(SwapApp.mainModule, 'highLight')
export class HighlightDirective {

  link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
  scope = {
    value : '=' //Look for an attribute with same name (value) in the element
  };

  constructor(/* list of dependencies */) {
    HighlightDirective.prototype.link =  ($scope: IHighlightScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
      if (attrs['highLight'] === $scope.value) {
        element.css('color', 'red');
      }
    };
  }

  static create() {
    var directive = (/* list of dependencies */) => {
      return new HighlightDirective(/* list of dependencies */);
    };

    //directive.$inject = ['']; //List dependencies to be injected when needed

    return directive;
  }
}

angular.module(mainModule).directive('highLight', HighlightDirective.create());
