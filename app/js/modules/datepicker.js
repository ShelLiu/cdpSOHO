/**
 * Date Picker
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/27
 * ===================
 * = DatePickerModel
 * = DatePickerView
 */

(function (w, d) {

  var DatePickerModel,
      DatePickerView,
      DatePickerInstance,
      DatePicker;


  /**
   * DatePickerModel
   */

  DatePickerModel = Backbone.Model.extend({

    defaults: {
      currentDate: new Date(),
      weekTitle: ['weekSunS', 'weekMonS', 'weekTueS', 'weekWedS', 'weekThuS', 'weekFriS', 'weekSatS'],
      monthTitle: ['monthJanS', 'monthFebS', 'monthMarS', 'monthAprS', 'monthMayS', 'monthJunS', 'monthJulS', 'monthAugS', 'monthSepS', 'monthOctS', 'monthNovS', 'monthDecS'],
      validation: {}
    },

    initialize: function () {
      this.update();
    },


    /**
     * 1. update()
     *    - update model with current date
     * 2. update(Date)
     */
    update: function () {
      var date;

      if (arguments.length && _.isDate(arguments[0])) {

        // 2
        date = arguments[0];
      } else {

        // 1
        date = new Date(this.get('currentDate'));
      }

      this.set({
        currentDate: date,
        year: date.getFullYear(),
        month: date.getMonth(),
        lastMonthDates: this.getLastMonthDates(date),
        thisMonthDates: this.getThisMonthDates(date),
        decade: this.getDecade(date)
      });
    },

    getLastMonthDates: function (date) {
      var day = new Date(new Date(date).setDate(1)).getDay(),
          lastMonthStart = new Date(new Date(date).setDate(-1 * day + 1));
      lastMonthDates = [];

      while (lastMonthStart.getMonth() !== date.getMonth()) {
        lastMonthDates.push(new Date(lastMonthStart));
        lastMonthStart = new Date(lastMonthStart.setDate(lastMonthStart.getDate() + 1));
      }

      return lastMonthDates;
    },

    getThisMonthDates: function (date) {
      var thisMonthStart = new Date(new Date(date).setDate(1)),
          thisMonthDates = [];

      while(thisMonthStart.getMonth() === date.getMonth()) {
        thisMonthDates.push(new Date(thisMonthStart));
        thisMonthStart = new Date(thisMonthStart.setDate(thisMonthStart.getDate() + 1));
      }

      return thisMonthDates;
    },

    getDecade: function (date) {
      var currentYear = date.getFullYear(),
          start = currentYear - currentYear % 10,
          last = start + 10,
          decade = [];

      while (start !== last) {
        decade.push(start);
        start += 1;
      }

      return decade;
    }
  });

  // ----- DatePickerModel end ----- //


  /**
   * DatePickerView
   */

  DatePickerView = Backbone.View.extend({

    pickerTpl: JST.datePicker,
    dayListTpl: JST.datePickerDayList,
    monthListTpl: JST.datePickerMonthList,
    yearListTpl: JST.datePickerYearList,

    events: {
      'click .form-date-year-current': 'openDecade',
      'click .form-date-month-current': 'openMonths',
      'click .form-date-last': 'pickLastMonth',
      'click .form-date-next': 'pickNextMonth',
      'click .form-month-last': 'pickLastYearMonths',
      'click .form-month-next': 'pickNextYearMonths',
      'click .form-decade-last': 'pickLastDecade',
      'click .form-decade-next': 'pickNextDecade',
      'click .date-pick-years a': 'pickYear',
      'click .date-pick-months a': 'pickMonth',

      // Return date
      'click .date-picker-dates a': 'pickDate',
      'click .date-picker-clear button': 'clearDate'
    },

    initialize: function () {
      this.model = new DatePickerModel();

      this.$el = $(this.pickerTpl());
      this.$dayList = this.$el.children('.date-picker-day-list');
      this.$monthList = this.$el.children('.date-picker-month-list');
      this.$yearList = this.$el.children('.date-picker-year-list');

      this.render();

      this.$el.appendTo('body');

      this.listenTo(this.model, 'change', this.render);
      this.bindOuterEvents();
    },

    render: function () {
      this.renderDay();
      this.renderMonth();
      this.renderYear();

      CDP.setLang(this.$el);
      return this;
    },

    renderDay: function () {
      this.$dayList.html(this.dayListTpl(this.model.toJSON()));
    },

    renderMonth: function () {
      this.$monthList.html(this.monthListTpl(this.model.toJSON()));
    },

    renderYear: function () {
      this.$yearList.html(this.yearListTpl(this.model.toJSON()));
    },

    // Click on an input with class 'datepicker'
    // will open the board
    bindOuterEvents: function () {
      var self = this;

      $(d).on('click', '.datepicker', function (e) {
        var $input = $(this),
            pos,
            oldDate;

        e.stopPropagation();

        self.$currentInput = $input;

        // Show
        if (!self.$el.hasClass('opened')) {
          pos = self.$currentInput.offset();
          oldDate = new Date(self.$currentInput.val());

          if (isNaN(oldDate.getTime())) {
            oldDate = new Date();
          }

          // update validation value
          $input.data('min') && (self.model.get('validation').min = new Date($input.data('min')));
          $input.data('max') && (self.model.get('validation').max = new Date($input.data('max')));

          // update model with $input value (selected date)
          self.model.update(oldDate);

          self.$el.css({
            left: pos.left,
            top: pos.top + self.$currentInput.outerHeight() - 1
          }).removeClass('hidden').addClass('opened');
        } else {
          self.hidePicker();
        }
      });

      // Hide
      $(document).on('click', function () {
        self.hidePicker();
      });

      this.$el.on('click', function (e) {
        e.stopPropagation();
      });
    },

    openDecade: function () {
      this.$el.removeClass('day month year').addClass('year');
    },

    openMonths: function () {
      this.$el.removeClass('day month year').addClass('month');
    },

    pickYear: function (e) {
      var year = e.target.innerHTML,
          pickedDate = new Date(new Date(this.model.get('currentDate')).setFullYear(year));

      this._updateDate(pickedDate);
    },

    pickMonth: function (e) {
      var $li = $(e.target).parent(),
          month = $li.parent().find('li').index($li),
          pickedDate = new Date(new Date(this.model.get('currentDate')).setMonth(month));

      this._updateDate(pickedDate);
    },

    pickLastMonth: function (e) {
      var month = this.model.get('month'),
          year = this.model.get('year'),
          date = this.model.get('currentDate').getDate(),
          newMonth = month - 1 < 0 ? 11 : month - 1,
          newYear = newMonth === 11 ? year - 1 : year,
          newDate = Math.min(date, new Date(new Date(this.model.get('currentDate')).setFullYear(newYear, newMonth + 1, 0)).getDate());
      pickedDate = new Date(new Date(this.model.get('currentDate')).setFullYear(newYear, newMonth, newDate));

      this._updateDate(pickedDate);
    },

    pickNextMonth: function (e) {
      var month = this.model.get('month'),
          year = this.model.get('year'),
          date = this.model.get('currentDate').getDate(),
          newMonth = month + 1 > 11 ? 0 : month + 1,
          newYear = newMonth === 0 ? year + 1 : year,
          newDate = Math.min(date, new Date(new Date(this.model.get('currentDate')).setFullYear(newYear, newMonth + 1, 0)).getDate());
      pickedDate = new Date(new Date(this.model.get('currentDate')).setFullYear(newYear, newMonth, newDate));

      this._updateDate(pickedDate);
    },

    pickLastYearMonths: function () {
      var year = this.model.get('year') - 1;

      this._updateMonths(year);
    },

    pickNextYearMonths: function () {
      var year = this.model.get('year') + 1;

      this._updateMonths(year);
    },

    pickLastDecade: function () {
      var year = this.model.get('year') - 10;

      this._updateDecade(year);
    },

    pickNextDecade: function () {
      var year = this.model.get('year') + 10;

      this._updateDecade(year);
    },

    // Return the picked date
    pickDate: function (e) {
      var date = e.target.innerHTML,
          pickedDate = new Date(this.model.get('currentDate').setDate(date));

      if (!$(e.target).parent().hasClass('disabled')) {
        this.model.set('currentDate', pickedDate);

        this.$currentInput.val(_.timeSecToStr(pickedDate.valueOf() / 1000)).trigger('change');

        this.hidePicker();
      }
    },

    // Clear Date
    clearDate: function (e) {
      this.$currentInput.val('').trigger('change');
      this.hidePicker();
    },

    hidePicker: function () {
      var self = this;

      self.$el.removeClass('opened');

      setTimeout(function () {
        self.$el.addClass('hidden');
      }, 200);
    },

    _updateDecade: function (year) {
      var pickedDate = new Date(this.model.get('currentDate').setFullYear(year));

      this.model.update(pickedDate);
      this.$el.removeClass('day month year').addClass('year');
    },

    _updateMonths: function (year) {
      var pickedDate = new Date(this.model.get('currentDate').setFullYear(year));

      this.model.update(pickedDate);
      this.$el.removeClass('day month year').addClass('month');
    },

    _updateDate: function (pickedDate) {
      this.model.update(pickedDate);
      this.$el.removeClass('month year').addClass('day');
    }
  });

  // ----- DatePickerView end ----- //


  /**
   * DatePicker
   * ----------
   * Only one DatePickerInstance is allowed on the page
   * returns the Model object
   */

  DatePicker = function () {

    if (!DatePickerInstance) {
      DatePickerInstance = new DatePickerView().model;
    }

    w.DatePickerInstance = DatePickerInstance;
  };

  // ----- DatePicker end ----- //


  w.DatePicker = DatePicker;
}(window, document));
