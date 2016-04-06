/**
 * CDP Cloud Rebuilt
 * ===================
 * Linkage
 * ===================
 * Author: Ash Zhang
 * Created: 2014/07/10
 * ===================
 */

(function (w, d) {

  var LinkageModel,
      LinkageView,
      Linkage;

  LinkageModel = Backbone.Model.extend({

    defaults: {

      // Where to put the element
      $holder: $('body'),

      // Basic info of the linkage (no specific data)
      initDataURL: '',

      // Where to submit the data
      submitURL: '',

      // Basic info fetched from [initDataURL]
      linkage: {
        // id
        // name
        // items []
        // - itemID, itemName, url, parentID, nextID
      },

      // Data binding
      parent: {
        itemID: 0,
        itemName: '',
        url: '',
        nextID: 0,
        items: []
      },

      child: {
        itemID: 0,
        itemName: '',
        url: '',
        parentID: 0,
        items: []
      },

      // Current parent item
      // - id / nextIDList
      currentParentItem: null
    },

    initialize: function () {
      var initDataURL = this.get('initDataURL'),
          self = this;

      // fill linkage
      if (initDataURL) {

        $.get(initDataURL)
          .done(function (data) {

            self.set('linkage', data);
          });
      }
    },

    // fetch parent and child items from parentID
    fetchItemList: function (parentID) {
      var linkTypes = this.get('linkage').items,
          parent = _.findWhere(linkTypes, {
            itemID: parentID
          }),
          child = _.findWhere(linkTypes, {
            itemID: parent.nextID
          }),
          self = this;

      if (parent.items && child.items) {

        this.set({
          parent: parent,
          child: child
        });

        return;
      }

      // If item list has not been fetched, get it from url

      // Get parent data
      if (!parent.items && parent.url) {

        $.get(parent.url)
          .done(function (data) {
            parent.items = data.items;
            _.each(parent.items, function (item) {
              item.hidden = false;
            });
            self.set('parent', parent);
          });
      }

      // Get parent data
      if (!child.items && child.url) {

        $.get(child.url)
          .done(function (data) {
            child.items = data.items;
            _.each(child.items, function (item) {
              item.hidden = false;
            });
            self.set('child', child);
          });
      }
    },

    filterList: function (linkType, query) {
      var listType = this.get('parent').itemID === linkType ? 'parent' : 'child',
          list = this.get(listType).items;

      if (query.length) {

        _.each(list, function (item) {
          item.hidden = _.indexOf(item.text, query) === -1;
        });
      } else {

        _.each(list, function (item) {
          item.hidden = false;
        });
      }

      this.trigger('change:' + listType + 'List');
    },

    pickParentItem: function (parentID) {
      var currentParent = _.findWhere(this.get('parent').items, {
            id: parentID
          });

      this.set({
        currentParentItem: currentParent
      }, {
        silent: true
      });

      this.trigger('change:currentParent');
      this.trigger('change:parentList');
    },

    toggleChildItem: function (childID, checked) {
      var selected = this.get('currentParentItem').nextIDList;

      if (checked) {
        selected.push(childID);
      } else if (_.indexOf(selected, childID) !== -1) {
        selected.splice(_.indexOf(selected, childID), 1);
      }

      this.trigger('change:currentParent');
    }
  });

  LinkageView = Backbone.View.extend({

    template: JST.linkage,

    childItemTpl: JST.linkageChild,
    parentItemTpl: JST.linkageParent,

    events: {
      'click .linkage-pick-parent :radio': 'selectParent',
      'change [data-parent]': 'pickParentItem',
      'change [data-child]': 'pickChildItem',
      'click .linkage-child-list .check': 'checkChildItemPickable',
      'click .form-search button': 'filterList',
      'click [data-action=confirm]': 'submit'
    },

    initialize: function () {
      this.model.view = this;

      this.render();

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:currentParent', this.renderChildList);
      this.listenTo(this.model, 'change:childList', this.renderChildList);
      this.listenTo(this.model, 'change:parentList', this.renderParentList);
    },

    render: function () {
      this.setElement(this.template(this.model.toJSON()));
      this.model.get('$holder').empty().append(this.$el);
    },

    renderChildList: function () {
      var $childList = $('.linkage-child-list'),
          $selectedList = $('.linkage-selected-list'),
          allChildren = this.model.get('child').items,
          selectChildList = this.model.get('currentParentItem') ? this.model.get('currentParentItem').nextIDList : null;

      if (selectChildList) {
        $childList.empty();
        $selectedList.empty();

        _.each(allChildren, function (item) {
          item.checked = _.indexOf(selectChildList, item.id) !== -1;
          $childList.append(this.childItemTpl(item));
        }, this);

        _.each(allChildren, function (item) {

          if (item.checked) {
            $selectedList.append(this.childItemTpl(item));
          }
        }, this);
      }
    },

    renderParentList: function () {
      var $parentList = $('.linkage-parent-list'),
          parentList = this.model.get('parent').items;

      $parentList.empty();

      _.each(parentList, function (item) {
        item.checked = (item.id === (this.model.get('currentParentItem') && this.model.get('currentParentItem').id));
        $parentList.append(this.parentItemTpl(item));
      }, this);
    },

    selectParent: function (e) {
      this.model.fetchItemList(e.target.value);
    },

    pickParentItem: function (e) {

      if (e.target.checked) {
        this.model.pickParentItem(e.target.value);
      }
    },

    checkChildItemPickable: function (e) {

      if (!this.model.get('currentParentItem')) {
        CDP.message('请先选择上级项目。');
        return false;
      }
    },

    pickChildItem: function (e) {
      var childItemID = e.target.value,
          checked = e.target.checked;

      this.model.toggleChildItem(childItemID, checked);
    },

    filterList: function (e) {
      var input = $(e.target).closest('button').prev().get(0),
          query = $.trim(input.value),
          linkType;

      linkType = input.getAttribute('data-link-type');
      this.model.filterList(linkType, query);
    },

    submit: function () {
      var url = this.model.get('submitURL'),
          parentTypeID = this.model.get('parent').itemID,
          parentItemID = this.model.get('currentParentItem').id,
          childList = this.model.get('currentParentItem').nextIDList;

      $.post(url, {
        parentTypeID: parentTypeID,
        parentItemID: parentItemID,
        childList: childList
      })
        .done(function (res) {

          if (res.SUCCESS) {
            CDP.message('编辑成功。');
          }
        });
    }
  });

  Linkage = function (settings) {
    this.model = new LinkageModel(settings);

    this.view = new LinkageView({
      model: this.model
    });

    this.$el = this.view.$el;
  };

  w.Linkage = Linkage;
}(window, document));
