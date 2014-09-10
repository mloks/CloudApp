var objectId = function (object) {
  return angular.toJson(object);
};

var MessageService = function(_) {
  this.messageColection = {};
  this._ = _;
};

MessageService.$inject = ['_'];

MessageService.prototype.addMessage = function(msgObject) {
  var msgId = objectId(msgObject);
  this.messageColection[msgId] = msgObject;
};

MessageService.prototype.deleteMessage = function(msgObject) {
  delete this.messageColection[objectId(msgObject)];
};

MessageService.prototype.getMessages = function() {
  return this.messageColection;
};

MessageService.prototype.countMessages = function() {
  return this._.size(this.messageColection);
};

module.exports = MessageService;