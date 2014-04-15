// The library contains all the dependencies, they are not initialized
var library = {};

var reqiredLibraries = {};

var getRequiredLibrary = function(name) {
  return reqiredLibraries[name] || reqiredLibraries[name + '/index'];
};

var getLibrary = function(name) {
  return library[name] || library[name + '/index'];
};


require = function(name, callback) {
  // XXX: Implement callback
  // if set we check locally if the dep is loaded otherwise we lazy load from
  // the server... We will load any dependencies too..
  if (typeof getLibrary(name) ==' undefined')
    throw new Error('Famono: library "' + name + '" not defined');

  // Return libraries already initialized
  if (typeof reqiredLibraries[name] !== 'undefined')
    return reqiredLibraries[name].exports;

  var f = getLibrary(name);

  // Check if the library is found
  if (typeof f !== 'function')
    throw new Error('Famono: library "' + name + '" not defined');

  // XXX: Not familiar with this - investigate when got time...
  var exports = {};

  // XXX: Should the module contain other functionalities?
  var module = {
    exports: {}
  };


  // This is the current format Famo.us uses / requireJs
  f(require, exports, module);

  // Set the now required library
  reqiredLibraries[name] = module;

  // We return the things we want to export
  return reqiredLibraries[name].exports;
};

require.load = function(deps, f) {
  throw new Error('Not implemented');
  // XXX: deps can be a string or an array of strings
  // 1. ensure all deps are loaded by checking library[]
  // 2. ensure all deps are initialized by checking reqiredLibraries[]
  // 3. run f
};

define = function(name, deps, f) {
  // XXX: We should check deps to make sure all deps are loaded before loading
  // this dep...

  // Check for function
  if (typeof f !== 'function')
    throw new Error('Famono: library "' + name + '" require a function');

  // Check library
  if (typeof library[name] !== 'undefined')
    throw new Error('Famono: library "' + name + '" already defined');

  // Register the library
  library[name] = f;
};