var maybeEmpty = function () {
  return function (input, prm) {
    if (input === '' || !input) {
      return '(empty)';
    }
    else {
      return input;
    }
  }
};

module.exports = maybeEmpty;