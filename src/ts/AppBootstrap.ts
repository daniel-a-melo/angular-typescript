/// <reference path="../../typings/tsd.d.ts"/>
// Reference path necessary due to command line compilation (TSC)
// Figure out it is only needed on this file and not on the others

import {mainModule} from './App';
import './services/StarWarsService';
import './filters/NotApplicableFilter';
import './directives/HighlightDirective';
import './directives/PositiveIntegerValidator';
import './controllers/SpeciesListController';
import './controllers/SpeciesFormController';
import './controllers/MenuController';
import './RouteConfig';
import './TemplatesConfig';


angular.element(document).ready(() => angular.bootstrap(document, [mainModule]));
