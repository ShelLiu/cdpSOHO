/**
 * Form
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/24
 * ===================
 * = FormElement
 * = FormElementView
 * = FormView
 */

(function (w, d) {

  var ControlModel,
      ControlView,
      Ctrl = {},
      FormElement,
      FormElementView,
      Form;


  /**
   * ControlModel
   * - Basic components
   * -----------
   * type:
   *   ~ button (button, submit, reset)
   *   ~ input (text, number, textarea)
   *   ~ check (checkbox, radio)
   *   ~ select
   *   ~ date
   */

  ControlModel = Backbone.Model.extend({

    defaults: {

      // Common properties
      layout: '',
      type: '',
      id: '',
      name: '',
      className: '',
      value: '',
      valueLocaleKey: '',
      label: '',
      labelLocaleKey: '',
      disabled: false,

      // Validation
      validation: {},

      // Array of name/msg pairs
      invalidMsg: []
    },

    initialize: function () {
      this.on('change:value', this.validate);
    },

    validate: function () {
      var value = $.trim(this.get('value'));

      this.set('invalidMsg', [], {
        silent: true
      });

      this.validateRequired(value, this.get('validation').required);
      this.validateMinlength(value, parseInt(this.get('validation').minlength, 10));
      this.validateMaxlength(value, parseInt(this.get('validation').maxlength, 10));
      this.validateMin(value, parseInt(this.get('validation').min, 10));
      this.validateMax(value, parseInt(this.get('validation').max, 10));
      this.validatePattern(value, this.get('validation').pattern);

      this.trigger(this.get('invalidMsg').length ? 'invalid' : 'valid');

      return this.get('invalidMsg');
    },

    validateRequired: function (value, required) {

      if (required && value.length === 0) {
        this.get('invalidMsg').push('* Required field doesn\'t have value.');
      }
    },

    validateMinlength: function (value, minlength) {

      if (minlength && value.length < minlength) {
        this.get('invalidMsg').push('* Too short.');
      }
    },

    validateMaxlength: function (value, maxlength) {

      if (maxlength && value.length > maxlength) {
        this.get('invalidMsg').push('* Too long.');
      }
    },

    validateMin: function (value, min) {

      if (min && value < min) {
        this.get('invalidMsg').push('* Too Small.');
      }
    },

    validateMax: function (value, max) {

      if (max && value > max) {
        this.get('invalidMsg').push('* Too Big.');
      }
    },

    validatePattern: function (value, pattern) {

      if (!(pattern instanceof RegExp)) {
        pattern = new RegExp(pattern);
      }

      if (!pattern.test(value)) {
        this.get('invalidMsg').push('* Pattern does not match.');
      }
    },

    setVal: function (val) {
      this.set('value', val);
    },

    clear: function () {
      this.setVal('');
    },

    // Historic problem
    check: function () {
      return this.validate();
    }
  });

  // ----- ControlModel end ----- //


  /**
   * ControlView
   */

  ControlView = Backbone.View.extend({

    // layout: JST
    tplMap: {
      button: JST.formButton,
      input: JST.formInputText,
      textarea: JST.formTextarea,
      checkbox: JST.formCheckRadio,
      checkList: JST.formCheckList,
      radio: JST.formCheckRadio,
      select: JST.formDropdown,
      date: JST.formDate,
      time: JST.formTime,
      startEndDate: JST.formStartEndDate,
      startEndTime: JST.formStartEndTime,
      file: JST.formFile,
      gridSelect: JST.formGridSelect
    },

    initialize: function (settings) {
      this.template = this.tplMap[this.model.get('layout')];
      this.model.view = this;
      this.listenTo(this.model, 'change', this.render);
      this.render();

      this.bindEvents();

      if (typeof this.subInit === 'function') {
        this.subInit.call(this, settings);
      }
    },

    render: function () {
      var invalidMsg = this.model.get('invalidMsg');

      // Form Element Wrapper
      if (!this.$wrapper) {
        this.$wrapper = $(JST.formControl(this.model.toJSON()));
      }

      if (this.template) {
        this.setElement(this.template(this.model.toJSON()));
        this.$wrapper.eq(1).empty().append(this.$el);

        // Validity
        if (invalidMsg.length) {
          this.$wrapper.eq(1).addClass('form-invalid');
//            .append('<p>' + invalidMsg.join(' ') + '</p>');
        } else {
          this.$wrapper.eq(1).removeClass('form-invalid');
//            .find('p').remove();
        }
      }

      if (typeof this.subRender === 'function') {
        this.subRender.call(this);
      }

      return this;
    },

    bindEvents: function () {
      var self = this,
          model = this.model;

      if (typeof model.get('onclick') === 'function') {

        this.$el.on('click', function () {
          model.get('onclick').call(self);
        });
      }

      if (typeof model.get('onchange') === 'function') {

        this.$el.on('change', function () {
          model.get('onchange').call(self);
        });
      }

      if (typeof model.get('onselect') === 'function') {

        this.$el.on('select', function () {
          model.get('onselect').call(self);
        });
      }
    }
  });

  // ----- ControlView end ----- //


  /**
   * Select Element
   * --------------
   * option format:
   * {
   *   value: '',
   *   text: '',
   *   localeKey: ''
   * }
   */
  Ctrl.SelectModel = ControlModel.fullExtend({

    defaults: {
      layout: 'select',
      list: [],         // Options
      dataURL: '',      // Get list
      readonly: false,

      // Validation
      validation: {
        required: false
      },

      // Events
      onchange: null
    },

    initialize: function () {
      this.fetchURL();
      this.checkListValidity();
      this.on('change:value', this.validateSelect);
      this.validateSelect();
    },

    fetchURL: function () {
      var self = this;

      if (this.get('dataURL').length > 0) {

        $.get(this.get('dataURL'))
          .done(function (data) {

            self.set('list', data, {
              silent: true
            });

            self.checkListValidity();
          });
      }
    },

    checkListValidity: function () {
      var list = this.get('list');

      list.unshift({
        value: '',
        text: '',
        localeKey: ''
      });

      _.each(list, function (item) {

        if (item.text === undefined) {
          item.text = item.value || item || '';
        }

        if (item.value === undefined) {
          item.value = item.text || item || '';
        }

        item.localeKey = item.localeKey || '';
      });
    },

    validateSelect: function () {
      var list = this.get('list'),
          value = this.get('value'),
          valid;

      // value must be with options
      valid = _.some(list, function (item) {

        return item.value === value;
      });

      // if not, set the value to the first opion
      if (!valid) {

        this.set('value', '', {
          silent: true
        });
      }

      this.validate();
    }
  });

  Ctrl.SelectView = ControlView.extend({

    events: {
      'click a': 'changeValue'
    },

    changeValue: function (e) {
      var val = e.target.getAttribute('data-value');

      this.model.setVal(val);
      CDP.setLang(this.$el);
    }
  });


  /**
   * File Element
   */
  Ctrl.FileModel = ControlModel.fullExtend({

    defaults: {
      layout: 'file',
      fileName: '',
      accept: ''
    },

    setVal: function (val) {
      var filePath = val.split('\\'),
          fileName = filePath.length ? filePath[filePath.length - 1] : '';

      this.set({
        fileName: fileName,
        value: val
      });
    }
  });

  Ctrl.FileView = ControlView.extend({

    events: {
      'click [data-action=trigger]': 'openInput',
      'change :file': 'updateFileStatus',
      'click .icon-remove': 'removeFile'
    },

    openInput: function () {
      this.$el.find('input').click();
    },

    updateFileStatus: function (e) {
      this.model.setVal(e.target.value);
    },

    removeFile: function () {
      this.model.clear();
    }
  });


  /**
   * FormElement
   */

  FormElement = Backbone.Model.extend({

    defaults: {
      type: '',
      id: '',
      name: '',
      value: '',
      placeholder: '',
      localeKey: '',
      labelLocaleKey: '',
      label: '',
      disabled: false,
      checked: false,
      readonly: false,
      className: '',
      list: [],
      tree: [],
      action: '',
      icon: '',

      validation: {
        required: false,
        min: undefined,
        max: undefined,
        minlength: undefined,
        maxlength: undefined,
        pattern: undefined
      }
    },

    initialize: function () {

      if (this.get('layout') === 'select') {

        this.get('list').unshift({
          value: '',
          localeKey: ''
        });
      }

      this.on('change', this.check);
    },

    check: function () {
      var value = this.get('value'),
          layout = this.get('layout'),
          validation = this.get('validation'),
          invalidMsg = [];

      if (validation.required && (value === undefined || value === '')) {

        // Required
        invalidMsg.push('Required field doesn\'t have value.');
        this.trigger('invalid');
        return invalidMsg;
      }

      // Min & Max
      if ((typeof parseInt(validation.min, 10) === 'number') && (parseInt(value, 10) < parseInt(validation.min, 10))) {
        invalidMsg.push('Value is less than min limit.');
      }

      if (typeof (parseInt(validation.max, 10) === 'number') && (parseInt(value, 10) > parseInt(validation.max, 10))) {
        invalidMsg.push('Value is greater than max limit.');
      }

      // Minlength & Maxlength
      if ((typeof parseInt(validation.minlength, 10) === 'number') && value && value.length < parseInt(validation.minlength, 10)) {
        invalidMsg.push('Too short.');
      }

      if ((typeof parseInt(validation.maxlength, 10) === 'number') && value && value.length > parseInt(validation.maxlength, 10)) {
        invalidMsg.push('Too long.');
      }

      // Date restrictions
      if (layout === 'startEndDate' || layout === 'startEndTime') {

        // [TODO startEnd validation]
        if (value[0] > value[1]) {
          invalidMsg.push('Start is larger than end.');
        }
      }

      if (invalidMsg.length) {
        this.trigger('invalid');
      } else {
        this.trigger('valid');
      }

      return invalidMsg;
    },

    setValue: function (value, text) {

      if (this.get('layout') === 'gridSelect') {

        // Prevent recursion
        this.set('value', value, {
          silent: true
        });

        this.view.$el.find('.dropdown-text').text(text);
        this.view.$el.find(':input').val(value);
      } else {
        this.set('value', '');
      }
    },

    clear: function () {
      this.setValue('', '');
    }
  });

  // ----- FormElement end ----- //


  /**
   * FormElementView
   */

  FormElementView = Backbone.View.extend({

    tplMap: {
      button: JST.formButton,
      btnGroup: JST.formButtonGroup,
      btnBar: JST.formButtonBar,
      input: JST.formInputText,
      textarea: JST.formTextarea,
      checkbox: JST.formCheckRadio,
      checkList: JST.formCheckList,
      radio: JST.formCheckRadio,
      select: JST.formDropdown,
      gridSelect: JST.formGridSelect,
      date: JST.formDate,
      time: JST.formTime,
      startEndDate: JST.formStartEndDate,
      startEndTime: JST.formStartEndTime
    },

    events: {

    },

    initialize: function () {
      var layout = this.model.get('layout');

      if (layout === 'startEndDate' || layout === 'startEndTime') {

      } else if (layout === 'gridSelect') {
        var reportID = 'report-' + new Date().getMilliseconds(),
            r,
            self = this;

        $('<div id=' + reportID + '/>').hide().appendTo('body');

        r = new Report({
          reportID: reportID,
          headerJSON: {
            selectable: false,
            searchable: true,
            header: this.model.get('gridParam').header
          },
          dataURL: this.model.get('gridParam').dataURL,
          dataParams: this.model.get('gridParam').dataParams,
          onselect: function (selected, $target) {
            var name = self.model.get('name'),
                key = self.model.get('gridParam').key,
                text = self.model.get('gridParam').text;

            $('[name=' + name + ']').val(selected[key]);
            $('.grid-select').removeClass('opened');
            $target.closest('.form-control').find('.dropdown-text').text(selected[text]);

            this.control.set({
              value: selected[key]
            }, {
              silent: true
            });
          },
          control: this.model
        });

        // Connection between
        this.model.set('drop', r);
      }

      this.hourList = new FormElement({
        type: 'select'
      });

      this.hourList.set({
        className: 'form-date-hour',
        list: _.map(_.range(24), function (minute) {
          return {
            value: _.addZero(minute),
            localeKey: ''
          };
        })
      });

      this.minuteList = new FormElement({
        type: 'select'
      });

      this.minuteList.set({
        className: 'form-date-minute',
        list: _.map(_.range(60), function (minute) {
          return {
            value: _.addZero(minute),
            localeKey: ''
          };
        })
      });

      this.render();
      this.listenTo(this.model, 'change', this.render);
      this.model.view = this;
    },

    render: function () {
      var layout = this.model.get('layout'),
          tpl = this.tplMap[layout],
          settings = this.model.toJSON(),
          value = settings.value,
          times = settings.times || [0, 0],
          start = {},
          end = {},
          self = this;

      if (layout === 'time') {

        this.setElement(tpl({
          time: settings,
          hourList: (function () {
            var h = self.hourList.toJSON();
            h.value = _.addZero(new Date(_.timeSecToStr(value)).getHours());
            return h;
          }()),
          minuteList: (function () {
            var m = self.minuteList.toJSON();
            m.value = _.addZero(new Date(_.timeSecToStr(value)).getMinutes());
            return m;
          }())
        }));
      } else if (layout === 'startEndDate' || layout === 'startEndTime') {
        start = new FormElement(settings.start).toJSON();
        end = new FormElement(settings.end).toJSON();

        this.setElement(tpl({
          start: start,
          end: end,
          hourList: (function () {
            var h = self.hourList.toJSON();
            h.value = _.addZero(new Date(_.timeSecToStr(times[0].value)).getHours());
            return h;
          }()),
          minuteList: (function () {
            var m = self.minuteList.toJSON();
            m.value = _.addZero(new Date(_.timeSecToStr(times[1].value)).getMinutes());
            return m;
          }())
        }));
      } else if (layout === 'gridSelect') {
        this.setElement(tpl(this.model.toJSON()));
        this.$el.find('.dropdown-list').empty()
          .append('<button type="button" class="grid-select-clear btn-white" data-locale="BTN_CLEAR">Clear</button>')
          .append($(this.model.get('drop').view.$el.show()));

        // Clear events
        this.$el.find('.grid-select-clear').on('click', function () {
          self.model.clear();
          self.$el.removeClass('opened');
        });
      } else if (tpl) {
        this.setElement(tpl(this.model.toJSON()));
      }

      CDP.setLang(this.$el);
      return this;
    }
  });

  // ----- FormElementView end ----- //


  /**
   * Form
   * ----
   * options: {
   *   holder: {element ID},
   *   formData: {JSON}
   * }
   */

  Form = function (options) {
    var holder,
        defaults = {
          url: '',
          titleLocaleKey: '',
          className: '',
          cols: 1,
          buttons: [],
          fields: []
        };

    this.formData = $.extend(defaults, options.formData);

    if (options.holder && (holder = d.getElementById(options.holder))) {
      this.$holder = $(holder);
    } else {
      this.$holder = $('body');
    }

    this.render();

    new DatePicker();
  };

  // Buttons settings
  // May be moved elsewhere
  Form.btnSettings = {
    confirm: {
      type: "submit",
      className: "btn-secondary btn-cute",
      action: "confirm",
      localeKey: "BTN_OK"
    },

    reset: {
      type: "reset",
      className: "btn-gray btn-cute",
      action: "reset",
      localeKey: "BTN_RESET"
    },

    cancel: {
      type: "button",
      className: "btn-gray btn-cute",
      action: "cancel",
      localeKey: "BTN_CANCEL"
    }
  };

  Form.prototype.render = function () {
    this.$el = $(JST.form(this.formData));
    this.models = [];

    this.renderForm();
    this.renderConfirm();

    CDP.setLang(this.$el);
  };

  Form.prototype.renderForm = function () {
    var $fields;

    $fields = this.$el.find('fieldset');

    if (this.formData.fields.length) {
      _.each(this.formData.fields, function (field, fieldIndex) {
        var $field = $fields.eq(fieldIndex),
            $formLines = $field.find('.form-item-line');

        _.each(field.controls, function (control, controlIndex) {
          var formElModel,
              $formEl,
              $formControl;

          switch(control.layout) {
          case 'file':
          case 'select':
            formElModel = new Ctrl[_.capitalize(control.layout) + 'Model'](control);
            $formEl = new Ctrl[_.capitalize(control.layout) + 'View']({
              model: formElModel
            });
            $formLines.eq(Math.floor(controlIndex / this.formData.cols))
              .append($formEl.$wrapper);
            this.models.push(formElModel);
            return;
          }

          formElModel = new FormElement(control);
          $formEl = new FormElementView({
            model: formElModel
          });
          $formControl = $(JST.formControl(_.extend({
            labelLocaleKey: ''
          }, control)));

          if (control.layout !== 'hidden') {
            $formControl.eq(1).append($formEl.$el);

            $formLines.eq(Math.floor(controlIndex / this.formData.cols))
              .append($formControl);

            this.models.push(formElModel);

            formElModel.on('change', function () {

              $formControl.eq(1).empty()
                .append(new FormElementView({
                  model: formElModel
                }).$el);
            }).on('invalid', function () {
              $formControl.eq(1).addClass('form-invalid');
            }).on('valid', function () {
              $formControl.eq(1).removeClass('form-invalid');
            });

            $formControl.on('change', ':input', function () {
              var type = formElModel.get('type'),
                  $inputs;

              if (type === 'startEndDate' || type === 'startEndTime') {
                $inputs = $(this).closest('.form-control').find('.datepicker');

                formElModel.set({
                  value: [$inputs.eq(0).val(), $inputs.eq(1).val()]
                });
              } else {
                formElModel.set({
                  value: $(this).val()
                }, {
                  silent: true
                }).check();
              }
            });
          }
        }, this);
      }, this);
    }

    this.$holder.append(this.$el);
  };

  Form.prototype.renderConfirm = function () {
    var buttons = _.map(this.formData.buttons, function (button) {

          if (Form.btnSettings[button]) {
            return new FormElement(Form.btnSettings[button]).toJSON();
          }
        });

    this.$el.append(JST.formConfirm({
      buttons: buttons
    }));
  };

  Form.prototype.fillForm = function (data) {
    var prop;

    _.each(this.models, function (model) {

      for (prop in data) {

        if (model.get('name') === prop && data.hasOwnProperty(prop)) {

          if (model.get('layout') === 'checkList') {

            _.each(model.get('checks'), function (check) {
              check.checked = (check.value === data[prop]);

              if (check.checked) {
                model.set('value', check.value);
              }
            });
          } else if (model.get('layout') === 'gridSelect') {
            var name = model.get('name'),
                text = model.get('sourceText') || name;

            model.view.$el.find('.dropdown-text').text(data[text]);
            model.view.$el.find(':input').val(data[name]);

            model.set({
              value: data[name],
              text: data[text]
            }, {
              silent: true
            });

            break;
          } else {
            model.set('value', data[prop]);
            break;
          }
        }
      }
    });
  };

  // Clear form data
  Form.prototype.clear = function () {

    _.each(this.models, function (model) {
      model.clear();
    });

    this.$el.find('.form-invalid').removeClass('form-invalid');
  };

  Form.prototype.validate = function () {
    var validForm = true;

    _.each(this.models, function (model) {

      if (model.get('layout') !== 'file') {

        // [FILE]
        validForm = !(model.check().length) && validForm;
      }
    });

    return validForm;
  };

  // Destroy the form

  // ----- Form end ----- //

  w.FormElement = FormElement;
  w.FormElementView = FormElementView;
  w.Form = Form;
}(window, document));

