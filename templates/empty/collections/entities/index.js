'use strict';

const ENTITIES = require('./entities.json');

class Entities {

  constructor(locator) {
    this._logger = locator.resolve('logger');
  }

  /**
   * Handle for "GET /:id" endpoint
   *
   * @returns {Object} Response content
   */
  one() {
    const id = this.$context.state.id;

    if (!ENTITIES[id]) {
      return this.$context.notFound();
    }

    this._logger.trace('get entity');

    return ENTITIES[id];
  }

  /**
   * Handle for "GET /" endpoint
   *
   * @returns {Object} Response content
   */
  list() {
    this._logger.trace('get list of entities');

    return ENTITIES;
  }

  /**
   * Handle for "POST /" endpoint
   *
   * @returns {Object} Response content
   */
  create() {
    const index = ENTITIES.push(this.$context.request.body);

    this._logger.trace('create entity');

    this.$context.response.setStatus(201);

    return ENTITIES[index];
  }

  /**
   * Handle for PUT "/:id" endpoint
   *
   * @returns {Object} Response content
   */
  update() {
      const id = this.$context.state.id;

      if (!ENTITIES[id]) {
        return this.$context.notFound();
      }

      ENTITIES[id] = this.$context.request.body;

      this._logger.info('update entity');

      return ENTITIES[id];
  }

  /**
   * Handle for DELETE "/:id"
   *
   * @returns {Object} Response content
   */
  delete() {
    const id = this.$context.state.id;

    if (!ENTITIES[id]) {
      return this.$context.notFound();
    }

    ENTITIES.splice(id, 1);

    this._logger.info('delete entity');
  }
}

module.exports = Entities;
