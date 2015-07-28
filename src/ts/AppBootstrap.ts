/// <reference path="../../typings/tsd.d.ts"/>
// Reference path necessary due to command line compilation (TSC)
// Figure out it is only needed on this file and not on the others

angular.module(SwapApp.mainModule).directive("highLight", SwapApp.Directives.HighlightDirective.create());
angular.element(document).ready(() => angular.bootstrap(document, [SwapApp.mainModule]));
