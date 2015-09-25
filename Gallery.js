var framework = require('./framework');
var Tween = require('gsap');

module.exports = function Gallery() {

  var container;
  var myRoute;

  return {
    init: function(req, done) {

      myRoute = req.route;
      console.log('init gallery', myRoute);

      container = document.createElement('div');
      container.id = 'galleryContainer';
      container.style.opacity = 0;
      document.body.appendChild(container);

      framework.sub('gallery', {

        '/': '/1',
        '/:id': { section: require('./GalleryItem')(container, req.route), duplicate: true }
      });

      done();
    },

    animateIn: function(req, done) {
      Tween.to(container, 0.5, { opacity: 1, onComplete: done });
    },

    animateOut: function(req, done) {
      Tween.to(container, 0.5, { opacity: 0, onComplete: done });
    },

    destroy: function(req, done) {

      console.log('destroy gallery', myRoute);

      container.parentNode.removeChild(container);

      done();
    }
  };
};