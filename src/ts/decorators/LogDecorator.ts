// http://stackoverflow.com/questions/29775830/how-to-implement-a-typescript-decorator

namespace SwapApp.Decorators {

  export function log(target : Object, key : string, descriptor : TypedPropertyDescriptor<any>)  {

    var originalMethod = descriptor.value;

    descriptor.value =  function (...args: any[]) {
        var a = args.map(a => JSON.stringify(a)).join();
        var result = originalMethod.apply(this, args);
        var r = JSON.stringify(result);
        console.log(`Method call: ${key}(${a}) => ${r}`);
        return result;
    }

    return descriptor;

  }

}
