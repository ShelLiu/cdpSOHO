/**
 * Calendar
 * ===============
 * Author: She.L
 * Created: 2016/3/30
 * ================
 * Description:  This calendar only for SOHO project.
 * History:  {2016/4/10| She.L| custom special date'background-color @vct_date, @vct_color }
 */

(function(w, d){

  /**
   * Model
   * ============================
   * @defaults  罗列所有需要使用的参数
   * @changeData  更新数据（method）
   */
  var CalendarModel = Backbone.Model.extend({

    defaults: {

      header: {
        right: 'prev,next',
        center: '',
        left: 'title'
      },

      vct_date: [],

      vct_color: "#D8D8D8",

      events: [],

      defaultDate: undefined

    },

    changeData: function(data){

      this.set(data);

      if (this.get('vct_color') == ""){

        this.set('vct_color', '#D8D8D8');
      }
      if(this.get('defaultDate') ==""){

        this.set('defaultDate', undefined);
      }

    }

  });

  /**
   * View
   * ================
   * @initialize 注意！实例化CalendarView时，要求页面中存在一个id为calendar的元素
   * -- listenTo 用于绑定对象事件（非己）
   * @re_render  每一次渲染前先销毁历史对象
   */
  var CalendarView = Backbone.View.extend({
    //this指代被实例化的CalendarView对象

   id: 'calendar_soho',

    initialize: function(){

      this.holder = d.getElementById('calendar');
      this.render();
      this.listenTo(this.model, 'change', this.re_render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(){

      $(this.holder).empty().append(this.$el);
      this.renderCalendar();
      this.renderBackground();
      return this;
    },

    renderCalendar: function(){

      this.$el.fullCalendar({
        header: this.model.get('header'),
        events: this.model.get('events'),
        defaultDate: this.model.get('defaultDate')
      });
    },

    renderBackground: function(){

      var vct_color = this.model.get('vct_color');
      var vct_date = this.model.get('vct_date') || [];

      _.each(vct_date, function(element, index, list){

        _.each($("td[data-date]"), function(item, index, list){

          if($(item).attr("data-date") == element){
            $(item).css("background-color", vct_color);
          }
        });
      });
    },

    re_render: function(){

      this.$el.fullCalendar('destroy');
      this.render();
      return this;
    }

  });

  /**
   *  API
   *  =====================
   *   @jQuery.when(deferreds)
   *   --  参数deferreds，一个或多个延时对象或JS对象，我们初略的认为它就是一个或多个异步请求。
   *   --  when()函数常常和done()函数、fail()函数、then()函数联合使用
   *       -- done(Function func) - 当deferreds中的处理都完成的时候执行Function回调函数
   *       -- fail(Function func) - 当deferreds中有一个处理失败的时候执行Function回调函数
   *       -- then(Function func1,Function func2)- 结合了done和fail函数，当都成功执行func1，当有一个失败执行func2
   *
   *   @Calendar
   *   --  流程:
   *      >>  配置参数“self.settings”
   *      >>  发送请求“$.post”
   *      >>  保存响应
   *      >>  生成日历页面“self.makeCalendar”
   *      >>  绑定事件监听“delegate”
   *      >>  返回实例
   *   -- settings:
   *     >>  dataURL:  请求地址
   *     >>  dataParams:  携带参数
   */
  function Calendar (settings){
    //self 指代被实例化的日历

    var self = this;
    self.settings = settings;

    $.when(

      $.post(self.settings.dataURL, {"dataParams": self.settings.dataParams || {}}, function(data, textStatus){

        self.data = data;
        self.status = textStatus;
      })
    ).done(

      function(){

        self.makeCalendar(self.data);
      }
    ).done(

      function(){

        self.view.$el.delegate('div.fc-button-group','click', function(){

          var currentDate = self.view.$el.fullCalendar('getDate').toDate();
          self.settings.dataParams = currentDate.getFullYear()+ "-" + (currentDate.getMonth()+1);

          $.when(

            $.post(self.settings.dataURL, {"dataParams": self.settings.dataParams || {}}, function(data, textStatus){

              self.data = data;
              self.status = textStatus;
            })
          ).done(

            function(){

              self.model.changeData(self.data);
            }
          );
        });
      }
    );

    return self;
  }

  Calendar.prototype.makeCalendar = function(data){
    //this 指代被实例化的日历

    this.model = new CalendarModel(data);
    this.view = new CalendarView({
      model: this.model
    });
  };

  w.Calendar = Calendar;
}(window, document));