/**
 * Flow Chart Maker
 * ===================
 * Author: Ash Zhang
 * Created: 2014/07/17
 * ===================
 */


(function (w, d) {

  var FChartMakerModel,
      FChartMakerView,
      FChartMaker;


  /**
   * FChartMakerModel
   */
  FChartMakerModel = Backbone.Model.extend({

    defaults: {

      // Created formula
      formulaDefine: '',

      // Remarks
      remark: '',

      // Variables: list of strings
      regVar: [],

      // Functions: List of text/val pairs
      // text:  shown name
      // val:   text to be inserted into formula
      jsFunction: [],

      // Buttons
      calButtons: [
        {
          text: 7,
          val: 7,
          className: ''
        },
        {
          text: 8,
          val: 8,
          className: ''
        },
        {
          text: 9,
          val: 9,
          className: ''
        },
        {
          text: '÷',
          val: '/',
          className: 'btn-primary'
        },
        {
          text: 4,
          val: 4,
          className: ''
        },
        {
          text: 5,
          val: 5,
          className: ''
        },
        {
          text: 6,
          val: 6,
          className: ''
        },
        {
          text: '×',
          val: '*',
          className: 'btn-primary'
        },
        {
          text: 1,
          val: 1,
          className: ''
        },
        {
          text: 2,
          val: 2,
          className: ''
        },
        {
          text: 3,
          val: 3,
          className: ''
        },
        {
          text: '-',
          val: '-',
          className: 'btn-primary'
        },
        {
          text: 0,
          val: 0,
          className: ''
        },
        {
          text: '00',
          val: '00',
          className: ''
        },
        {
          text: '.',
          val: '.',
          className: ''
        },
        {
          text: '+',
          val: '+',
          className: 'btn-primary'
        }
      ],

      condButtons: [
        {
          text: 'if',
          val: 'if',
          className: 'btn-light-gray'
        },
        {
          text: 'else',
          val: 'else',
          className: 'btn-light-gray'
        },
        {
          text: 'then',
          val: 'then',
          className: 'btn-light-gray'
        },
        {
          text: 'and',
          val: 'and',
          className: 'btn-light-gray'
        },
        {
          text: 'or',
          val: 'or',
          className: 'btn-light-gray'
        },
        {
          text: '(',
          val: '(',
          className: 'btn-light-gray'
        },
        {
          text: ')',
          val: ')',
          className: 'btn-light-gray'
        },
        {
          text: '=',
          val: '=',
          className: 'btn-light-gray'
        },
        {
          text: '>',
          val: '>',
          className: 'btn-light-gray'
        },
        {
          text: '<',
          val: '<',
          className: 'btn-light-gray'
        },
        {
          text: '>=',
          val: '>=',
          className: 'btn-light-gray'
        },
        {
          text: '<=',
          val: '<=',
          className: 'btn-light-gray'
        },
        {
          text: '==',
          val: '==',
          className: 'btn-light-gray'
        },
        {
          text: '!=',
          val: '!=',
          className: 'btn-light-gray'
        },
        {
          text: 'res',
          val: 'res',
          className: 'btn-light-gray'
        }
      ]
    },

    initialize: function () {
      var self = this;

      $.get(self.get('getDataUrl'), {
          id: self.get('id')
        })
        .done(function (data) {
          self.set(data);
          self.trigger('dataready');
        });
    }
  });

  // ----- FChartMakerModel end ----- //


  /**
   * FChartMakerView
   */
  FChartMakerView = Backbone.View.extend({

    className: 'fchart-maker',

    template: JST.fchartMaker,

    events: {
      'dblclick [data-action=regVar]': 'insertRegVar',
      'dblclick [data-action=func]': 'insertFunc',
      'click button': 'insertButton'
    },

    formulaPos: 0,

    initialize: function () {
      this.model.view = this;

      this.listenTo(this.model, 'dataready', this.render);
    },

    render: function () {
      var self = this;

      this.$el.append(this.template(this.model.toJSON()));
      this.formulaInput = this.$el.find('[name=formulaDefine]').get(0);
      this.remark = this.$el.find('[name=remark]').get(0);

      $(this.formulaInput).on('keyup mouseup', function () {
        self.rememberPos();
      });

      // Open dialog
      this.dialog = new Dialog({
        headingLocaleKey: 'SAP_APP_FLOW_CHART',
        $content: this.$el,
        buttons: ["confirm", "cancel"]
      });

      CDP.dialog(this.dialog.$el.appendTo($('body')));

      this.bindDialog();
    },

    // Events
    insertRegVar: function (e) {
      var text = '{' + e.target.innerHTML + '}';

      this.editFormula(text);
    },

    insertFunc: function (e) {
      this.editFormula(e.target.getAttribute('value'));
    },

    insertButton: function (e) {
      this.editFormula(e.target.value);
    },

    rememberPos: function () {
      var elem = this.formulaInput;

      if (elem != null) {

        if (document.selection) {
          var r = document.selection.createRange(),
              re,
              rc;

          if (r == null) {
            this.formulaPos = this.formulaInput.value.length;

            return;
          }

          re = elem.createTextRange();
          rc = re.duplicate();
          re.moveToBookmark(r.getBookmark());
          rc.setEndPoint('EndToStart', re);

          this.formulaPos =  rc.text.length;

          return;
        } else if (elem.selectionStart) {
          this.formulaPos =  elem.selectionStart;

          return;
        }
      }

      this.formulaPos = this.formulaInput.value.length;
    },

    // !! Insert text into formula
    editFormula: function (text) {

      if (this.formulaPos === 0) {
        this.formulaPos = this.formulaInput.value.length;
      }

      var strLeft = this.formulaInput.value.substring(0, this.formulaPos),
          strRight = this.formulaInput.value.substring(this.formulaPos);

      this.formulaInput.value = strLeft + text + strRight;
      this.formulaPos += text.length;
    },

    bindDialog: function () {
      var self = this;

      // Send data
      this.dialog.$el.find('[data-action=confirm]').click(function () {

        $.post(self.model.get('sendDataUrl'), {
          pt009Id: self.model.get('id'),
          formulaDefine: self.formulaInput.value,
          remark: self.remark.value
        })
          .done(function (res) {

            if (res.success) {
              CDP.closeDialog(self.dialog.$el);
            } else {
              CDP.message(CDP.parseLocaleKey(res.localeKey) || res.message);
            }

            CDP.Memory.clear();
          });
      });

      // Close
      this.dialog.$el.find('[data-action=cancel], [data-action=close]').click(function () {
        CDP.closeDialog(self.dialog.$el);

        setTimeout(function () {
          CDP.destroyComponent(self.dialog);
        }, 300);
      });
    }
  });

  // ----- FChartMakerView end ----- //


  // Let's Go!
  FChartMaker = function (settings) {
    this.model = new FChartMakerModel(settings);

    this.view = new FChartMakerView({
      model: this.model
    });

    this.$el = this.view.$el;

    CDP.Memory.push(this);
  };

  w.FChartMaker = FChartMaker;

}(window, document));
