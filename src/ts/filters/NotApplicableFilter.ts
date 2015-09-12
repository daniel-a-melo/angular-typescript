module SwapApp.Filters {

  export class NotApplicableFilter {

    @at.filter(SwapApp.mainModule, 'naFilter')
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

}
