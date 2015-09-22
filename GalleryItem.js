var framework = require('./framework');

module.exports = function GalleryItem() {

  var container;
  var idx;

  return {
    init: function(req, done) {

      console.log('init gallery item', req.route, req.params.id);

      container = document.createElement('div');
      
      idx = parseInt(req.params.id);

      container.innerHTML = req.params.id;

      document.getElementById('galleryContainer').appendChild(container);

      container.addEventListener('click', function() {

        framework.sub('gallery').go('/' + (idx + 1));
      });

      done();
    },

    destroy: function(req, done) {

      container.parentNode.removeChild(container);
    }
  };
};