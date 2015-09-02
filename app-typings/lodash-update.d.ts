declare module _ {
  //_.isMatch
  interface LoDashStatic {
      /**
      * Performs a deep comparison between object and source to determine if object contains equivalent property values.
      * If customizer is provided it’s invoked to compare values. If customizer returns undefined comparisons are handled by the method instead.
      * The customizer is bound to thisArg and invoked with three arguments: (value, other, index|key).
      * @param object The object to inspect
      * @param source The object of property values to match
      * @param customizer The function to customize value comparisons
      * @param thisArg The this binding of customizer
      * @return true if object is a match, else false
      **/
      isMatch(object: Object, source : Object, customizer? : (value : any, other: any) => boolean, thisArg? : any): boolean;


      /**
      * Creates a slice of array with elements taken from the beginning. Elements are taken until predicate returns falsey. The predicate is bound to thisArg and invoked with three arguments: (value, index, array).
      *
      * If a property name is provided for predicate the created _.property style callback returns the property value of the given element.
      *
      * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for elements that have a matching property value, else false.
      *
      * If an object is provided for predicate the created _.matches style callback returns true for elements that have the properties of the given object, else false.
      * @param array The array to query
      * @param predicate The function invoked per iteration
      * @param thisArg The this binding of predicate
      * @return  Returns the slice of array
      */
      takeWhile(array : Array<any>, predicate? : Object|string|Function, thisArg? : any) : any[];
  }
}
