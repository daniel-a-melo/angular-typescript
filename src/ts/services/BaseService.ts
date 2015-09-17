namespace SwapApp.Services {

  export class BaseService {

    constructor(protected $q: ng.IQService, protected $http: ng.IHttpService) {

     }

    protected getServiceData<T>(url: string) :ng.IPromise<T> {

      var deferred: ng.IDeferred<T> = this.$q.defer();

      this.$http({url: url, method: 'GET'})
         .success((data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) : void => {
           deferred.resolve(data);
         })
         .error((data: T, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig) : void => {
           deferred.reject(data);
         });

       return deferred.promise;
    }

  }

}
