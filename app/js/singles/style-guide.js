/**
 * CDP Cloud Rebuilt
 * ===================
 * Style Framework
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/05
 * ===================
 */

$(function () {

  function loadPage() {
    var $sgPage = $('#sg-page'),
        hash = location.hash;

    if (hash !== '') {
      $sgPage.load('views' + hash.slice(1));
    }

    CDP.Memory.clear();
    $('.dialog, .message').remove();
  }

  loadPage();

  // Load page
  $('[data-load-page]').click(function () {
    location.hash = $(this).data('loadPage');

    var $trigger = $(this),
        $li = $trigger.parent();

    $li.addClass('active').siblings().removeClass('active');
  });

  $(window).on('hashchange', function () {
    loadPage();
  });

  // Panel Events
  $('.trigger').click(function () {
    var $trigger = $(this),
        $ul = $trigger.next(),
        $other = $trigger.parent().siblings();

    if ($ul.is(':hidden')) {
      $ul.slideDown(200);
      $trigger.addClass('active');
      $other.find('ul').slideUp(200).end()
        .find('trigger').removeClass('active');
      $other.removeClass('active');
    } else {
      $ul.slideUp(200);
      $trigger.removeClass('active');
    }
  });
});
