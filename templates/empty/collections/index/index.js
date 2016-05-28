'use strict';

class Index {

  /**
   * Handle for "GET /" endpoint
   * 
   * @returns {Object} Response content
   */
  list() {
    return {
      '/': 'Index collection',
      '/entities': 'Entities collection'
    }
  }
}

module.exports = Index;
