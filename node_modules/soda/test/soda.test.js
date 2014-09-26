
/**
 * Module dependencies.
 */

var soda = require('../');

module.exports = {
  'test .version': function(assert){
    assert.match(soda.version, /^\d+\.\d+\.\d+$/);
  }
};