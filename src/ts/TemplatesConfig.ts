import {mainModule} from './App';

angular.module(mainModule).run(($templateCache : ng.ITemplateCacheService) => {
    $templateCache.put('partials/menu.html', require<string>('raw!../html/menu.html'));
    $templateCache.put('partials/footer.html', require<string>('raw!../html/footer.html'));
});
