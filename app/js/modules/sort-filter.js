/**
 * Sort & Filter
 * ===================
 * Author: Ash Zhang
 * Created: 2014/07/03
 * ===================
 */

(function (w, d) {

  var SortModel,
      SortView,
      Sort,
      FilterEasyModel,
      FilterEasyView,
      FilterEasy;

  /**
   * SortModel
   * ---------
   * 1. Which columns are show
   * 2. How the columns are sorted
   */
  SortModel = Backbone.Model.extend({

    defaults: {

      // Items are kept in view order:
      showHeaders: [],

      // Items are kept in sort order:
      sortHeaders: [],

      activeShowItem: null,

      activeSortItem: null
    },

    headerItemDefaults: {
      name: '',
      text: '',
      localeKey: '',
      sortable: false,
      order: 'desc',
      hidden: false,
      showActive: false,
      sortActive: false
    },

    initialize: function (attr) {

      _.each(attr.showHeaders, function (header) {
        header.showActive = false;
        header.sortActive = false;
      });

      this.set('showHeaders', attr.showHeaders);

      // Init all sortable items
      this.set('sortHeaders', _.filter(this.get('showHeaders'), function (h) {
        return h.sortable && h.order;
      }));
    },

    // Get items
    // Only sortable items are shown
    getShowItem: function (index) {
      return _.filter(this.get('showHeaders'), function (h) {
        return h.sortable;
      })[index];
    },

    getSortItem: function (index) {
      return _.filter(this.get('sortHeaders'), function (h) {
        return h.sortable;
      })[index];
    },

    // Toggle items' active status
    // type: 'show' / 'sort'
    toggleItem: function (type, index) {
      var item = this['get' + _.capitalize(type) + 'Item'](index);

      // activate an item
      if (item && !item[type + 'Active']) {

        // Only one item can be activated
        _.each(this.get(type + 'Headers'), function (header) {
          header[type + 'Active'] = false;
        });

        item[type + 'Active'] = true;
        this.set('active' + _.capitalize(type) + 'Item', item);
      } else if (item && item[type + 'Active']) {
        item[type + 'Active'] = false;
        this.set('active' + _.capitalize(type) + 'Item', null);
      }
    },

    // Operation on active items
    // step: -1 (up) / 1 (down)
    moveItem: function (type, step, silent) {
      var item = this.get('active' + _.capitalize(type) + 'Item'),
          list = this.get(type + 'Headers');

      if (item) {
        _.moveItem(list, item, step);

        if (!silent) {
          this.trigger('change');
        }
      }
    },

    // Stick Top
    stickTopItem: function(type) {
      this.moveItem(type, -99999, true);

      if (this.get('active' + _.capitalize(type) + 'Item')) {
        this.get('active' + _.capitalize(type) + 'Item')[type + 'Active'] = false;
      }

      this.trigger('change');
    },

    // Where show an item in grid or not
    toggleVisibility: function (index) {
      var item = this.getShowItem(index);

      item.hidden = !item.hidden;
      this.trigger('change');
    },

    // Make an item sortable
    letSortable: function (index) {
      var item = this.getShowItem(index);

      if (_.indexOf(this.get('sortHeaders'), item) === -1) {
        item.sortable = true;
        item.order = item.order || 'desc';
        this.get('sortHeaders').push(item);

        if (this.get('activeShowItem')) {
          this.get('activeShowItem').showActive = false;
        }

        this.trigger('change');
      }
    },

    // Make an item unsortable
    letUnsortable: function (index) {
      var item = this.getSortItem(index);

      item.sortable = false;

      // Keep last order
      item.order = item.order ? item.order : 'desc';

      this.set({
        'sortHeaders': _.without(this.get('sortHeaders'), item)
      });
    },

    // Sort order
    switchOrder: function (index, order) {
      var item = this.getSortItem(index);

      item.order = order;
      this.trigger('change');
    }
  });

  // ----- SortModel end ----- //


  /**
   * SortView
   */

  SortView = Backbone.View.extend({

    tagName: 'div',
    className: 'sort',

    template: JST.sort,

    events: {
      'click li': 'toggleEvents',
      'click .sort-name': 'toggleEvents',
      'click .sort-column-order .check > span': 'toggleVisibility',
      'click [data-action=up]': 'moveUp',
      'click [data-action=down]': 'moveDown',
      'click [data-action=stick-top]': 'stickTop',
      'click [data-action=sort-it]': 'sortIt',
      'click [data-action=unsort-it]': 'unsortIt',
      'click [data-sort]': 'switchSort'
    },

    initialize: function () {
      this.model.view = this;
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));

      CDP.setLang(this.$el);
    },

    getIndex: function ($li) {
      return $li.closest('.picker-list').find('li').index($li);
    },

    getType: function ($li) {
      return $li.parents('.sort-column-order').length ? 'show' : 'sort';
    },

    // Select / unselect a line
    toggleEvents: function (e) {
      this.toggleItem($(e.target).closest('li'));
      e.stopPropagation();
    },

    toggleItem: function ($li) {
      var index = this.getIndex($li),
          type = this.getType($li);

      this.model.toggleItem(type, index);
    },

    toggleVisibility: function (e) {
      var $li = $(e.target).closest('li'),
          index = $li.closest('.picker-list').find('li').index($li);

      this.model.toggleVisibility(index);
      e.stopPropagation();
    },

    moveUp: function (e) {
      var type = this.getType($(e.target));

      this.model.moveItem(type, -1);
    },

    moveDown: function (e) {
      var type = this.getType($(e.target));

      this.model.moveItem(type, 1);
    },

    stickTop: function (e) {
      var type = this.getType($(e.target)),
          $li = $(e.target).closest('li');

      if (!$li.hasClass('active')) {
        this.toggleItem($li);
      }

      this.model.stickTopItem(type);
      e.stopPropagation();
    },

    sortIt: function (e) {
      var $li = $(e.target).closest('li'),
          index = this.getIndex($li);

      if (!$li.hasClass('active')) {
        this.toggleItem($li);
      }

      this.model.letSortable(index);
      e.stopPropagation();
    },

    unsortIt: function (e) {
      var $li = $(e.target).closest('li'),
          index = this.getIndex($li);

      this.model.letUnsortable(index);
      e.stopPropagation();
    },

    switchSort: function (e) {
      var $target = $(e.target).closest('label'),
          $li = $target.closest('li'),
          index = this.getIndex($li),
          order = $target.data('sort');

      this.model.switchOrder(index, order);
      e.stopPropagation();
    }
  });

  // ----- SortModel end ----- //


  /**
   * FilterEasyModel
   */

  FilterEasyModel = Backbone.Model.extend({

    defaults: {
      header: [],

      // to be sent back
      filter: {}
    },

    initialize: function () {
      var strCond = [
            {
              value: '',
              localeKey: ''
            },
            {
              value: ' = ',
              localeKey: 'COND_SAME'
            },
            {
              value: ' != ',
              localeKey: 'COND_NOT_SAME'
            },
            {
              value: ' like ',
              localeKey: 'COND_LIKE'
            },
            {
              value: ' not like ',
              localeKey: 'COND_NOT_LIKE'
            },
            {
              value: ' is null ',
              localeKey: 'COND_NULL'
            },
            {
              value: ' is not null ',
              localeKey: 'COND_NOT_NULL'
            }
          ],
          numCond = [
            {
              value: '',
              localeKey: ''
            },
            {
              value: ' = ',
              localeKey: 'COND_EQUAL'
            },
            {
              value: ' != ',
              localeKey: 'COND_NOT_EQUAL'
            },
            {
              value: ' < ',
              localeKey: 'COND_LT'
            },
            {
              value: ' > ',
              localeKey: 'COND_GT'
            },
            {
              value: ' <= ',
              localeKey: 'COND_LTE'
            },
            {
              value: ' >= ',
              localeKey: 'COND_GTE'
            },
            {
              value: ' is null ',
              localeKey: 'COND_NULL'
            },
            {
              value: ' is not null ',
              localeKey: 'COND_NOT_NULL'
            }
          ],
          listCond = [
            {
              value: '',
              localeKey: ''
            },
            {
              value: ' = ',
              localeKey: 'COND_SAME'
            },
            {
              value: ' != ',
              localeKey: 'COND_NOT_SAME'
            },
            {
              value: ' is null ',
              localeKey: 'COND_NULL'
            },
            {
              value: ' is not null ',
              localeKey: 'COND_NOT_NULL'
            }
          ];

      // Init filter conditions for different types
      _.each(this.get('header'), function (header) {

        // Prepare for List search
        if (_.isArray(header.list) && header.list.length) {
          header.filterCondList = listCond;
          header.filterValue = '';

          return;
        }

        // No list
        switch (header.type) {

        case 'string':
          header.filterCondList = strCond;
          break;

        case 'int':
        case 'float':
        case 'decimal':
        case 'date':
          header.filterCondList = numCond;
          break;

        default:
          // Nothing happens
        }

        header.filterValue = '';
      });
    }
  });

  // ----- FilterEasyModel end ----- //


  /**
   * FilterEasyView
   */

  FilterEasyView = Backbone.View.extend({

    template: JST.filter,

    events: {
      'click [data-action=close]': 'close',
      'click [data-action=reset]': 'reset',
      'click [data-action=apply]': 'apply',
      'change :input': 'updateFilter'
    },

    initialize: function () {
      this.model.view = this;
      this.model.set('visible', false);

      this.render();
    },

    render: function () {
      this.setElement(this.template(this.model.toJSON()));
      this.model.get('$holder').find('tr:gt(0)').remove().end()
          .append(this.$el);
      this.$el.find('.dropdown-text').text('');
      CDP.setLang(this.$el);
    },

    updateFilter: function (e) {
      var value = e.target.value.replace(/['"]/g, ''),
          type = e.target.name.charAt(6) === 'C' ? 'cond' : 'value',
          name = e.target.name.slice(7),
          filter = this.model.get('filter'),
          dataType = _.findWhere(this.model.get('header'), {
            name: name
          }).type,
          relaType;

      // If has value, save it
      if (typeof value === 'string' && value !== '') {

        // Has value: save it
        filter[name] = filter[name] || {};
        filter[name][type] = value;
        filter[name].dataType = dataType;
      } else {

        // Emptied: delete value
        if (filter[name]) {
          relaType = type === 'cond' ? 'value' : 'cond';

          // Condition and value are both empty:
          // Delete the hole key
          if (filter[name][relaType] === undefined) {
            delete filter[name];
          } else {
            delete filter[name][type];
          }
        }
      }
    },

    reset: function () {
      this.model.set('filter', {});

      this.$el.find(':input').val('');
      this.$el.find('.dropdown-text').text('');
    },

    show: function () {

      this.model.set('visible', true, {
        silent: true
      });

      this.$el.show();
    },

    close: function () {

      this.model.set({
        visible: false,
        filter: {}
      }, {
        silent: true
      });

      this.$el.hide();
    },

    // Apply the filter and send the data back
    apply: function () {
      var filter = this.model.get('filter'),
          f,
          str = '';

      // Filter condition concatenation
      for (f in filter) {

        if (filter.hasOwnProperty(f)
          && filter[f].cond
          && ((filter[f].cond === ' is null ' || filter[f].cond === ' is not null ')
            || (filter[f].cond !== ' is null ' && filter[f].cond !== ' is not null ' && filter[f].value !== undefined))) {
          str += (this.createCondition(f, filter[f]) + ' AND ');
        }
      }

      // Remove last ' AND '
      str = str.slice(0, str.length - 5);

      if (this.report && str) {

        this.report.model.set('filter', str, {
          silent: true
        });

        this.report.turnPage(this.report.model.get('dataURL'));
      }
    },

    createCondition: function (name, filter) {
      var value = filter.value;

      if (!filter.cond) {
        return '';
      }

      // null
      if (filter.cond === ' is null ') {

        if (filter.dataType === 'string') {
          return [
            '("', name, '" is null or "', name, '" = \'\')'
          ].join('');
        } else {
          return '"' + name + '" is null';
        }
      }

      // not null
      if (filter.cond === ' is not null ') {

        if (filter.dataType === 'string') {
          return [
            '("', name, '" is not null and "', name, '" != \'\')'
          ].join('');
        } else {
          return '"' + name + '" is not null';
        }
      }

      // add %...% for Like & not like
      if (filter.cond === ' like ' || filter.cond === ' not like ') {
        value = '%' + value + '%';
      }

      // Basic Value conversion
      switch (filter.dataType) {

      case 'string':
        value = '\'' + value + '\'';
        break;

      case 'date':
        value = new Date(value).setHours(0, 0, 1, 0);
        value = _.timeObjToSec(value);
        break;

      default:
      }

      return '"' + name + '"' + filter.cond + value;
    }
  });

  // ----- FilterEasyView end ----- //


  // Let's Go!

  Sort = function (settings) {

    this.model = new SortModel({
      showHeaders: settings
    });

    this.view = new SortView({
      model: this.model
    });

    this.$el = this.view.$el;
  };

  FilterEasy = function (settings) {

    this.model = new FilterEasyModel(settings);

    this.view = new FilterEasyView({
      model: this.model
    });

    this.$el = this.view.$el;
  };

  w.Sort = Sort;
  w.FilterEasy = FilterEasy;
}(window, document));
