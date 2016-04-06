/**
 * Flow Chart
 * ===================
 * Author: Ash Zhang
 * Created: 2014/07/30
 * ===================
 */


(function (w, d) {

  var FChartModel,
      FChartView,
      FChart;


  /**
   * FChartModel
   */

  FChartModel = Backbone.Model.extend({

    defaults: {

      // Unordered
      nodeList: [],

      // Organized
      tree: {},

      // Drawing
      nodeWidth: 120,
      nodeHeight: 108,
      gapH: 60,
      gapV: 20,
      maxX: 0,
      maxY: 0
    },

    initialize: function () {
      var $holder = $('#' + this.get('holder'));

      if ($holder.length) {

        this.set('$holder', $holder, {
          silent: true
        });
      } else {

        this.set('$holder', $('body'), {
          silent: true
        });
      }

      this.genTree(this.get('nodeList'));

      // Initial offset is (0, 0)
      this.calPos(this.get('tree').root, 0, 0);
    },

    // Generate tree structure from unordered nodeList
    genTree: function (nodeList) {
      var tree = {},
          sortedList = _.sortBy(nodeList, 'name');

      tree.root = this.getRoot(sortedList);
      tree.curNode = tree.root;

      _.each(sortedList.slice(1), function (node) {
        this.addNode(tree, node);
      }, this);

      this.set('tree', tree);
    },

    // Get Root name from the first element
    // Root name has 2 chars
    // Each element should start with the same prefix
    getRoot: function (nodeList) {
      var rootName = '';

      if (_.isArray(nodeList) && nodeList[0] && nodeList[0].name) {
        rootName = nodeList[0].name.slice(0, 2);

        if (rootName.length === 2) {

          return _.findWhere(nodeList, {
            name: rootName
          });
        }
      }

      CDP.message(CDP.parseLocaleKey('OBJECT_PK_NOT_FOUND'));
    },

    // Add a node to the tree
    addNode: function (tree, node) {
      var curName = tree.curNode.name;

      // Not Sub-node, find the parent first
      if (node.name.slice(0, node.name.length - 2) !== curName) {
        tree.curNode = this.findNode(tree.root, node.name.slice(0, node.name.length - 2));
      }

      // Add Sub-node
      if (tree.curNode) {
        tree.curNode.children = tree.curNode.children || [];
        tree.curNode.children.push(node);
      }
    },

    // Traverse the tree to find the node
    findNode: function (parentNode, nodeName) {
      var i, cur;

      if (parentNode.name === nodeName) {
        return parentNode;
      }

      if (_.isArray(parentNode.children)) {

        for (i = 0; i < parentNode.children.length; i += 1) {
          cur = this.findNode(parentNode.children[i], nodeName);

          if (cur) {
            return cur;
          }
        }
      }
    },

    // Position the nodes
    calPos: function (node, left, top) {
      var height = this.get('nodeHeight'),
          width = getItemWidth(node),
          gapH = this.get('gapH'),
          gapV = this.get('gapV'),
          x,
          y,
          offsetH;

      if (_.isArray(node.children) && node.children.length) {

        // Has children: calculate total children offset
        x = left;
        y = top + height + gapV;

        _.each(node.children, function (child) {
          offsetH = this.calPos(child, x, y);
          x += (offsetH + gapH);
        }, this);

        node.x = (left + x - gapH - width) / 2;
        node.y = top*0.7;

        this.set({
          maxX: Math.max(this.get('maxX'), node.x),
          maxY: Math.max(this.get('maxY'), node.y)
        }, {
          silent: true
        });

        return Math.max(width, x - gapH - left);
      } else {

        // No children: start from left
        node.x = left;
        node.y = top*0.7;

        this.set({
          maxX: Math.max(this.get('maxX'), node.x),
          maxY: Math.max(this.get('maxY'), node.y)
        }, {
          silent: true
        });

        return width;
      }
    }
  });

  // ----- FChartModel end ----- //


  /**
   * FChartView
   */

  FChartView = Backbone.View.extend({

    template: JST.fchart,
    itemTemplate: JST.fchartItem,
    lineHTemplate: JST.fchartLineH,
    lineVTemplate: JST.fchartLineV,
    lineHtoVTemplate: JST.fchartLineHtoV,

    events: {
      'click .fchart-item': 'itemClick'
    },

    initialize: function () {
      this.model.view = this;
      this.render();
    },

    // Events
    // onclick(id)
    itemClick: function (e) {
      var onclick = this.model.get('onclick');

      if (typeof onclick === 'function') {
        onclick.call(this.model, e.target.getAttribute('data-id'));
      }
    },

    render: function () {
      this.$el = $(this.template(this.model.toJSON()));
      this.drawTree(this.model.get('tree').root);
      this.$el.appendTo(this.model.get('$holder'));
    },

    // Draw the tree inside an element
    drawTree: function (node) {
      this.$el.append(this.itemTemplate(node));

      if (_.isArray(node.children) && node.children.length) {
        this.drawLine(this.$el, node);
      }

      _.each(node.children, function (child) {
        this.drawTree(child);
      }, this);
    },

    // draw linking lines between nodes
    drawLine: function ($el, node) {
            var width = getItemWidth(node),
                height = this.model.get('nodeHeight');

      // Nodes with two or more children
      if (node.children.length > 1) {

        // Horizontal Line
        $(this.lineHTemplate({
          left: node.children[0].x + node.children[0].width / 2,
          top: node.y + height / 2,
          width: (node.children[node.children.length - 1].x + node.children[node.children.length - 1].width / 2)
              - (node.children[0].x + node.children[0].width / 2)
        })).appendTo($el);
      }

       //Vertical lines to Horizontal
        if (node.children.length > 0) {
                // Horizontal Line
                $(this.lineHtoVTemplate({
                    left: node.x + width/2 ,
                    top: node.y + height / 4,
                    height: height/4
                })).appendTo($el);
        }

      // All vertical lines to children
      _.each(node.children, function (child) {
        // One child
        $(this.lineVTemplate({
          left: child.x + child.width / 2,
          height: height*0.3,
          top: node.y + height / 2
        })).appendTo($el);
      }, this);
    }
  });

  // ----- FChartView end ----- //


  /**
   * FChart
   */

  FChart = function (settings) {
    this.model = new FChartModel(settings);

    this.view = new FChartView({
      model: this.model
    });

    this.$el = this.view.$el;
  };

    var getItemWidth = function (node) {
        var $node = $('<div class="fchart-item"></div>'),
            width;


        $node.text(node.text).css({
            left: -0,
            top: -0
        }).appendTo($('body'));

        width = $node.outerWidth();
        node.width = width;
        $node.remove();
        return width;
    }

  // ----- FChart end ----- //

  // Let's Go!
  w.FChart = FChart;

}(window, document));
