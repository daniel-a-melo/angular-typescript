/// <reference path="../../typings/tsd.d.ts"/>
// Reference path necessary due to command line compilation (TSC)
// Figure out it is only needed on this file and not on the others

import {mainModule} from './App';
import './RouteConfig';
import './TemplatesConfig';

var angularComponentsContext = require.context('.', true, /Controller$|Filter$|Directive$|Service$/);
angularComponentsContext.keys().forEach(angularComponentsContext);


angular.element(document).ready(() => angular.bootstrap(document, [mainModule]));
