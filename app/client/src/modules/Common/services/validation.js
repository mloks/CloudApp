var ValidationService = function() {};

ValidationService.$inject = [];

ValidationService.prototype.minLength = function(value, length){
  return (value && value.length >= length ? 'valid' : undefined);
};

ValidationService.prototype.matchRegex = function(value, regex){
  return (value && regex.test(value)) ? undefined : 'valid';
};

module.exports = ValidationService;