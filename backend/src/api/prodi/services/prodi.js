'use strict';

/**
 * prodi service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::prodi.prodi');
