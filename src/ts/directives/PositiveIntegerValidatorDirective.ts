import {mainModule} from '../App';



//@at.directiveFactory(SwapApp.mainModule, 'positiveInteger')
export class PositiveIntegerValidatorDirective {
  restrict : string =  'A';
  require : string = 'ngModel';
  link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel : ng.INgModelController) => void;

  constructor() {
    PositiveIntegerValidatorDirective.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel : ng.INgModelController) => {
      ngModel.$validators['positive-integer'] = (modelValue: any, viewValue: string) : boolean => {
        if (modelValue !== undefined) {
          var valid = this.isPosiveInteger(modelValue);
          return valid;
        } else {
          // Custom validators should always consider undefined as valid
          return true;
        }

      };
    };

  }

  private isPosiveInteger(value : string) : boolean {
    //Source: http://www.2ality.com/2014/05/is-integer.html

    var n : number = Number(value);
    if (isNaN(n)) {
      return false;
    } else if ((typeof n === 'number') && (n % 1 === 0)) {
      return (n > 0);
    } else {
      return false;
    }

  }

  static create() {
    var directive = () => {
      return new PositiveIntegerValidatorDirective();
    };
    return directive;
  }

}

angular.module(mainModule).directive('positiveInteger', PositiveIntegerValidatorDirective.create());
