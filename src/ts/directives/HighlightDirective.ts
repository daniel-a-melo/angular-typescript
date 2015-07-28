module SwapApp.Directives {

  interface IHighlightScope extends ng.IScope {
    value : string;
  }

  export class HighlightDirective {

    link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
    scope = {
      value : '=' //Look for an attribute with same name (value) in the element
    };

    constructor() {
      HighlightDirective.prototype.link =  ($scope: IHighlightScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        if (attrs['highLight'] === $scope.value) {
          element.css('color', 'red');
        }
      };
    }

    static create() {
      var directive = () => {
        return new HighlightDirective();
      };

      //directive.$inject = ['']; //List dependencies to be injected when needed

      return directive;
    }
  }

}
