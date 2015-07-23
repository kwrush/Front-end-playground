var Module = (function (util, config) {

  var privateMethod = function () {
    // private
  };

  var someMethod = function () {
    // public
    console.log(config);
  };

  var anotherMethod = function () {
    // public
  };
  
  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod
  };

})(_util, config);

Module.someMethod();