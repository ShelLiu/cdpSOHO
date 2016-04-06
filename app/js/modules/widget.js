/**
 * CDP Cloud Rebuilt
 * ===================
 * Widgets
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/10
 * ===================
 * - WidgetModel
 * - WidgetView
 * - WidgetList
 * - WidgetListView
 */

(function (w, d) {

  /**
   * WidgetModel
   */

  var WidgetModel = Backbone.Model.extend({

    defaults: {
      id: 0,
      name: '',
      src: '',
      content: '',
      closeable: true,
      maximizable: true,
      favourable: true
    }
  });

  /**
   * WidgetView
   */

  var WidgetView = Backbone.View.extend({

    tagName: 'li',
    className: 'widget',

    template: JST.widgetContent,

    events: {

    },

    initialize: function () {
      var model = this.model;

      // Load widget content
      $.get(model.get('src'))
        .done(function (data) {
          model.set('content', data);
        });

      this.listenTo(model, "change:content", this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      $(w).trigger('change:' + this.model.get('name'));
      return this;
    }
  });


  // ----- WidgetModel end ----- //

  // ----- WidgetView end ----- //


  /**
   * WidgetList
   */

  var WidgetList = Backbone.Collection.extend({
    model: WidgetModel
  });

  // ----- WidgetList end ----- //


  /**
   * WidgetListView
   */

  var WidgetListView = Backbone.View.extend({

    $list: $('#page-widgets'),
    loadedWidgets: 0,

    screenBoundaries: (function () {

      // For IE8- that won't support media query
      if ($('html').hasClass('lt-ie9')) {
        return [0, 0];
      } else {
        return [768, 1200];
      }
    }()),

    initialize: function () {
      this.render();
      this.bindEvents();
    },

    bindEvents: function () {
      var self = this;

      $(w).on('resize', function () {
        self.relocate();
      });
    },

    render: function () {
      this.widgetCount = this.collection.length;
      this.listenTo(this.collection, 'change', this.relocate);

      this.collection.each(function (model) {
        this.renderWidget(model);
      }, this);
    },

    renderWidget: function (model) {
      var $widget = new WidgetView({
        model: model
      }).render().$el,
          $list = this.$list,
          self = this;

      $list.append($widget);

      // Refresh widget height after all contents are loaded
      model.on('change:content', function () {
        self.loadedWidgets += 1;

        if (self.loadedWidgets === self.widgetCount) {
          setTimeout(function () {
            self.relocate();
          }, 0);
        }
      });
    },


    /**
     * After all widgets are loaded
     * Relocate the widgets
     */
    relocate: function () {
      var $widgets = this.$list.find('.widget'),
          screenWidth = w.innerWidth || $(w).width(),
          listWidth = this.$list.width(),
          cols = this.getCol(screenWidth),
          widgetWidth = listWidth / cols,
          heightCache = _.makeArray(cols, 0);

      $widgets.each(function () {
        var $widget = $(this),
            top = _.min(heightCache),
            colIndex = _.indexOf(heightCache, top),
            left = colIndex * widgetWidth;

        $widget.css({
          width: widgetWidth,
          top: top,
          left: left
        });

        heightCache[colIndex] = heightCache[colIndex] + $widget.height();
      });

      this.$list.height(_.max(heightCache));
    },


    /**
     * Calculate column counts according to screen width
     * @param screenWidth {number}
     * @returns {number}
     */
    getCol: function (screenWidth) {
      var len = this.screenBoundaries.length,
          i;

      for (i = 0; i < len; i += 1) {

        if (screenWidth <= this.screenBoundaries[i]) {
          return (i + 1);
        }
      }

      return (len + 1);
    }
  });

  // ----- WidgetListView end ----- //


  // Expose
  w.WidgetList = WidgetList;
  w.WidgetListView = WidgetListView;
}(window, document));
