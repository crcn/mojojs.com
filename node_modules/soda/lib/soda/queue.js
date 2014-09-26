var Queue = module.exports = function() {
  this.stack = [];
}


Queue.prototype.add = function(fn) {
  var self = this;

  this.stack.push(function(err) {
    function onDone(err) {
      if(self.stack.length) {
        self.stack.shift()(err); 
      } else {
        self._running = false;
      }
    }
    
    try {
      fn(err, onDone);
    } catch(e) {
      onDone(e);
    }
  });


  if(!this._running) {
    this._running = true;
    this.stack.shift()();
  }

  return this;
}


Queue.prototype.before = function(fn) {
  var n = this.stack.length;
  fn();
  var newItems = this.stack.splice(n, this.stack.length);
  this.stack = newItems.concat(this.stack);
}



Queue.mixin = function(prototype) {

  prototype.next = function(fn) {
    this._queue.add(fn);
    return this;
  }


  prototype.end = function(fn) {
    return this.next(function(err, next) {
      fn(err, !err);
      next();
    })
  }

  prototype.nextSuccess = function(fn) {
    return this.next(function(err, next) {
      if(err) return next(err);
      fn(next);
    });
  }

  prototype.nextError = function(fn) {
    return this.next(function(err, next) {
      if(err) return fn(err, next);
      next(err);
    })
  }

  prototype.before = function(cb) {
    this._queue.before(cb);
    return this;
  }
}


