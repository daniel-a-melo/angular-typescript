import {mainModule} from './App';
import './RouteConfig';
import './TemplatesConfig';

var angularComponentsContext = require.context('.', true, /Controller$|Filter$|Directive$|Service$/);
angularComponentsContext.keys().forEach(angularComponentsContext);


angular.element(document).ready(() => angular.bootstrap(document, [mainModule]));
