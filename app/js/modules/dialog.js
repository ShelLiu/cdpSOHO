/**
 * Dialog
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/23
 * ===================
 * = DialogModel
 * = DialogView
 * = Confirm
 */


(function (w, d) {


  /**
   * DialogModel
   */

  var DialogModel = Backbone.Model.extend({

    defaults: {

      // confirm, error, success etc
      type: '',

      headingLocaleKey: '',

      // Get dialog content from url or append $element
      // url first, content second
      url: '',
      $content: null,

      closable: true,

      // Size
      width: undefined,

      // Confirm buttons
      buttons: [
//        "confirm",
//        "cancel"
      ],

      onconfirm: null,
      oncancel: null,

      buttonSettings: {

        confirm: {
          id: '',
          localeKey: 'BTN_OK',
          action: 'confirm',
          type: 'submit',
          icon: '',
          disabled: false,
          className: 'btn-secondary btn-cute',
          value: ''
        },

        cancel: {
          id: '',
          localeKey: 'BTN_CANCEL',
          action: 'cancel',
          type: 'button',
          icon: '',
          disabled: false,
          className: 'btn-gray btn-cute',
          value: ''
        }
      }
    },

    initialize: function () {

    }
  });

  // ----- DialogModel end ----- //


  /**
   * DialogView
   */

  var DialogView = Backbone.View.extend({

    tagName: 'div',
    className: 'dialog',

    template: JST.dialog,

    events: {

    },

    initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.addClass(this.model.get('type'));
      this.fillContent();
      return this;
    },

    fillContent: function () {

      if (this.model.get('url') !== '') {
        this.$el.load('url');
      } else if (this.model.get('$content')) {
        this.$el.find('.content').prepend(this.model.get('$content'));
      }

      if (this.model.get('width')) {
        this.$el.width(this.model.get('width'));
      }

      CDP.setLang(this.$el);
    }
  });

  // ----- DialogView end ----- //


  /**
   * Dialog
   */

  function Dialog(options) {
    this.model = new DialogModel(options);

    this.view = new DialogView({
      model: this.model
    });

    this.$el = this.view.$el;
    CDP.Memory.push(this);
  }

  // ----- Dialog end ----- //


  /**
   * Confirm
   * e.g.
   * new Confirm('我是删除侠！')
   *   .yes(function () { console.log('yes') })
   *   .no(function () { console.log('no') });
   * @param message {text}
   * @constructor
   */
  function Confirm(message) {

    var options = {
          type: 'confirm',
          closable: false,
          buttons: [
            "confirm",
            "cancel"
          ],
          $content: $('<p/>', {
            text: message
          })
        },
        model = new DialogModel(options),
        self = this;

    this.model = model;
    this.view = new DialogView({
      model: model
    });

    CDP.dialog(this.view.$el);

    this.view.$el.on('click', 'button', function () {
      var action = this.getAttribute('data-action');

      CDP.closeDialog(self.view.$el);

      model.set({
        result: action === 'confirm'
      });
    });
  }

  // When 'confirm' is clicked
  Confirm.prototype.yes = function (func) {

    this.model.on('change:result', function () {

      if (this.model && this.model.get('result') && (typeof func === 'function')) {
        func();
        this.destroy();
      }
    }, this);

    return this;
  };

  // When 'cancel' is clicked
  Confirm.prototype.no = function (func) {

    this.model.on('change:result', function () {

      if (this.model && !this.model.get('result') && (typeof func === 'function')) {
        func();
        this.destroy();
      }
    }, this);

    return this;
  };

  Confirm.prototype.destroy = function () {
    this.view.$el.remove();
    this.view.remove();
    this.model.destroy();
    this.view = null;
    this.model = null;
    delete this;
  };

  // ----- Confirm end ----- //

  w.Dialog = Dialog;
  w.Confirm = Confirm;
}(window, document));
