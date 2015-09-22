function mediator() {

  if(!( this instanceof mediator )) {

    var rVal = Object.create(mediator.prototype);
    mediator.apply(rVal, arguments);
    return rVal;
  }

  this.items = Array.prototype.slice.call(arguments);
}

mediator.prototype = {

  init: function(data, done) {
    this.callAll('init', data, done);
  },

  resize: function(w, h) {

    for(var i = 0, len = this.items.length; i < len; i++) {

      if(typeof this.items[ i ].resize === 'function') {
        this.items[ i ].resize(w, h);
      }
    }
  },

  animateIn: function(data, done) {
    this.callAll('animateIn', data, done);    
  },

  animateOut: function(data, done) {
    this.callAll('animateOut', data, done);
  },

  destroy: function(data, done) {
    this.callAll('destroy', data, done);
  },

  callAll: function(func, data, done) {

    var numCalled = 0;
    var numToCall = 0;
    var i;
    var len;

    this.items.forEach(function(section) {

      if(typeof section[ func ] === 'function') {
        numToCall++;
      }
    });

    // if there are no functions to call simply just return
    if(numToCall === 0) {

      done();
    } else {

      this.items.forEach(function(section) {

        if(typeof section[ func ] === 'function') {
          section[ func ].call(section, data, onSectionDone);
        }
      });
    }

    function onSectionDone() {

      if(++numCalled === numToCall) {
        done();
      }
    }
  }
};

module.exports = mediator;