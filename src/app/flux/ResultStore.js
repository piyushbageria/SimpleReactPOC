var Dispatcher = require('./Dispatcher');
var SearchAction = require('./Action');

function ResultStore(){
  this._list =  [
    {name:'John'},
    {name:'Jane'},
    {name:'Peter'},
    {name:'Liz'},
    {name:'Serena'},
    {name:'Tim'},
    {name:'Robert'},
    ];

  var self = this;
  //create a back up of this list So that we can always revert back to original list
  this._originalList = [];

  this._list.map(function(item,i){
    //Deep copy
      self._originalList.push(item);
  });


  Dispatcher.registerListener(SearchAction.type,function (action) {    
    var filteredList = self._originalList.filter(function(elem){
      if(elem.name.toLowerCase().match(action.searchString.toLowerCase())){
        return true;
      }
      else {
        return false;
      }
    });
    self._list = filteredList;
    self.emitChange();
  });
}

ResultStore.prototype.getList = function () {
  return this._list;
};

ResultStore.prototype.emitChange = function () {
  this._callbackHandler.map(function(callback,i){
    callback.call(undefined);
  });
};
ResultStore.prototype.onChange = function (callback) {
  if(this._callbackHandler === undefined){
    this._callbackHandler = [];
  }
  this._callbackHandler.push(callback);
};

var SearchResultStore = new ResultStore();

module.exports = SearchResultStore;
