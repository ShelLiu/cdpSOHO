/**
 * CDP Cloud Rebuilt
 * ====================
 * Backbone extension
 * ====================
 * Author: Ash Zhang
 * Created: 2014/06/30
 * ====================
 * - Backbone.Model.fullExtend(settings)
 */


/**
 * Model inheritance
 * @param settings {obj}
 * @returns {Model}
 */
Backbone.Model.fullExtend = function (settings) {
  var extended = Backbone.Model.extend.call(this, settings),
      prop;

  // Link to parent object
  extended.parent = this.prototype;

  // Copy all default values to the child model
  settings.defaults = settings.defaults || {};

  for (prop in this.prototype.defaults) {

    if (!extended.prototype.defaults[prop] && this.prototype.defaults.hasOwnProperty(prop)) {

      extended.prototype.defaults[prop] = this.prototype.defaults[prop];
    }
  }

  return extended;
};


/**
 * View inheritance
 * @param settings {obj}
 * @returns {View}
 */
Backbone.View.fullExtend = function (settings) {
  var extended = Backbone.View.extend.call(this, settings),
      prop;

  // Link to parent object
  extended.parent = this.prototype;

  return extended;
};
