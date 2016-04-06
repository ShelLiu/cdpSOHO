/**
 * Grid System
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/18
 * ===================
 * = GridModel
 * = GridView
 */

(function (w, d) {


  /**
   * GridModel
   */

  var GridModel = Backbone.Model.extend({

    defaults: {
      holder: ''
    },

    initialize: function () {

    }
  });

  // ----- GridModel end ----- //


  /**
   * GridView
   */

  var GridView = Backbone.View.extend({

    template: JST.grid,
    events: {
//      'change :checkbox': 'selectRow',
//      'click tbody > tr': 'viewRow',
//      'click .sortable': 'sortData'
    },

    initialize: function () {
      this.model.view = this;
      this.$el = this.model.get('holder').length ? this.model.get('holder') : $('<div />').appendTo('body');
      this.listenTo(this.model, "change", this.render);
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    getData: function ($target) {
      var $rows = this.$el.find('tbody > tr'),
          $row = $target.closest('tr'),
          index = $rows.index($row);

      if (index !== -1) {
        return this.model.get('items')[index];
      } else {
        return null;
      }
    }

//    selectRow: function (e) {
//      var rowData = this.getData($(e.target));
//
//      if (rowData !== null) {
//        rowData.selected = !(rowData.selected);
//
//        // [TODO]
//        alert((rowData.selected ? '' : '取消') + '选中数据：' + rowData.empNameZH);
//      }
//    },
//
//    viewRow: function (e) {
//      var $target = $(e.target);
//
//      if ($target.closest('.check').length === 0) {
//        rowData = this.getData($target);
//
//        // [TODO]
//        alert('查看数据：' + rowData.empNameZH);
//      }
//    },
//
//    // Sort by the click item
//    // Only one sort order is allowed
//    sortData: function (e) {
//      var $th = $(e.target).closest('th'),
//          sortName = $th.data('name'),
//          sortOrder = $th.hasClass('desc') ? 'asc' : 'desc';
//
//      _.each(this.model.get('header'), function (headerItem) {
//
//        if (headerItem.name === sortName) {
//          headerItem.order = sortOrder;
//
//          this.model.set({
//            order: [{
//              sortName: sortName,
//              sortOrder: sortOrder
//            }]
//          });
//
//          console.log(this.model);
//        } else {
//          delete headerItem.order;
//        }
//      }, this);
//    }
  });

  // ----- GridView end ----- //


  /**
   * Grid
   */

  function Grid(options) {

    this.view = new GridView({
      model: new GridModel(options)
    });
  }

  // ----- Grid end ----- //

  w.Grid = Grid;
}(window, document));
