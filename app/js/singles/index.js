/**
 * CDP Cloud Rebuilt
 * ===================
 * Index
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/05
 * ===================
 */

$.when(
  $.getJSON('db/page-widget.json'),
  $.getJSON('db/monthly-headcount.json')
).then(function (widget, chartHeadcount) {

    // Load Widgets
    new WidgetListView({
      collection: new WidgetList(widget[0])
    });

    // Chart: Monthly Headcount
    $(window).on('change:monthlyHeadcount', function () {
//      $('#w-chart-monthly-headcount').empty().highcharts(chartHeadcount[0]);
    });
  });
