
function Dispatcher(){
  // Map of listeners
  this._listeners = [];
}

Dispatcher.prototype.dispatchAction = function (action) {
  if(this._listeners[action.type] !== undefined){
    this._listeners[action.type].map(function(elem,i){
      elem.callback.call(this,action);
    });
  }
};

Dispatcher.prototype.registerListener = function (actionType,callback) {

  if(this._listeners[actionType] === undefined)
  {
    // Initialize array of listeners for a event type
    this._listeners[actionType] = [];
  }

  this._listeners[actionType].push({callback:callback});
};

var AppDispatcher = new Dispatcher()

module.exports = AppDispatcher
