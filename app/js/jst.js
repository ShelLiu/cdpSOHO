/**
 * CDP Cloud Rebuilt
 * ===================
 * HTML Templates
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/17
 * ===================
 * - Form Elements
 * - Fieldset
 * - Form
 * - Pagination
 * - Sort
 * - Grid
 * - Report
 * - Dialog
 * - Date Picker
 * - Flow Chart
 * - Flow Chart Maker
 * - Widget
 */

window.JST = {

  // Form Elements
  formButton: _.template(
    '<button type="<%= type %>"' +
      '<% if (id !== "") { %> id="<%= id %>"<% } %>' +
      '<% if (name !== "") { %> name="<%= name %>"<% } %>' +
      '<% if (className !== "") { %> class="<%= className %>"<% } %>' +

      '<% if (action !== "") { %> data-action="<%= action %>"<% } %>' +
      '<% if (disabled) { %> disabled <% } %>' +
    '>' +
        '<% if (icon !== "") { %><span class="icon-btn icon-btn-<%= icon %>"></span> <% } %>' +
        '<span <% if (localeKey !== "") { %> data-locale="<%= localeKey %>"<% } %>><%= value %></span>' +
    '</button>'),

  formButtonGroup: _.template(
    '<div class="btn-group">' +
      '<% _.each(buttons, function (button) { %>' +
        '<%= JST.formButton(new FormElement(button).toJSON()) %>' +
      '<% }); %>' +
    '</div>'),

  formButtonBar: _.template(
    '<div class="btn-bar">' +
      '<% _.each(btnGroups, function (buttons) { %>' +
        '<%= JST.formButtonGroup(buttons) %>' +
      '<% }); %>' +
    '</div>'),

  formInputText: _.template(
    '<span <% if (validation.required) { %> class="form-required" <% } %>>' +
      '<input type="text"' +
        '<% if (id !== "") { %> id="<%= id %>" <% } %>' +
        '<% if (name !== "") { %> name="<%= name %>" <% } %>' +
        '<% if (placeholder !== "") { %> placeholder="<%= placeholder %>" <% } %>' +
  //      '<% if (localeKey !== "") { %> data-locale-value="<%= localeKey %>"<% } %>' +
        '<% if (value !== "") { %> value="<%= value %>" <% } %>' +
        '<% if (readonly) { %> readonly <% } %>' +
        '<% if (disabled) { %> disabled <% } %>' +

        '<% if (validation.required) { %> required <% } %>' +
        '<% if (validation.minlength !== undefined) { %> minlength="<%= validation.minlength %>" <% } %>' +
        '<% if (validation.maxlength !== undefined) { %> maxlength="<%= validation.maxlength %>" <% } %>' +
        '<% if (validation.min !== undefined) { %> min="<%= validation.min %>" <% } %>' +
        '<% if (validation.max !== undefined) { %> max="<%= validation.max %>" <% } %>' +
        '<% if (validation.pattern !== undefined) { %> pattern="<%= validation.pattern %>" <% } %>' +
      '>' +
    '</span>'),

  formTextarea: _.template(
    '<span <% if (validation.required) { %> class="form-required" <% } %>>' +
      '<textarea' +
        '<% if (id !== "") { %> id="<%= id %>" <% } %>' +
        '<% if (name !== "") { %> name="<%= name %>" <% } %>' +
  //      '<% if (localeKey !== "") { %> data-locale-value="<%= localeKey %>"<% } %>' +
        '<% if (placeholder !== "") { %> placeholder="<%= placeholder %>" <% } %>' +
        '<% if (readonly) { %> readonly <% } %>' +
        '<% if (disabled) { %> disabled <% } %>' +

        '<% if (validation.required) { %> required <% } %>' +
        '<% if (validation.minlength !== undefined) { %> minlength="<%= validation.minlength %>" <% } %>' +
        '<% if (validation.maxlength !== undefined) { %> maxlength="<%= validation.maxlength %>" <% } %>' +
      '>' +
        '<% if (value !== "") { %><%= value %><% } %>' +
      '</textarea>' +
    '</span>'),

  formDate: _.template(
    '<span <% if (validation.required) { %> class="form-required" <% } %>>' +
      '<input type="text" class="datepicker" readonly' +
        '<% if (id !== "") { %> id="<%= id %>" <% } %>' +
        '<% if (name !== "") { %> name="<%= name %>" <% } %>' +
        '<% if (value !== "") { %> value="<%= _.timeSecToStr(value) %>" <% } %>' +
        '<% if (placeholder !== "") { %> placeholder="<%= placeholder %>" <% } %>' +
        '<% if (disabled) { %> disabled <% } %>' +

        '<% if (validation.required) { %> required <% } %>' +
        '<% if (validation.min !== undefined) { %> min="<%= validation.min %>" <% } %>' +
        '<% if (validation.max !== undefined) { %> max="<%= validation.max %>" <% } %>' +
      '>' +
    '</span>'),

  formStartEndDate: _.template(
    '<div class="form-date form-date-start">' +
      '<span class="form-date-label" data-locale="START_DATE">Start Date</span>' +
      '<%= JST.formDate(start) %>' +
    '</div>' +
    '<div class="form-date form-date-end">' +
      '<span class="form-date-label" data-locale="END_DATE">End Date</span>' +
      '<%= JST.formDate(end) %>' +
    '</div>'),

  formTime: _.template(
    '<div class="form-date">' +
      '<%= JST.formDate(time) %>' +
      '<%= JST.formDropdown(hourList) %>' +
      '<span class="form-date-column">:</span>' +
      '<%= JST.formDropdown(minuteList) %>' +
      '<span class="form-date-timezone"><%= _.timeSecToStr(time.value, "Z") %></span>' +
    '</div>'),

  formStartEndTime: _.template(
    '<div class="form-date form-date-start">' +
      '<span class="form-date-label" data-locale="START_TIME">Start Time</span>' +
      '<%= JST.formTime({ time: start, hourList: hourList, minuteList: minuteList }) %>' +
    '</div>' +
    '<div class="form-date form-date-end">' +
      '<span class="form-date-label" data-locale="END_TIME">End Time</span>' +
      '<%= JST.formTime({ time: end, hourList: hourList, minuteList: minuteList }) %>' +
    '</div>'),

  formCheckRadio: _.template(
    '<label <% if (id !== "") { %> for="<%= id %>" <% } %> class="check <%= className %>">' +
      '<input type="<%= layout %>"' +
        '<% if (id !== "") { %> id="<%= id %>" <% } %>' +
        '<% if (name !== "") { %> name="<%= name %>" <% } %>' +
        '<% if (checked) { %> checked <% } %>' +
        '<% if (value !== "") { %> value="<%= value %>" <% } %>' +
        '<% if (disabled) { %> disabled <% } %>' +

        '<% if (validation.required) { %> required <% } %>' +
      '>' +
      '<span <% if (localeKey !== "") { %> data-locale="<%= localeKey %>"<% } %>><%= label %></span>' +
    '</label>'),

  formCheckList: _.template(
    '<span' +
      '<% if (validation.required) { %> class="form-required" data-required <% } %>' +
      '<% if (validation.min) { %> data-min=<%= validation.min %> <% } %>' +
      '<% if (validation.max) { %> data-max=<%= validation.max %> <% } %>' +
     '>' +
      '<% _.each(checks, function (check) { %>' +
        '<%= JST.formCheckRadio(new FormElement(check).toJSON()) %>' +
      '<% }); %>' +
    '</span>'),

  formDropdown: _.template(
    '<div class="dropdown <%= className %> <% if (validation.required) { %> form-required <% } %>">' +
      '<div class="dropdown-face">' +
        '<span class="dropdown-text"' +
        '<% if (_.findWhere(list, {value: value})) { %>' +
          ' data-locale="<%= _.findWhere(list, {value: value}) !== undefined && _.findWhere(list, {value: value}).localeKey %>"' +
        '<% } %>' +
        '><%= value %>' +
        '</span>' +
        '<button class="btn-icon btn-link" type="button">▼</button>' +
      '</div>' +
      '<div class="dropdown-list">' +
        '<ul>' +
          '<% _.each(list, function (item) { %>' +
            '<li><a href="javascript:void(0);" <% if (item.value) { %> data-value="<%= item.value %>" <% } %> <% if (item.localeKey) { %> data-locale="<%= item.localeKey %>" <% } %>><%= typeof item.value === \'string\' ? item.value : item %></a></li>' +
          '<% }); %>' +
        '</ul>' +
      '</div>' +
      '<input type="text"' +
        '<% if (id !== "") { %> id="<%= id %>" <% } %>' +
        '<% if (name !== "") { %> name="<%= name %>" <% } %>' +
        '<% if (value !== "") { %> value="<%= value %>" <% } %>' +
        '<% if (disabled) { %> disabled <% } %>' +

        '<% if (validation.required) { %> required <% } %>' +
      '>' +
    '</div>'),

  formGridSelect: _.template(
    '<div class="dropdown grid-select <%= className %> <% if (validation.required) { %> form-required <% } %>">' +
      '<div class="dropdown-face">' +
        '<span class="dropdown-text"></span>' +
        '<button class="btn-icon btn-link" type="button">▼</button>' +
      '</div>' +
      '<div class="dropdown-list grid-select-list"></div>' +
      '<input type="text"' +
        '<% if (id !== "") { %> id="<%= id %>" <% } %>' +
        '<% if (name !== "") { %> name="<%= name %>" <% } %>' +
        '<% if (value !== "") { %> value="<%= value %>" <% } %>' +
        '<% if (disabled) { %> disabled <% } %>' +

        '<% if (validation.required) { %> required <% } %>' +
      '>' +
    '</div>'),

  formFile: _.template(
    '<div class="form-attach <% if (fileName.length > 0) { %> after <% } %> <% if (validation.required) { %> form-required <% } %>">' +
      '<span class="icon"></span>' +
      '<div class="form-attach-before">' +
        '<a href="javascript:void(0);" class="form-attach-command" data-locale="UPLOAD_ATTACHMENT" data-action="trigger">上传附件</a>' +
      '</div>' +
      '<div class="form-attach-after">' +
        '<a href="javascript:void(0);" class="form-attach-command" data-attach-name><%= fileName %></a>' +
        '<a href="javascript:void(0);" class="icon-remove"></a>' +
      '</div>' +
      '<input type="file" style="display:block"' +
        '<% if (id !== "") { %> id="<%= id %>" <% } %>' +
        '<% if (name !== "") { %> name="<%= name %>" <% } %>' +
        '<% if (disabled) { %> disabled <% } %>' +
        '<% if (validation.required) { %> required <% } %>' +
      '<% if (accept) { %> accept="<%= accept %>" <% } %>' +
      '>' +
    '</div>'),

  // Form Control
  formControl: _.template(
    '<label class="form-label" data-locale="<%= labelLocaleKey ? labelLocaleKey : localeKey %>"></label>' +
    '<div class="form-control"></div>'),

  // Form
  form: _.template(
    '<form class="<%= className %>" action="<%= url %>">' +
      '<% if (titleLocaleKey) { %>' +
        '<h2 data-locale="<%= titleLocaleKey %>"></h2>' +
      '<% } %>' +
      '<% _.each(fields, function (field) { %>' +
        '<fieldset>' +
          '<% if (field.fieldTitleLocaleKey) { %>' +
            '<h3 data-locale="<%= field.fieldTitleLocaleKey %>"></h3>' +
          '<% } %>' +
          '<div class="form-group <%= cols === 2 ? \'form-two-col\' : \'\' %>">' +
            '<% _.each(_.range(Math.ceil(field.controls.length / cols)), function () { %>' +
              '<div class="form-item-line"></div>' +
            '<% }); %>' +
          '</div>' +
        '</fieldset>' +
      '<% }); %>' +
    '</form>'),

  formConfirm: _.template(
    '<% if (buttons.length) { %>' +
      '<div class="form-confirm">' +
        '<% _.each(buttons, function (btn) { %>' +
          '<%= JST.formButton(btn) %>' +
        '<% }); %>' +
      '</div>' +
    '<% } %>'),

  // Pagination
  pagination: _.template(
    '<% if (totalPages >= 1) { %>' +
      '<div class="pagination">' +
        '<span class="page-data"><%= firstRowIndex %>-<%= lastRowIndex %> <span data-locale="PAGER_OF"></span> <%= totalCount %></span>' +
        '<div class="page-show-items">' +
          '<%= JST.formDropdown({ value: pageSize, list: pageSizeOpts, id: "", name: "page-size", disabled: false, className: \'\', validation: {} }) %>' +
        '</div>' +
        '<ol class="page-numbers">' +
          '<li<% if (pageNum === 1) { %> class="active" <% } %>><a href="javascript:void(0);" data-go="1">1</a></li>' +
          '<% if (showPrevBtn) { %>' +
            '<li><a href="javascript:void(0);" data-turn="prev">…</a></li>' +
          '<% } %>' +
          '<% _.each(pagers, function (p) { %>' +
            '<% if (p > 1 && p < totalPages) { %>' +
              '<li<% if (pageNum === p) { %> class="active" <% } %>><a href="javascript:void(0);" data-go="<%= p %>"><%= p %></a></li>' +
            '<% } %>' +
          '<% }); %>' +
          '<% if (showNextBtn) { %>' +
            '<li><a href="javascript:void(0);" data-turn="next">…</a></li>' +
          '<% } %>' +
          '<% if (totalPages > 1) { %>' +
            '<li<% if (pageNum === totalPages) { %> class="active" <% } %>><a href="javascript:void(0);" data-go="<%= totalPages %>"><%= totalPages %></a></li>' +
          '<% } %>' +
        '</ol>' +
        '<div class="page-jumper">' +
          '<span data-locale="PAGER_NO"></span>' +
          '<input type="text" value="<%= pageNum %>" data-jump="jump">' +
          '<span data-locale="PAGER_PAGE"></span>' +
        '</div>' +
      '</div>' +
    '<% } %>'),

  // Sort
  sort: _.template(
    '<div class="sort-column-order">' +
      '<div class="sort-header">' +
        '<h4 data-locale="SORT_SHOW_TITLE">Column Visibility &amp; Order</h4>' +

        '<div class="sort-opr">' +
          '<button type="button" class="btn-icon" data-action="up"><span class="arrow-up"></span></button>' +
          '<button type="button" class="btn-icon" data-action="down"><span class="arrow-down"></span></button>' +
        '</div>' +
      '</div>' +

      '<div class="picker">' +
        '<div class="picker-list">' +
          '<ul>' +
            '<% _.each(showHeaders, function (header) { %>' +
              '<% if (header.sortable) { %>' +
                '<li <% if (header.showActive) { %> class="active" <% } %>>' +
                  '<label class="check">' +
                    '<input type="checkbox" <% if (!header.hidden) { %> checked <% } %>>' +
                    '<span <% if (header.localeKey) { %> data-locale="<%= header.localeKey %>" <% } %>><%= header.text %></span>' +
                  '</label>' +

                  '<div class="sort-item-opr">' +
                    '<button type="button" class="btn-icon sort-stick-top" data-action="stick-top"><span class="icon-btn icon-btn-top"></span></button>' +
                    '<button type="button" class="btn-icon sort-stick-top" data-action="sort-it"><span class="icon-btn icon-btn-right-arrow"></span></button>' +
                  '</div>' +
                '</li>' +
              '<% } %>' +
            '<% }); %>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div class="sort-priority">' +
      '<div class="sort-header">' +
        '<h4 data-locale="SORT_PRIORITY_TITLE">Sort Priority</h4>' +

        '<div class="sort-opr">' +
          '<button type="button" class="btn-icon" data-action="up"><span class="arrow-up"></span></button>' +
          '<button type="button" class="btn-icon" data-action="down"><span class="arrow-down"></span></button>' +
        '</div>' +
      '</div>' +

      '<div class="picker" <% if (!sortHeaders.length) { %>style="display: none"<% } %>>' +
        '<div class="picker-list">' +
          '<ul>' +
            '<% _.each(sortHeaders, function (header) { %>' +
              '<% if (header.sortable && header.order) { %>' +
              '<li <% if (header.sortActive) { %> class="active" <% } %>>' +
                '<div class="sort-name">' +
                  '<span <% if (header.localeKey) { %> data-locale="<%= header.localeKey %>" <% } %>><%= header.text %></span>' +
                  '<div class="sort-item-opr">' +
                    '<button type="button" class="btn-icon sort-stick-top" data-action="stick-top"><span class="icon-btn icon-btn-top"></span></button>' +
                    '<button type="button" class="btn-icon sort-stick-top" data-action="unsort-it"><span class="icon-btn icon-btn-stop"></span></button>' +
                  '</div>' +
                '</div>' +

                '<div class="sort-a-z">' +
                  '<label class="check check-inline" data-sort="asc"><input type="radio" <% if (header.order === "asc") { %> checked <% } %>> <span class="icon-btn icon-btn-sort"></span></label>' +
                  '<label class="check check-inline" data-sort="desc">' +
                    '<input type="radio" <% if (header.order === "desc") { %> checked <% } %>>' +
                    '<span class="icon-btn icon-btn-sort-desc"></span>' +
                  '</label>' +
                '</div>' +
              '</li>' +
              '<% } %>' +
            '<% }); %>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>'),

  // Filter
  filter: _.template(
    '<tr class="report-filter-easy">' +
      '<% if (selectable) { %>' +
        '<th class="selectable"></th>' +
      '<% } %>' +
      '<% _.each(header, function (th) { %>' +
        '<% if (!th.hidden) { %>' +
          '<th>' +
            '<% if (th.filterable) { %>' +
              '<%= JST.formDropdown(new FormElement({name: "filterC" + th.name, list: th.filterCondList}).toJSON()) %>' +
              '<% if (th.layout !== "select") { %>' +
                '<input type="text" name="<%= \'filterV\' + th.name %>" <% if (th.type === "date") { %> class="datepicker" <% } %>>' +
              '<% } else { %>' +
                '<%= JST.formDropdown(new FormElement({name: "filterV" + th.name, list: th.list}).toJSON()) %>' +
              '<% } %>' +
            '<% } %>' +
          '</th>' +
        '<% } %>' +
      '<% }); %>' +
    '</tr>' +
    '<tr class="report-filter-easy-confirm">' +
      '<td colspan="99">' +
        '<button type="button" class="btn-cute btn-secondary" data-locale="BTN_APPLY" data-action="apply">Apply</button>' +
        '<button type="button" class="btn-cute" data-locale="BTN_RESET" data-action="reset">Reset</button>' +
        '<button type="button" class="btn-cute" data-locale="BTN_CLOSE" data-action="close">Close</button>' +
      '</td>' +
    '</tr>'),

  // Grid
  gridHeader: _.template(
    '<thead>' +
      '<tr>' +
        '<% if (selectable) { %>' +
          '<th class="selectable"><label class="check"><input type="checkbox" data-select-all="#<%= reportID %>"> <span>&nbsp;</span></label></th>' +
        '<% } %>' +
        '<% _.each(header, function (th) { %>' +
          '<% if (!th.hidden) { %>' +
            '<th data-name="<%= th.name %>" <% if (th.sortable) { %> class="<%= \'sortable \' + (th.order || \'\') %>" <% } %>>' +
              '<span <% if (th.localeKey) { %> data-locale="<%= th.localeKey %>" <% } %>><%= th.text %></span>' +
            '</th>' +
          '<% } %>' +
        '<% }); %>' +
      '</tr>' +
    '</thead>'),

  grid: _.template(
    '<table class="report-data">' +
      '<%= JST.gridHeader({ selectable: selectable, reportID: reportID, header: header }) %>' +
      '<tbody>' +
        '<% _.each(items, function (row, i) { %>' +
          '<tr>' +
            '<% if (selectable) { %>' +
              '<td class="selectable"><label class="check"><input type="checkbox" data-select="#<%= reportID %>"> <span>&nbsp;</span></label></td>' +
            '<% } %>' +
            '<% _.each(header, function (th) { %>' +
              '<% if (th.hidden) { return } %>' +
              '<% if (th.list.length) { %>' +
                '<td data-locale="<%= _.findWhere(th.list, { value: row[th.name] }) !== undefined && _.findWhere(th.list, { value: row[th.name] }).localeKey %>"></td>' +
                '<% return; %>' +
              '<% } %>' +
              '<% if (th.checks) { %>' +
                '<td data-locale="<%= _.findWhere(th.checks, { value: row[th.name] }) !== undefined && _.findWhere(th.checks, { value: row[th.name] }).localeKey %>"></td>' +
                '<% return; %>' +
              '<% } %>' +
              '<% if (th.type === \'string\' || th.type === \'int\' || th.type === \'float\' || th.type === \'decimal\') { %>' +
                '<td><%= row[th.name] %></td>' +
              '<% } else if (th.type === \'date\') { %>' +
                '<td><%= (row[th.name] && _.timeSecToStr(row[th.name], th.format)) || \'\' %></td>' +
              '<% } %>' +
            '<% }); %>' +
          '</tr>' +
        '<% }); %>' +
      '</tbody>' +
    '</table>'),

  // Report
  report: _.template(
    '<div class="panel report">' +
      '<div class="report-loading"></div>' +
      '<% if (titleLocaleKey && title) { %>' +
        '<div class="header">' +
          '<h4 data-locale="<%= titleLocaleKey %>"><%= title %></h4>' +
        '</div>' +
      '<% } %>' +
      '<div class="content full">' +
        '<div class="report-header">' +
          '<div class="report-filter">' +
            '<div class="btn-bar">' +
              '<% _.each(buttons, function (btn) { %>' +
                '<%= buttonSettings[btn] && JST.formButton(buttonSettings[btn]) %>' +
              '<% }); %>' +
              '<% _.each(customButtons, function (btn) { %>' +
                '<%= JST.formButton(new FormElement(btn).toJSON()) %>' +
              '<% }); %>' +
            '</div>' +
            '<% if (searchable) { %>' +
              '<div class="form-search">' +
                '<input type="text">' +
                '<button type="button" class="btn-icon btn-link" data-action="search"><span class="icon"></span></button>' +
              '</div>' +
            '<% } %>' +
          '</div>' +
          '<div class="report-data-head-box">' +
            '<table class="report-data-head">' +
              '<%= JST.gridHeader({ selectable: selectable, reportID: reportID, header: header }) %>' +
            '</table>' +
          '</div>' +
        '</div>' +
        '<div class="table-holder"></div>' +
        '<div class="report-footer"></div>' +
      '</div>' +
    '</div>'),

  // Dialog
  dialog: _.template(
    '<% if (headingLocaleKey && closable) { %>' +
      '<div class="header">' +
        '<% if (headingLocaleKey) { %>' +
          '<h4 data-locale="<%= headingLocaleKey %>"></h4>' +
        '<% } %>' +
        '<% if (closable) { %>' +
          '<div class="opr"><button type="button" class="btn-link" data-action="close"><span class="icon-close"></span></button></div>' +
        '<% } %>' +
      '</div>' +
    '<% } %>' +
    '<div class="content"></div>' +
    '<% if (buttons.length) { %>' +
      '<div class="dialog-confirm">' +
        '<% _.each(buttons, function (btn) { %>' +
          '<%= JST.formButton(buttonSettings[btn]) %>' +
        '<% }); %>' +
      '</div>' +
    '<% } %>'),

  // Date Picker
  datePicker: _.template(
    '<div class="date-picker day hidden">' +
      '<div class="date-picker-day-list"></div>' +
      '<div class="date-picker-month-list"></div>' +
      '<div class="date-picker-year-list"></div>' +
    '</div>'),

  datePickerDayList: _.template(
    '<div class="date-picker-title">' +
      '<button type="button" class="btn-link form-date-last"><span class="arrow-left"></span></button>' +
      '<button type="button" class="btn-link form-date-year-current"><%= year %></button>' +
      '<button type="button" class="btn-link form-date-month-current" data-locale="<%= monthTitle[month] %>"></button>' +
      '<button type="button" class="btn-link form-date-next"><span class="arrow-right"></span></button>' +
    '</div>' +
    '<div class="date-picker-week-title">' +
      '<ul>' +
        '<% _.each(weekTitle, function (weekName) { %><li data-locale="<%= weekName %>"></li><% }); %>' +
      '</ul>' +
    '</div>' +
    '<div class="date-picker-dates">' +
      '<ul>' +
        '<% _.each(lastMonthDates, function () { %>' +
          '<li></li>' +
        '<% }); %>' +
        '<% _.each(thisMonthDates, function (date) { %>' +
          '<li class="<% if (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {%> current <% } %><% if (date < validation.min || date > validation.max) {%> disabled <% } %>">' +
            '<a href="javascript:void(0);"><%= date.getDate() %></a>' +
          '</li>' +
        '<% }); %>' +
      '</ul>' +
    '</div>' +
    '<div class="date-picker-clear"><button type="button" data-locale="BTN_CLEAR" class="btn-white">Clear</button></div>'),

  datePickerMonthList: _.template(
    '<div class="date-picker-title">' +
      '<button type="button" class="btn-link form-month-last"><span class="arrow-left"></span></button>' +
      '<button type="button" class="btn-link form-date-year-current"><%= year %></button>' +
      '<button type="button" class="btn-link form-month-next"><span class="arrow-right"></span></button>' +
    '</div>' +
    '<div class="date-pick-months">' +
      '<ul>' +
        '<% _.each(monthTitle, function (monthName, monthIndex) { %>' +
          '<li <% if (year === new Date().getFullYear() && monthIndex === month) {%> class="current" <% } %>>' +
            '<a href="javascript:void(0);" data-locale="<%= monthTitle[monthIndex] %>"></a>' +
          '</li>' +
        '<% }); %>' +
      '</ul>' +
    '</div>'),

  datePickerYearList: _.template(
    '<div class="date-picker-title">' +
      '<button type="button" class="btn-link form-decade-last"><span class="arrow-left"></span></button>' +
      '<button type="button" class="btn-link form-date-decade-current"><%= _.first(decade) %>–<%= _.last(decade) %></button>' +
      '<button type="button" class="btn-link form-decade-next"><span class="arrow-right"></span></button>' +
    '</div>' +
    '<div class="date-pick-years">' +
      '<ul>' +
        '<li></li>' +
        '<% _.each(decade, function (y) { %>' +
          '<li <% if (y === year) { %> class="current" <% } %> >' +
            '<a href="javascript:void(0);"><%= y %></a>' +
          '</li>' +
        '<% }); %>' +
      '</ul>' +
    '</div>'),

  // Linkage
  linkageChild: _.template(
    '<li <% if (hidden) { %> style="display:none" <% } %>>' +
      '<label class="check"><input type="checkbox" data-child value="<%= id %>" <% if (checked) { %> checked <% } %>> <span><%= text %></span></label>' +
    '</li>'),

  linkageParent: _.template(
    '<li <% if (hidden) { %> style="display:none" <% } %>>' +
      '<label class="check"><input type="radio" data-parent name="linkage-parent-item" value="<%= id %>" <% if (checked) { %> checked <% } %>> <span><%= text %></span></label>' +
    '</li>'),

  linkage: _.template(
    '<div class="panel">' +
      '<div class="header">' +
        '<h4>联动维护：<span class="linkage-name"><%= linkage.name %></span></h4>' +
      '</div>' +
      '<div class="content">' +
        '<p>请选择需要维护的项目：</p>' +
        '<div class="linkage-pick-parent gap-v-sm">' +
          '<% _.each(linkage.items, function (item) { %>' +
            '<label class="check check-inline"><input type="radio" name="linkage-items" value="<%= item.itemID %>" <% if (item.nextID === undefined) { %> disabled <% } %> <% if (item.itemID === parent.itemID) { %> checked <% } %>> <span><%= item.itemName %></span></label>' +
          '<% }); %>' +
        '</div>' +
        '<div class="linkage-edit gap-v-lg">' +
          '<div class="linkage-col">' +
            '<h4>上级：<%= parent.itemName %></h4>' +
            '<div class="picker">' +
              '<div class="picker-header">' +
                '<div class="form-search form-search-sm">' +
                  '<input type="text" data-link-type="<%= parent.itemID %>">' +
                  '<button class="btn-icon btn-link"><span class="icon"></span></button>' +
                '</div>' +
              '</div>' +
              '<div class="picker-list">' +
                '<ul class="linkage-parent-list">' +
                  '<% _.each(parent.items, function (item) { %>' +
                    '<li <% if (item.hidden) { %> style="display:none" <% } %>>' +
                      '<label class="check"><input type="radio" data-parent name="linkage-parent-item" value="<%= item.id %>" <% if (item.checked) { %> checked <% } %>> <span><%= item.text %></span></label>' +
                    '</li>' +
                  '<% }); %>' +
                '</ul>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="linkage-col">' +
            '<h4>下级：<%= child.itemName %></h4>' +
            '<div class="picker">' +
              '<div class="picker-header">' +
                '<div class="form-search form-search-sm">' +
                  '<input type="text" data-link-type="<%= child.itemID %>">' +
                  '<button class="btn-icon btn-link"><span class="icon"></span></button>' +
                '</div>' +
              '</div>' +
              '<div class="picker-list">' +
                '<ul class="linkage-child-list"></ul>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="linkage-col">' +
            '<h4>已选项</h4>' +
            '<div class="item-list">' +
              '<div class="picker-list">' +
                '<ul class="linkage-selected-list"></ul>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="linkage-confirm">' +
          '<button type="button" class="btn-secondary btn-cute" data-action="confirm">确定</button>' +
        '</div>' +
      '</div>' +
    '</div>'),

  // Flow Chart
  fchart: _.template(
    '<div class="fchart-box" ' +
      'style="width: <%= maxX + nodeWidth %>px; height: <%= maxY + nodeHeight %>px">' +
    '</div>'),

  fchartItem: _.template(
    '<div class="fchart-item" ' +
      'data-id=<%= id %> ' +
      'style="left: <%= x %>px; top: <%= y %>px">' +
      '<%= text %>' +
    '</div>'),

  fchartLineH: _.template(
    '<div class="fchart-line fchart-line-h" ' +
      'style="left: <%= left %>px; top: <%= top %>px; width: <%=  width %>px">' +
    '</div>'),

  fchartLineV: _.template(
    '<div class="fchart-line fchart-line-v" ' +
      'style="left: <%= left %>px; top: <%= top %>px; height: <%=  height %>px">' +
    '<div class="fchart-arrow-down"></div></div>'),

  fchartLineHtoV:_.template(
    '<div class="fchart-line fchart-line-hv" ' +
      'style="left: <%= left %>px; top: <%= top %>px; height: <%=  height %>px">' +
    '</div>'),

  // Flow Chart Maker
  fchartMaker: _.template(
    '<div class="fmaker-data">' +
      '<div class="fmaker-panel">' +
        '<div class="fmaker-comp">' +
          '<h5>公式内容</h5>' +
          '<textarea name="formulaDefine"><%= formulaDefine %></textarea>' +
        '</div>' +
      '</div>' +
      '<div class="fmaker-panel">' +
        '<div class="fmaker-comp">' +
          '<h5>注册变量</h5>' +
          '<div class="item-list"><ul>' +
            '<% _.each(regVar, function (reg) { %>' +
              '<li data-action="regVar"><%= reg %></li>' +
            '<% }); %>' +
          '</ul></div>' +
        '</div>' +
      '</div>' +
      '<div class="fmaker-panel">' +
        '<div class="fmaker-comp">' +
          '<h5>备注</h5>' +
          '<textarea name="remark"><%= remark %></textarea>' +
        '</div>' +
      '</div>' +
      '<div class="fmaker-panel">' +
        '<div class="fmaker-comp">' +
          '<h5>系统函数</h5>' +
            '<div class="item-list"><ul>' +
              '<% _.each(jsFunction, function (func) { %>' +
                '<li value="<%= func.val %>" data-action="func"><%= func.text %></li>' +
              '<% }); %>' +
            '</ul></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="fmaker-btns">' +
        '<div class="fmaker-panel">' +
          '<h5>基本计算</h5>' +
          '<div class="fmaker-cal">' +
            '<% _.each(calButtons, function (btn) { %>' +
              '<button type="button" class="btn-lg <%= btn.className %>" value="<%= btn.val %>"><%= btn.text %></button>' +
            '<% }); %>' +
          '</div>' +
          '<div class="fmaker-cond">' +
            '<% _.each(condButtons, function (btn) { %>' +
              '<button type="button" class="btn-lg <%= btn.className %>" value="<%= btn.val %>"><%= btn.text %></button>' +
            '<% }); %>' +
          '</div>' +
        '</div>' +
      '</div>'),

  // Widget
  widgetContent: _.template([
    '<div class="widget-content"><%= content %></div>'
  ].join('')),
    // Tree Navigation
  treeNavContain: _.template(
            '<div class="tree-side-nav"> ' +
            '</div>'),
  treeNavItem: _.template(
            '<div class="item-list">' +
                '<div class="trigger" data-leaf-id=<%= id %> ><%= text%> ' +
                '<span class="tree-right-icon"> </span>'+
                '</div>' +
            '</div>'),
  treeTemplateLeaf: _.template(
      '<li data-leaf-id=<%= id %>'+
    '><a href="javascript:void(0);" <% if (url) { %> data-load-page=' +
          '<%= url%>' +
          ' <% } %>>' +
          '<%= text%></a>' +
      '</li>')

};
