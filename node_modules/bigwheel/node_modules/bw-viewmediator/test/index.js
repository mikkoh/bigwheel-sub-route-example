var test = require('tape');
var mediator = require('../');

var sectionsInited = [];
var sectionsResized = [];
var sectionsAnimatedIn = [];
var sectionsAnimatedOut = [];
var sectionsDestroyed = [];

var Content = {

	init: function(data, done) {

		sectionsInited.push(this.name);
		done();
	},

	resize: function(w, h) {

		sectionsResized.push(this.name);
	},

	animateIn: function(data, done) {

		sectionsAnimatedIn.push(this.name);
		done();
	},

	animateOut: function(data, done) {

		sectionsAnimatedOut.push(this.name);
		done();
	},

	destroy: function(data, done) {

		sectionsDestroyed.push(this.name);
	}
};


var c1 = Object.create(Content);
var c2 = Object.create(Content);
var c3 = Object.create(Content);

c1.name = 'c1';
c2.name = 'c2';
c3.name = 'c3';

c2.init = undefined;
c2.destroy = undefined;

test('creating view mediator and calling its functions', function(t) {

	t.plan(4);

	var combined = mediator(c1, c2, c3);

	combined.init(null, function() {

		t.deepEqual(sectionsInited, ['c1', 'c3'], 'All sections inited');
	});
	combined.animateIn(null, function() {

		t.deepEqual(sectionsAnimatedIn, ['c1', 'c2', 'c3'], 'All sections animated in');
	});
	combined.animateOut(null, function() {

		t.deepEqual(sectionsAnimatedOut, ['c1', 'c2', 'c3'], 'All sections animated out');
	});
	combined.destroy(null, function() {});

	t.deepEqual(sectionsDestroyed, ['c1', 'c3'], 'All sections destroyed');
});