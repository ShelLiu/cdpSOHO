/**
 * Calendar
 * ===============
 * Author: She.L
 * Created: 2016/3/30
 * ================
 * Description:  This calendar only for SOHO project, based whit jquery and ES6.
 * History:  {date| name| subject}
 */

(function(w, d){

  /**
   * 用于存储数据的模型，返回的数据存储在events中，以“数组对象”的形式保存。
   * ===============================================================
   * This Model for storing data.
   * The returned data is stored in "events".
   * The "array of objects" in the form of preservation.
   */
  var CalendarModel = Backbone.Model.extend({

    defaults: {

      header: {
        left: 'prev,next',
        center: 'title',
        right: 'prevYear,nextYear'
      }
    },

    initialize: function(arrEvents){
      this.set({
        events: arrEvents
      });
    }

  });

  var CalendarView = Backbone.View.extend({

    initialize: function(){
      this.$el = $(d.getElementById('calendar'));
      this.$el.empty();
      this.render();
      this.listenTo(this.model, 'change', this.render);
    },

    render: function(){
      this.renderCalendar();
      return this;
    },

    renderCalendar: function(){
      this.$el.fullCalendar({
        header: this.model.get('header'),
        events: this.model.get('events')
      });
    }

  });

  /**
   *  接口
   *  =====================
   *  settings
   *  .dataURL  String
   *  .dataParams  Object
   *  (.testJSON)
   */
  function Calendar (settings){
    var self = this;

    if (settings.dataURL) {

      $.when(
        $.get(settings.dataURL, settings.dataParams || {})
      ).then(
        function(events){
          self.makeCalendar(events);
      });

    } else {

      self.makeCalendar(settings.testJSON);

    }

    return self;
  }

  Calendar.prototype.makeCalendar = function(data){

    var events = data.events || [];

    this.model = new CalendarModel(events);
    this.view = new CalendarView({
      model: this.model
    });
  };

  w.Calendar = Calendar;
}(window, document));