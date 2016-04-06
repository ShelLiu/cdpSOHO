/**
 * Tab
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/20
 * ===================
 * - TabModel
 * options: {
 *   $tab: {jQuery},      // Tab holder
 *   minHeight: {number}
 * }
 */

(function (w, d) {

  var TabModel;


  /**
   * TabModel
   */

  TabModel = Backbone.Model.extend({

    defaults: {
      tabList: []
    }
  });

  // ----- TabModel end ----- //


  var defaults = {
    $tab: $(d),
    minHeight: 200
  };

  function Tab(options) {
    options = $.extend(defaults, options);

    this.$tab = options.$tab;
    this.$tabHeader = this.$tab.find('.tab-header');
    this.$tabContent = this.$tab.find('.tab-content');

    this.isVertical = this.$tab.hasClass('tab-v');
    this.minHeight = options.minHeight;

    this._init();
  }

  Tab.prototype._init = function () {
    this._initHeight();
    this._bindEvents();
  };

  // Make $tabContent the same height as the highest tag page
  Tab.prototype._initHeight = function () {
    var height;

    this.$tabContent.css({
      minHeight: this.minHeight
    })
      .find('.tab-page').css({
        bottom: 0
      });

    height = _.max(_.map(this.$tabContent.find('.tab-page'), function (page) {
      return $(page).outerHeight();
    }));

    this.$tabContent.height(height);

    if (this.isVertical) {
      this.$tabHeader.height(height);
    }
  };

  Tab.prototype._bindEvents = function () {
    var self = this;

    // Toggle Pages
    this.$tabHeader.on('click', 'li', function () {
      var $header = $(this),
          pageID = +$header.data('tabPage'),
          $page = self.$tabContent.find('[data-tab-page= ' + pageID + ']');

      $header.addClass('active').siblings().removeClass('active');
      $page.addClass('active').siblings().removeClass('active');
    });
  };

  w.Tab = Tab;
}(window, document));
