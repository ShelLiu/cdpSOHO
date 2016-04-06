/**
 * CDP Cloud Rebuilt
 * ===================
 * Global Tools
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/09
 * ===================
 * - Language events
 * - Ajax Error events
 * - Form element events
 * - Select All events
 * - Dialog events
 */

$(function () {
  var w = window,
      d = document;

  /**
   * Language events
   * - Refresh language on each ajax change
   */

  function _bindLanguageEvents () {

    $(d).ajaxSuccess(function (e) {
      CDP.setLang();
    });
  }

  // ----- Language events end ----- //


  /**
   * Ajax Error events
   * - Show error message when ajax fails
   */

  function _bindAjaxErrorEvents() {

    $(d).ajaxError(function () {
      CDP.message(CDP.parseLocaleKey('MSG_SERVER_ERROR'));
    });
  }

  // ----- Ajax Error events events end ----- //


  /**
   * Form element events
   */

  function _bindFormEvents () {

    // Button Overflow
    $(d).on('click', '.btn-trigger', function () {
      $(this).closest('.btn-overflow').toggleClass('opened');
    }).on('click', function (e) {

      if (!$(e.target).hasClass('btn-trigger')) {
        $('.btn-overflow').removeClass('opened');
      }
    });

    // Dropdown List
    $(d).on('click', '.dropdown-face', function () {
      var $dropdown = $(this).closest('.dropdown');

      if ($dropdown.hasClass('opened')) {
        $dropdown.removeClass('opened');
      } else {

        // Close others and open this one
        $('.dropdown').removeClass('opened');
        $dropdown.addClass('opened');
      }
    }).on('click', function (e) {
      var $target = $(e.target);

      if (!$target.hasClass('dropdown-face') && $target.parents('.dropdown-face').length === 0 && $target.parents('.grid-select').length === 0) {
        $('.dropdown').removeClass('opened');
      }
    });

    $(d).on('click', '.dropdown-list a', function () {
      var text = $(this).text(),
          value = $(this).data('value'),
          $dropdown = $(this).closest('.dropdown');

      $dropdown.find('input').val(value || text).trigger('change');
      $dropdown.find('.dropdown-text').text(text);
    });
  }

  function _bindSearch() {

    $(d).on('keyup', '.form-search input', function (e) {

      if (e.which === 13) {
        $(this).siblings('button').trigger('click');
      }
    });
  }

  // ----- Form element events end ----- //


  /**
   * Select All events
   * - $all:    data-select-all="#report-1"
   * - $select: data-select="#report-1"
   */

  function _bindSelectAll() {

    $(d).on('change', '[data-select-all]', function () {
      var $all = $(this),
          parentSelector = $all.data('selectAll'),
          $parent = $(parentSelector),
          $checkboxes = $parent.find('[data-select=' + parentSelector + ']'),
          $otherAll = $parent.find('[data-select-all=' + parentSelector + ']');

      $checkboxes.prop('checked', this.checked).trigger('change');
      $otherAll.prop('checked', this.checked);
    });

    $(d).on('change', '[data-select]', function () {
      var $check = $(this),
          parentSelector = $check.data('select'),
          $parent = $(parentSelector),
          $checkboxes = $parent.find('[data-select=' + parentSelector + ']'),
          $all = $parent.find('[data-select-all=' + parentSelector + ']');

      $all.prop('checked', _.every($checkboxes.get(), function (item) {
        return item.checked;
      }));
    });
  }

  // ----- Select All events end ----- //


  /**
   * Dialog events
   */

  function _bindDialogEvents() {

    $(d).on('click', '[data-action=close]', function () {
      CDP.closeDialog($(this).closest('.dialog'));
    });
  }

  // ----- Dialog events end ----- //


  // Let's go!
  (function bindEvents() {
    _bindLanguageEvents();
    _bindAjaxErrorEvents();
    _bindFormEvents();
    _bindSearch();
    _bindSelectAll();
    _bindDialogEvents();
  }());
});
