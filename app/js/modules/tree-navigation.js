/**
 * Report
 * ===================
 * Author: Lance Zhao
 * Created: 2014/07/25
 * ===================
 * = treeNavModel
 * = treeNavView
 * = treeNav
 */
(function (w, d) {

    var treeNavModel,
        treeNavView,
        treeNav;

    /**
     * treeNavModel
     */

    treeNavModel = Backbone.Model.extend({

        // Unordered
        nodeList: [],

        // Organized
        tree: {},

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
            this.set('tree', this.get('nodeList'));
        }

    });

    // ----- treeNavModel end ----- //


    /**
     * treeNavView
     */

    treeNavView = Backbone.View.extend({
        template: JST.treeNavContain,
        itemTemplate: JST.treeNavItem,
        itemTemplateLeaf: JST.treeTemplateLeaf,

        events: {
            'click .trigger': 'itemClick',
            'click .triggerLeaf': 'itemClick'
        },

        initialize: function () {
            this.model.view = this;
            this.render();
        },
        // Events
        // onclick(id)
        itemClick: function (e) {
            var $trigger = $(e.currentTarget),
                $ul = $trigger.next(),
                $other = $trigger.parent().siblings();

            if ($ul.is(':hidden')) {
                $ul.slideDown(200);
                $trigger.addClass('active');
                $trigger.addClass('triggered');
                $other.find('ul').slideUp(200).end()
                    .find('trigger').removeClass('active');
                $other.removeClass('active');
            } else {
                $ul.slideUp(200);
                $trigger.removeClass('active');
                $trigger.removeClass('triggered');
            }
        },


        render: function () {
            this.$el = $(this.template(this.model.toJSON()));
            this.$el.appendTo(this.model.get('$holder'));
            this.drawTree(this.model.get('tree'),this.itemTemplate);
            $("<div class='tree-main'></div>").appendTo(this.model.get('$holder'));
        },

        // Draw the tree inside an element
        drawTree: function (node,temp) {
            _.each(node, function (node) {
                this.$el.append(temp(node));
                if (node.children) {
                    $(this.$el.children()).last().append('<ul></ul>');
                    this.drawTreeLeaf(node.children, this.itemTemplateLeaf);
                }
            }, this)
        },
         // Draw the tree leaf inside an element
      drawTreeLeaf: function (node,temp) {
            _.each(node, function (node) {
                if(node.parentID&&node.parentID.length>0){
                    $('[data-leaf-id='+ node.parentID +']>ul').append(temp(node));
                }else{
                    $(this.$el.children()).last().find('ul').append(temp(node));
                }
                if(node.children){
                    $('[data-leaf-id]').last().append('<ul></ul>');
                    $('[data-leaf-id]').last().children().addClass('triggerLeaf');
                    _.each(node.children, function(childData){
                        childData.parentID = node.id;
                    });
                    this.drawTreeLeaf(node.children,this.itemTemplateLeaf);
                }
            },this);
        }

    });

    // ----- treeNavView end ----- //

    /**
     * treeNav
     */

    treeNav = function (data) {
        this.model = new treeNavModel(data);

        this.view = new treeNavView({
            model: this.model
        });

        this.$el = this.view.$el;
    };

    // ----- treeNav end ----- //

    // Let's Go!
    w.treeNav = treeNav;

}(window, document));
