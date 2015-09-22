# bw-vm

[![browser support](https://ci.testling.com/bigwheel-framework/bw-vm.png)
](https://ci.testling.com/bigwheel-framework/bw-vm)

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

`bw-vm` is a view manager. It's main purpose is to bring in and take out views/sections.

`bw-vm` has no ties to the browser and so can be used in environments that have no ties to the browser. 
For instance you could use it in a command line application or [cocoonjs](https://www.ludei.com/cocoonjs/).

Views/sections are objects which may have the functions `init`, `resize`, `aniIn`, `aniOut`, `destroy` defined.

`bw-vm` will call those functions in sequence `init`, `resize`, `aniIn`, `aniOut`, `destroy`. `aniOut` and `destroy`
will not be called until the next view/section comes in.

## Usage

[![NPM](https://nodei.co/npm/bw-vm.png)](https://www.npmjs.com/package/bw-vm)

### Example
```javascript
var viewmanager = require( 'bw-vm' )();

var optionalDataYouCanPass = {

  someData: './someImage.jpg' 
};

var optionalCallbackForWhenSectionIsIn = function() {};

var section1 = new Section(); // section 1 will be the initial view
var section2 = new Section(); // section 2 will be the second view

viewmanager.show( section1, optionalDataYouCanPass, optionalCallbackForWhenSectionIsIn );
viewmanager.show( section2 ); // will take out the first section and bring in the second



function Section() {};

Section.prototype = {
  
  init: function( data, done ) {

    // data == optionalCallbackForWhenSectionIsIn

    done(); // call done to ensure the viewmanager knows initialization is done
  },

  resize: function( width, height ) {

    // there is a function on the view manager which can be called to resize
    // current section it's holding.

    // by default 980x570 is passed
  },

  aniIn: function( data, done ) {

    // data == optionalCallbackForWhenSectionIsIn

    done(); // call done to ensure the viewmanager knows animate in is done
  },

  aniOut: function( data, done ) {

    // data == is the data used to bring in the next section

    done(); // call done to ensure the viewmanager knows animate out is done
  },

  destroy: function( data, done ) {

    // data == is the data used to bring in the next section

    done(); // call done to ensure the viewmanager knows when destrou is done
  }
};
```


## License

MIT, see [LICENSE.md](http://github.com/mikkoh/bw-vm/blob/master/LICENSE.md) for details.
