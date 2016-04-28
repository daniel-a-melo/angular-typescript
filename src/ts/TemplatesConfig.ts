import {mainModule} from './AppConfig';

angular.module(mainModule).run(($templateCache : ng.ITemplateCacheService) => {
    $templateCache.put('partials/menu.html', require('raw!../html/menu.html'));
    $templateCache.put('partials/footer.html', require('raw!../html/footer.html'));
});
