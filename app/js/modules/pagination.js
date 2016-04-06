/**
 * Pagination
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/18
 * ===================
 * = PaginationModel
 * = PaginationView
 */

(function (w, d) {


  /**
   * PaginationModel
   */

  var PaginationModel = Backbone.Model.extend({

    defaults: {
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [10, 20, 30],

      // 1 . 2 3 4 5 6 . 99 -> 2-6 -> 5 pagers
      showPager: 5,

      totalCount: 0,
      totalPages: 0,

      // Parent $element
      holder: ''
    },

    initialize: function () {
      this.update();
      this.on('change:pageNum change:pageSize', this.update);
    },

    checkPageNumValidation: function () {

      this.set({
        'pageNum': Math.max(1, Math.min(this.get('pageNum'), this.getTotalPage()))
      });
    },

    update: function () {
      this.checkPageNumValidation();

      var totalPages = this.getTotalPage(),
          showPrevBtn = this.showPrevBtn(),
          showNextBtn = this.showNextBtn(totalPages),
          pagers = this.getPagers(totalPages, showPrevBtn, showNextBtn),
          firstRowIndex = this.getFirstRowIndex(),
          lastRowIndex = this.getLastRowIndex();

      this.set({
        totalPages: totalPages,
        showPrevBtn: showPrevBtn,
        showNextBtn: showNextBtn,
        pagers: pagers,
        firstRowIndex: firstRowIndex,
        lastRowIndex: lastRowIndex
      });
    },

    getTotalPage: function () {
      return Math.ceil(this.get('totalCount') / this.get('pageSize'));
    },

    showPrevBtn: function () {
      return this.get('showPager') < this.get('pageNum')
    },

    showNextBtn: function (totalPages) {
      return this.get('pageNum') <= (totalPages - this.get('showPager'))
    },

    getPagers: function (totalPages, showPrevBtn, showNextBtn) {

      if (showPrevBtn && showNextBtn) {
        return _.range(this.get('pageNum') - Math.floor(this.get('showPager') / 2), this.get('pageNum') + Math.ceil(this.get('showPager') / 2));
      } else if (showPrevBtn) {
        return _.range(totalPages - this.get('showPager') + 1, totalPages);
      } else if (showNextBtn) {
        return _.range(2, this.get('showPager') + 1);
      } else if (totalPages > 2) {
        return _.range(2, totalPages);
      }

      return [];
    },

    getFirstRowIndex: function () {

      if (this.get('totalCount')) {
        return this.get('pageSize') * (this.get('pageNum') - 1) + 1;
      } else {
        return 0;
      }
    },

    getLastRowIndex: function () {
      return Math.min(this.get('totalCount'), this.get('pageSize') * this.get('pageNum'));
    },

    // Data changing

    goToPage: function (page) {
      this.set('pageNum', page);
      this.trigger('turn');
    },

    turnPrev: function () {
      var current = this.get('pageNum'),
          pager = this.get('showPager'),
          total = this.get('totalPages'),
          next;

      if ((current >=  total - pager) && (current <= total - pager / 2)) {
        next = total - pager;
      } else {
        next = Math.max(1, current - pager)
      }

      this.goToPage(next);
    },

    turnNext: function () {
      var current = this.get('pageNum'),
          pager = this.get('showPager'),
          next;

      if ((current <= pager) && (current > Math.ceil(pager / 2))) {
        next = pager + 1;
      } else {
        next = Math.min(this.get('totalPages'), current + pager)
      }

      this.goToPage(next);
    },

    setPageSize: function (size) {

      if (_.indexOf(this.get('pageSizeOpts'), size) !== -1) {
        this.set({
          'pageSize': size,
          'pageNum': Math.ceil(this.getFirstRowIndex() / size)
        });
      } else {
        this.set({
          'pageSize': this.get('pageSizeOpts')[0],
          'pageNum': Math.ceil(this.getFirstRowIndex() / this.get('pageSizeOpts')[0])
        });
      }

      this.trigger('turn');
    }
  });

  // ----- PaginationModel end ----- //


  /**
   * PaginationView
   */

  var PaginationView = Backbone.View.extend({

    template: JST.pagination,

    events: {
      'click [data-go]': 'goToPage',
      'keydown [data-jump]': 'jumpToPage',

      // next or prev x pages
      'click [data-turn]': 'turnPage',

      // change page size
      'change [name=page-size]': 'changePageSize'
    },

    initialize: function () {
      this.$el = this.model.get('holder');
      this.listenTo(this.model, "change", this.render);
      this.render();

      this.$el.on('click', 'a', function () {
        return false;
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      CDP.setLang(this.$el);
      return this;
    },

    goToPage: function (e) {
      var targetPage = +$(e.target).data('go');

      this.model.goToPage(targetPage);
    },

    jumpToPage: function (e) {
      var targetPage = +e.target.value;

      if (e.which === 13 && _.isFinite(targetPage)) {
        this.model.goToPage(targetPage);
      }
    },

    turnPage: function (e) {
      var dest = $(e.target).data('turn');

      if (dest === 'prev') {
        this.model.turnPrev();
      } else if (dest === 'next') {
        this.model.turnNext();
      }
    },

    changePageSize: function (e) {
      var pageSize = +e.target.value;

      this.model.setPageSize(pageSize);
    }
  });

  // ----- PaginationView end ----- //


  /**
   * Pagination
   */

  function Pagination(options) {
    this.model = new PaginationModel(options);

    this.view = new PaginationView({
      model: this.model
    });

    this.$el = this.view.$el;
  }

  // ----- Pagination end ----- //

  w.Pagination = Pagination;
}(window, document));
