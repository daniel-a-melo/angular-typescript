module SwapApp.Filters {

  export function notApplicableFilter() {
    return function (input : string) {
      if (input == 'n/a') {
        return 'Not applicable'
      } else {
        return input;
      }
    }
  }

}
