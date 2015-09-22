var bigwheel = require('bigwheel');

module.exports = bigwheel( function() {

  return {

    routes: {
      '/': '/gallery/birds/',
      '/gallery/birds/:id?': require('./Gallery'),
      '/gallery/dogs/:id?': require('./Gallery')
    }
  };
});