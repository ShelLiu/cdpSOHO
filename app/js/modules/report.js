/**
 * Report
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/18
 * ===================
 * = ReportModel
 * = ReportView
 */

(function (w, d) {


  /**
   * ReportModel
   */

  var ReportModel = Backbone.Model.extend({

    defaults: {

      // Holder ID
      reportID: '',

      // Title
      title: '&nbsp;',

      // If show checkbox
      selectable: true,

      // has search control
      searchable: false,

      // Pagination
      totalCount: 0,

      // Key Index
      key: 'id',

      // Buttons
      buttons: [],
      customButtons: [],

      // Data Header
      header: [],

      // Data Items
      items: [],

      // Form url
      formURL: '',
      formJSON: null,

      buttonSettings: {

        refresh: {
          id: '',
          localeKey: 'BTN_REFRESH',
          action: 'refresh',
          icon: 'refresh',
          type: 'button',
          disabled: false,
          className: '',
          value: ''
        },

        delete: {
          id: '',
          localeKey: 'BTN_DELETE',
          action: 'delete',
          icon: 'delete',
          type: 'button',
          disabled: false,
          className: '',
          value: ''
        },

        add: {
          id: '',
          localeKey: 'BTN_ADD',
          action: 'add',
          icon: 'add',
          type: 'button',
          disabled: false,
          className: '',
          value: ''
        },

        edit: {
          id: '',
          localeKey: 'BTN_EDIT',
          action: 'edit',
          icon: 'edit',
          type: 'button',
          disabled: false,
          className: '',
          value: ''
        },

        sort: {
          id: '',
          localeKey: 'BTN_SORT',
          action: 'sort',
          icon: 'sort',
          type: 'button',
          disabled: false,
          className: '',
          value: ''
        },

        filter: {
          id: '',
          localeKey: 'BTN_FILTER',
          action: 'filter',
          icon: 'filter',
          type: 'button',
          disabled: false,
          className: '',
          value: ''
        }
      }
    },

    initialize: function () {
      var id = this.get('reportID');

      this.set('holder', $(d.getElementById(id)));
    }
  });

  // ----- ReportModel end ----- //


  /**
   * ReportView
   */

  var ReportView = Backbone.View.extend({

    template: JST.report,

    events: {
      'click [data-action=refresh]': 'refresh',
      'click [data-action=filter]': 'filter',
      'click [data-action=delete]': 'deleteItems',
      'click [data-action=add]': 'addItems',
      'click [data-action=edit]': 'editItems',
      'click [data-action=sort]': 'sortItems',

      'change :checkbox': 'selectRow',
      'click tbody > tr': 'clickRow',
      'click .sortable': 'sortData',
      'click [data-action=search]': 'searchData'
    },

    initialize: function () {
      this.$el = this.model.get('holder') || $('body');

      this.render();

      this.listenTo(this.model, "change", this.render);

      // If 'add' or 'edit' buttons are shown,
      // prepare for the relevant form
      this.getForm();

      this.bindCusBtns();
    },


    /**
     * Rendering
     */

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.renderReport();
      return this;
    },

    renderReport: function () {
      this.renderGrid();
      this.renderPager();
      CDP.setLang(this.$el);
    },

    renderPager: function () {
      this.pagination = new Pagination({
        totalCount: this.model.get('totalCount'),
        holder: this.model.get('holder').find('.report-footer')
      });

      this.pagination.report = this;
      this.pagination.model.on('turn', function () {
        this.turnPage(this.model.get('dataURL'));
      }, this);
    },

    renderGrid: function () {

      this.grid = new Grid({
        reportID: this.model.get('reportID'),
        selectable: this.model.get('selectable'),
        header: this.model.get('header'),
        items: this.model.get('items'),
        holder: this.model.get('holder').find('.table-holder')
      });
    },

    // ----- Rendering end ----- //


    /**
     * Tools
     */

    // Custom buttons and onclick function
    bindCusBtns: function () {
      var cusBtns = this.model.get('customButtons'),
          self = this;

      _.each(cusBtns, function (btn) {

        $(d).on('click', '#' + btn.id, function () {
          btn.onclick.apply(self, btn.arguments);
        });
      });
    },

    getSelectedItems: function () {

      return _.where(this.model.get('items'), {
        selected: true
      });
    },

    // Pagination
    turnPage: function (url, setPageNum/* params */, setPageSize) {
      var self = this,
          dataParams = this.model.get('dataParams'),
          params = {
            pageNum: this.pagination.model.get('pageNum'),
            pageSize: this.pagination.model.get('pageSize'),
            sort: this.model.get('sort'),
            query: this.model.get('query'),
            filter: this.model.get('filter')
          };

      // Has data params
      if (typeof arguments[1] === 'object') {
        params = $.extend(params, dataParams, arguments[1]);
      } else {
        params = $.extend(params, dataParams);
      }

      this.showLoading();

      $.get(url, params)
        .done(function (data) {

          self.model.set({
            totalCount: data.totalCount,
            items: data.items
          });

          self.pagination.model.set({
            pageNum: params.pageNum,
            pageSize: params.pageSize
          });

          // onload

          if (typeof self.onload === 'function') {
            self.onload();
          }

          self.hideLoading();
        });
    },

    // If the ajax call succeeds, refresh data
    // Or display a warning message
    responseData: function (res) {

      if (res.success) {

        if (this.addDialog) {
          CDP.closeDialog(this.addDialog.$el);
        }

        this.refresh();
      } else {
        CDP.message(CDP.parseLocaleKey(res.localeKey) || res.message);
      }
    },

    // ----- Tools end ----- //


    /**
     * Functional elements init
     */

    getForm: function () {
      var formURL = this.model.get('formURL'),
          formJSON = this.model.get('formJSON'),
          buttons = this.model.get('buttons'),
          self = this;

      // Only create the form when
      // 'add' or 'edit' buttons are applied
      if (_.indexOf(buttons, 'add') !== -1 || _.indexOf(buttons, 'edit') !== -1) {

        if (formURL) {

          $.get(formURL)
            .done(function (data) {
              self.createForm(data);
            });
        } else {
          this.createForm(formJSON);
        }
      }
    },

    // Add & Edit form
    createForm: function (data) {

      var form = new Form({
        formData: data
      }),
          self = this;

      form.$el.hide();
      this.form = form;
      this.$form = form.$el;

      // Create a new add dialog
      if (!this.addDialog) {

        this.addDialog = new Dialog({
          headingLocaleKey: 'DIALOG_HEADING_ADD',
          $content: this.$form.show()
        });

        this.addDialog.$el.appendTo('body');

        // [FILE]
        this.addDialog.$el.find(':file')
          .fileupload({
            url: this.form.formData.url,
            dataType: 'json',
            add: function (e, data) {
              data.formData = self.processFormData();
              data.submit();
            }
          });

        this.bindAddEvents();
      }
    },

    // ----- Functional elements init ----- //


    /**
     * Button Actions
     */

    // Refresh: Reload all data
    refresh: function () {

      this.model.set({
        sort: '',
        show: '',
        query: '',
        filter: ''
      }, {
        silent: true
      });

      this.turnPage(this.model.get('dataURL'));
    },

    // Delete: Delete selected items
    // - If no items are selected, display a message.
    deleteItems: function () {
      var selected = this.getSelectedItems(),
          idArr = _.pluck(selected, this.model.get('key')),
          self = this;

      if (selected.length) {

        new Confirm(CDP.parseLocaleKey('MSG_DELETE_PROMPT'))
          .yes(function () {

            $.post(self.form.formData.url, {
              action: 'delete',
              keys: idArr.toString()
            })
              .done(function (res) {
                self.responseData.call(self, res);
              });
          });
      } else {
        CDP.message(CDP.parseLocaleKey('MSG_NO_SELECT'));
      }
    },

    // Show Add dialog
    addItems: function () {
      var $heading = this.addDialog.$el
            .children('.header').children('h4');

      this.mode = 'add';
      this.form.clear();

      // Switch heading text to 'add'
      $heading.attr('data-locale', 'DIALOG_HEADING_ADD');
      CDP.dialog(this.addDialog.$el);

      if (typeof this.onOpenAdd === 'function') {
        this.onOpenAdd.call(this);
      }

      CDP.setLang(this.addDialog.$el);
    },

    // Show Edit dialog
    editItems: function () {
      var selected = this.getSelectedItems(),
          $dialog = this.addDialog.$el,
          $heading = this.addDialog.$el
            .children('.header').children('h4');

      if (selected.length) {
        this.mode = 'edit';
        this.form.fillForm(selected[0]);

        // Switch heading text to 'edit'
        $heading.attr('data-locale', 'DIALOG_HEADING_EDIT');
        CDP.dialog($dialog);

        if (typeof this.onOpenEdit === 'function') {
          this.onOpenEdit.call(this);
        }

        CDP.setLang(this.addDialog.$el);
      } else {
        CDP.message(CDP.parseLocaleKey('MSG_NO_SELECT'));
      }
    },

    // When submit is clicked
    bindAddEvents: function () {
      var $confirm = this.addDialog.$el.find('[data-action=confirm]'),
          $cancel = this.addDialog.$el.find('[data-action=cancel]'),
          self = this;

      // Confirm
      $confirm.on('click', function (e) {
        var formItemData = self.processFormData(),
            $files = self.$form.find(':file'),
            selected;

        e.preventDefault();

        // Form validation
        if (self.form.validate()) {

          // Before Submit API
          if (self.form.formData
              && typeof self.form.formData.beforeSubmit === 'function') {
            self.form.formData.beforeSubmit(formItemData);
          }

          // [FILE]
          if ($files.length) {

            $files.fileupload('send', {
              dataType: 'json',
              done: function (e, data) {
                self.responseData.call(self, data);                    }
            });
          } else {

            // Submit the data
            $.post(self.form.formData.url, formItemData)
              .done(function (res) {
                self.responseData.call(self, res);
              });
          }

          // After Submit API
          if (self.form.formData
            && typeof self.form.formData.afterSubmit === 'function') {
            self.form.formData.afterSubmit(formItemData);
          }
        }
      });

      // Cancel: Just close the dialog
      $cancel.on('click', function () {
        CDP.closeDialog(self.addDialog.$el);
      });
    },

    // Process form data
    processFormData: function () {
      var dates = _.map(this.$form.find('.datepicker'), function (input) {

            // Save date inputs to be turned into unix seconds
            return input.name;
          }),
          radios = _.map(this.$form.find(':radio'), function (input) {

            // Save date inputs to be turned into unix seconds
            return input.name;
          }),

          formItemData = _.joinSerializedArray(this.$form.serializeArray()),
          selected;

      // Change date format to unix seconds
      _.each(dates, function (name) {
        formItemData[name] = _.timeObjToSec(formItemData[name]);
      });

      // Change radio to its value
      _.each(radios, function (name) {
        formItemData[name] = $('[name=' + name + ']:checked').val();
      });

      // Edit only when an item is selected
      if (this.mode === 'edit') {

        if (selected = this.getSelectedItems()) {

          // fill key field
          formItemData[this.model.get('key')] = selected[0][this.model.get('key')];
        } else {
          return;
        }
      }

      formItemData.action = this.mode;

      return formItemData;
    },

    // Sort
    sortItems: function () {

      // Get Sort dialog only necessary
      if (!this.sortDialog) {
        this.getSortDialog();
      }

      CDP.dialog(this.sortDialog.$el);
    },

    getSortDialog: function () {
      this.sort = new Sort(this.model.get('header'));
      this.sort.report = this;

      this.sortDialog = new Dialog({
        headingLocaleKey: 'BTN_SORT',
        $content: this.sort.$el,
        width: 'auto',
        buttons: [
          "confirm",
          "cancel"
        ]
      });

      this.bindSortEvents();
    },

    bindSortEvents: function () {
      var self = this;

      // Confirm
      this.sortDialog.$el.on('click', '[data-action=confirm]', function () {
        var show = _.reject(self.sort.model.get('showHeaders'), function (h) {
                      return h.hidden;
                    }),
            sort = self.sort.model.get('sortHeaders'),
            showStr = _.pluck(show, 'name').toString(),
            sortStr = _.reduce(sort, function (str, h) {
              return str += (h.name + ' ' + h.order + ', ');
            }, '');

        sortStr = sortStr.slice(0, sortStr.length - 2);

        self.model.set({
          show: showStr,
          sort: sortStr
        }, {
          silent: true
        });

        self.turnPage(self.model.get('dataURL'));

        CDP.closeDialog(self.sortDialog.$el);
      });

      // Cancel
      this.sortDialog.$el.on('click', '[data-action=cancel]', function () {
        CDP.closeDialog(self.sortDialog.$el);
      });
    },

    // Now only supports easy filter
    filter: function () {

      // Filter init
      CDP.destroyComponent(this.filterEasy);

      this.filterEasy = new FilterEasy({
        selectable: this.model.get('selectable'),
        header: this.model.get('header'),
        $holder: this.$el.find('.table-holder thead')
      });

      this.filterEasy.view.report = this;
      this.filterEasy.view.show();
      this.filterEasy.view.reset();

      this.model.set('filter', '', {
        silent: true
      });
    },

    // ----- Button Actions end ----- //

    /**
     * Search Input
     */

    searchData: function (e) {
      var query = $(e.target).closest('.form-search').find(':input').val();

      this.model.set('query', query, {
        silent: true
      });

      this.turnPage(this.model.get('dataURL'));
    },

    // ----- Search Input end ----- //


    /**
     * Grid events
     */

    // Click on the checkbox will select a row
    selectRow: function (e) {
      var rowData = this.getData($(e.target));

      if (rowData !== null) {
        rowData.selected = $(e.target).prop('checked');
      }
    },

    // Click on the row data
    clickRow: function (e) {
      var $target = $(e.target);

      if ($target.closest('.check').length === 0) {
        rowData = this.getData($target);

        if (typeof this.model.get('onselect') === 'function') {
          this.model.get('onselect').apply(this, [rowData, $target]);
        }
      }
    },

    // Get the row data
    getData: function ($target) {
      var $rows = this.$el.find('tbody > tr'),
          $row = $target.closest('tr'),
          index = $rows.index($row);

      if (index !== -1) {
        return this.model.get('items')[index];
      } else {
        return null;
      }
    },

    // Easy sorting
    // Sort by the click item
    // Only one sort order is allowed
    sortData: function (e) {
      var $th = $(e.target).closest('th'),
          sortName = $th.data('name'),
          sortOrder = $th.hasClass('desc') ? 'asc' : 'desc';

      _.each(this.model.get('header'), function (headerItem) {

        if (headerItem.name === sortName) {
          headerItem.order = sortOrder;

          this.model.set({
            sort: sortName + ' ' + sortOrder
          });

          this.turnPage(this.model.get('dataURL'));
        } else {
          delete headerItem.order;
        }
      }, this);
    },

    // ----- Grid events end ----- //


    /**
     * Loading
     */

    showLoading: function () {
      this.$el.find('.report').addClass('loading');
    },

    hideLoading: function () {
      var self = this;

      setTimeout(function () {
        self.$el.find('.report').removeClass('loading');
      }, 100);
    }

    // ----- Loading end ----- //
  });

  // ----- ReportView end ----- //


  /**
   * Report
   */

  function Report(settings) {
    var self = this,
        defaults = {
          titleLocaleKey: ''
        };

    if (settings.headerURL) {

      // Load from url
      $.when(
        $.get(settings.headerURL, settings.headerParams || {})
      ).then(function (header) {
        self.makeReport(_.extend(defaults, header), settings);
      });
    } else {

      // Load from static json
      self.makeReport(_.extend(defaults, settings.headerJSON), settings);
    }

    return self;
  }

  // Construct a report
  Report.prototype.makeReport = function (header, settings) {
//    var defaultHeader = {
//          filterable: true,
//          list: []
//        };

    // Step 1: Header
    header = $.extend(header, settings, settings.options);

    _.each(header.header, function (h) {

      if (h.filterable === undefined) {
        h.filterable = true;
      }

      if (!h.list) {
        h.list = [];
      }
    });

    this.model = new ReportModel(header);

    this.view = new ReportView({
      model: this.model
    });

    this.view = _.extend(this.view, settings);

    // Step 2: Content
    // Only show content when header response doesn't have [success] property
    if (header.hasOwnProperty('success') && header.success === false) {
      CDP.message(header.message || CDP.parseLocaleKey(header.localeKey));
    } else {

      if (settings.dataURL) {
        this.view.turnPage(settings.dataURL, settings.dataParams || {});
      }
    }

    // Push it to memory
    CDP.Memory.push(this);
  };

  // Refresh grid data with totalCount & items
  Report.prototype.refreshData = function (data) {
    var newData = {},
        prop;

    for (prop in data) {

      if (data.hasOwnProperty(prop)) {
        newData[prop] = data[prop];
      }
    }

    this.model.set(newData);
    newData = null;
  };

  // Lazy Refresh
  Report.prototype.refresh = function () {
    this.view.refresh();
  };

  // ----- Report end ----- //

  w.Report = Report;
}(window, document));
