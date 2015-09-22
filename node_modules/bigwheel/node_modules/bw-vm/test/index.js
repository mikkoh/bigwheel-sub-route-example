var vm = require( '../' );
var test = require( 'tape' );

setTimeout( function() {}, 1000 );

var manager = vm();
var idxText = 0;
var t;
var passedData = { thisWorks: true };
var section5;

var section = function( name ) {

	this.name = name;
};

section.prototype = {

	init: function( req, done ) {

		switch( idxText ) {

			case 1:
				t.equal( this.name, 'section 1', 'section 1 init' );
				t.equal( req, passedData, 'passed data' );
				done();
			break;

			case 3: 
				t.equal( this.name, 'section 2', 'section 2 init' );
				done();
			break;

			case 6:
				t.equal( this.name, 'section 5', 'section 5 init' );
				done();
				nextTest();
			break;

			case 7:
				t.fail( 'Allowed bringing in a duplicate section' );
				done();
			break;
		}
	},

	resize: function( width, height ) {

		switch( idxText ) {

			case 1:
				t.equal( width, 980, 'width is set to default' );
				t.equal( height, 570, 'height is set to default' );
			break;

			case 2:
				t.equal( width, 333, 'width is correct after resize' );
				t.equal( height, 33, 'height is correct after resize' );
				nextTest();
			break;
		}
	},

	animateIn: function( req, done ) {
		switch( idxText ) {

			case 1:
				t.equal( this.name, 'section 1', 'section 1 animateIn' );
				nextTest();
				done();
			break;

			case 3:
				t.equal( this.name, 'section 2', 'section 2 animateIn' );
				done();
				nextTest();
			break;

			case 4:
				t.equal( this.name, 'section 3', 'section 3 animateIn' );
				done();

				nextTest();
			break;

			case 6:
				t.equal( this.name, 'section 5', 'section 5 init' );
				done();
			break;
		}
	},

	animateOut: function( req, done ) {
		switch( idxText ) {

			case 3:
				t.equal( this.name, 'section 1', 'section 1 animateOut' );
				done();
			break;

			case 4:
				t.equal( this.name, 'section 2', 'section 2 animateOut' );
				done();
			break;

			case 5:
				t.equal( this.name, 'section 3', 'section 3 animateOut' );
				done();
			break;
		}
	},

	destroy: function( req, done ) {
		switch( idxText ) {

			case 3:
				t.equal( this.name, 'section 1', 'section 1 destroy' );
				done();
			break;

			case 4:
				t.equal( this.name, 'section 2', 'section 2 destroy' );
				done();
			break;

			case 5:
				t.equal( this.name, 'section 3', 'section 3 destroy' );
				done();
				nextTest();
			break;

			case 6:
				t.equal( this.name, 'section 4', 'section 4 destroy' );
				done();
			break;
		}
	}
};

function nextTest() {

	idxText++;

	switch( idxText ) {
		case 1:

			test( 'section init, animateIn, resize', function( nT ) {

				t = nT;
				t.plan( 6 );

				manager.show( new section( 'section 1' ), passedData, function() {

					t.pass( 'called onComplete' );
				});
			});
			
		break;

		case 2: 
			test( 'resize section that is in', function( nT ) {

				t = nT;
				t.plan( 2 );

				manager.resize( 333, 33 );
			});
		break;
			
		case 3:
			test( 'bring in section 2', function( nT ) {

				t = nT;
				t.plan( 4 );

				manager.show( new section( 'section 2' ) );
			});
		break;

		case 4:

			test( 'bring in section 3 without init', function( nT ) {

				t = nT;
				t.plan( 3 );

				var nSection = new section( 'section 3' );

				nSection.init = undefined;

				manager.show( nSection );
			});
		break;

		case 5:

			test( 'bring in section 4 without init, animateIn', function( nT ) {

				t = nT;
				t.plan( 2 );

				var nSection = new section( 'section 4' );

				nSection.init = undefined;
				nSection.animateIn = undefined;
				nSection.animateOut = undefined;

				manager.show( nSection );
			});
		break;

		case 6:

			test( 'bring in section 5 test skipping animateOut on section 4', function( nT ) {

				t = nT;
				t.plan( 3 );

				section5 = new section( 'section 5' );

				manager.show( section5 );
			});
		break;

		case 7:

			test( 'bring in section 5 again', function( nT ) {

				t = nT;
				t.plan( 1 );

				manager.show( section5 );

				setTimeout( function() {

					t.pass( 'Didn\'t duplicate section 5' );
				}, 33 );
			});
		break;
	}
}

nextTest();