function ViewManager( settings ) {

  if( !( this instanceof ViewManager ) ) {
    return new ViewManager( settings );
  }

  var s = this.s = settings || {};

  s.overlap = s.overlap === undefined ? true : s.overlap;
  s.width = s.width || 980;
  s.height = s.height || 570;

  this.cContent = null;
  this.nContent = null;
}

var p = ViewManager.prototype = {

  show: function( content, data, onComplete ) {

    // check if data was passed in
    if( onComplete === undefined &&
      typeof data == 'function' ) {

      onComplete = data;
      data = null;
    }

    this.data = data;

    if( content != this.nContent && content != this.cContent ) {

      if( this.nContent && this.nContent.destroy )
        this.nContent.destroy(this.data, function() { });

      this.nContent = content;

      if( content.init ) {

        content.init( this.data, this.swap.bind( this, this.nContent, onComplete ) ); 
      } else {

        this.swap( this.nContent, onComplete );
      }
    }
  },

  clear: function( onComplete ) {

    if( this.nContent && this.nContent.destroy ) {
      this.nContent.destroy( this.data, function() { } );
    }

    if( this.cContent ) {

      var onOldOut = function( oldContent ) {

        if( oldContent.destroy ) {
          oldContent.destroy( this.data , function() { } );
        }

        if( onComplete ) {
          onComplete( oldContent );
        }
      }.bind( this, this.cContent );

      // now take out countent
      if( this.cContent.animateOut ) {
        this.cContent.animateOut( this.data , onOldOut );
      } else {
        onOldOut();
      }
    }
  },

  resize: function( width, height ) {

    var s = this.s;

    s.width = width;
    s.height = height;

    if( this.cContent && this.cContent.resize )
      this.cContent.resize( width, height );
  },

  swap: function( newContent, onComplete ) {

    if( newContent == this.nContent ) {

      var s = this.s;
      var oldContent = this.cContent;
      var onOldOut;

      var onNewIn = function() {

        if( s.onEndAniIn ) {
          s.onEndAniIn( newContent, oldContent );
        }

        if( onComplete ) {
          onComplete( newContent, oldContent );
        }
      };

      var bringInNewContent = function() {

        if( s.onStartAniIn ) {
          s.onStartAniIn( newContent, this.cContent );
        }

        this.cContent = newContent;
        this.nContent = null;

        if( newContent.animateIn ) {
          newContent.animateIn( this.data, onNewIn );  
        } else {
          onNewIn();
        }
      }.bind( this );

      var takeOutOldContent = function() {

        if( s.onStartAniOut ) {
          s.onStartAniOut( newContent, oldContent );
        }

        // if there's an animateOut function execute it on oldContent
        if( oldContent.animateOut ) {
          oldContent.animateOut( this.data, onOldOut );
        } else {
          onOldOut();
        }
      }.bind( this );

      var destroyOldContent = function() {

        if( s.onEndAniOut ) {
          s.onEndAniOut( newContent, oldContent );
        }

        if( oldContent.destroy ) {
          oldContent.destroy( this.data, function() { } );
        }
      }.bind( this );


      // resize the newContent if it has a resize method
      if( newContent.resize ) {
        newContent.resize( s.width, s.height );
      }

      // check if there's content on screen already
      if( this.cContent ) {

        if( s.overlap ) {

          onOldOut = destroyOldContent;
        } else {

          onOldOut = function() {

            destroyOldContent();
            bringInNewContent();
          }.bind(this);
        }

        // call the callback to notify that we've started animating out
        takeOutOldContent();

        if( s.overlap ) {

          bringInNewContent();
        }
      // else we don't have current content just bring in the new
      } else {

        bringInNewContent();
      }
    }
  }
};

Object.defineProperty(p, 'overlap', {
  get: function() {
    return this.s.overlap;
  },

  set: function(value) {
    this.s.overlap = value;
  }
});

module.exports = ViewManager;