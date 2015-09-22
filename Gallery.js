var framework = require('./framework');

module.exports = function Gallery() {

  var container;
  var myRoute;

  return {
    init: function(req, done) {

      myRoute = req.route;
      console.log('init gallery', myRoute);

      container = document.createElement('div');
      container.id = 'galleryContainer';
      document.body.appendChild(container);

      framework.sub('gallery', {

        '/': '/1',
        '/:id': { section: require('./GalleryItem'), duplicate: true }
      });

      done();
    },

    destroy: function(req, done) {

      console.log('destroy gallery', myRoute);

      container.parentNode.removeChild(container);

      done();
    }
  };
};