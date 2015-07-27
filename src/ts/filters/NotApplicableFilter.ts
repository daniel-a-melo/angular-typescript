module SwapApp.Filters {

  @at.filter(SwapApp.mainModule, 'naFilter')
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

}
