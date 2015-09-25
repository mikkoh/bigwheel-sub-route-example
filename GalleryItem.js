var framework = require('./framework');
var Tween = require('gsap');

module.exports = function(parentContainer, type) {

  return function GalleryItem() {

    var container;
    var idx;

    return {
      init: function(req, done) {

        console.log('init gallery item', req.route, req.params.id);

        container = document.createElement('div');
        
        idx = parseInt(req.params.id);

        container.innerHTML = type + ' ' + req.params.id;
        container.style.position = 'absolute';
        container.style.top = 500 + 'px';

        parentContainer.appendChild(container);

        container.addEventListener('click', function() {

          framework.sub('gallery').go('/' + (idx + 1));
        });

        done();
      },

      animateIn: function(req, done) {
        Tween.to(container, 0.5, {top: 0, onComplete: done});
      },

      animateOut: function(req, done) {
        Tween.to(container, 0.5, {left: 500, onComplete: done});
      },

      destroy: function(req, done) {

        container.parentNode.removeChild(container);
      }
    };
  };
};