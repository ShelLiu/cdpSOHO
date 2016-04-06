/**
 * CDP Cloud Rebuilt
 * ====================
 * Underscore extension
 * ====================
 * Author: Ash Zhang
 * Created: 2014/06/09
 * ====================
 * - makeArray(length, defaults)
 * - moveItem(list, item, step)
 * - joinSerializedArray(arrOfObjs)
 * - addZero(number)
 * - capitalize(string)
 * - uniLength(str)
 * - parseURLParam()
 * - timeObjToSec(dateObj)
 * - timeSecToStr(dateInSec, format)
 */

var _ = _ || {};


/**
 * makeArray: Fill the array with defaults for n times
 * @param n {number}
 * @param defaults
 */
_.makeArray = function (n, defaults) {
  var arr = [],
      i;

  for (i = 0; i < n; i += 1) {
    arr[i] = defaults;
  }

  return arr;
};

/**
 * Move an item up/down inside an array
 * - step < 0: up
 * - step > 0: down
 * @param list {array}
 * @param item {object}
 * @param step {number}
 */
_.moveItem = function (list, item, step) {
  var index,
      newPos;

  if (!(_.isArray(list))) {
    return;
  }

  step = +step || 0;
  index = _.indexOf(list, item);
  newPos = Math.min(Math.max(0, index + step), list.length - 1);

  if (newPos === index) {
    return;
  }

  // Remove
  list.splice(index, 1);

  // Plunge
  list.splice(newPos, 0, item);
};


/**
 * joinSerializedArray: join an array of name/value pairs
 * e.g.
 * [{ name: 'department', value: 'PDC' },
 *  { name: 'position',   value: 'UI' }]
 * =>
 * { department: 'PDC', position: 'UI' }
 * @param arrOfObjs {array}
 * @returns {object}
 */
_.joinSerializedArray = function (arrOfObjs) {
  var joined = {};

  _.each(arrOfObjs, function (obj) {

    if (obj.name) {
      joined[obj.name] = obj.value;
    }
  });

  return joined;
};


/**
 * addZero: Add a leading "0" before numbers with only one digit
 * @param num {number}
 * @returns {string}
 */
_.addZero = function (num) {

  if (num >= 0 && num < 10) {
    return '0' + num;
  } else if (num < 0 && num > -10) {
    return '-0' + Math.abs(num);
  }

  if (isNaN(num)) {
    return '';
  }

  return '' + num;
};


/**
 * capitalize: Capitalize a string
 * @param str {string}
 */
_.capitalize = function (str) {
  var s = str.toString();

  if (!s.length) {
    return '';
  }

  return s[0].toUpperCase() + s.slice(1);
};


/**
 * Check the length of a string according to unicode char length
 * - 1 English char: length 1
 * - 1 Chinese char: length 2
 * @param str {string}
 * @returns {number}
 */
_.uniLength = function (str) {
  var uniMatch;

  if (typeof str !== 'string') {
    return 0;
  }

  uniMatch = str.match(/[^ -~]/g);

  return str.length + ((uniMatch === null) ? 0 : uniMatch.length);
};


/**
 * Parse the search conditions in url into JSON format
 * @returns {object}
 */
_.parseURLParam = function () {
  var searchPos = _.indexOf(location.href, '?'),
      search = (searchPos !== -1)
        ? location.href.slice(searchPos + 1)
        : '',
      searchArr = search.split('&'),
      resultJSON = {};

  if (search === '') {
    return;
  }

  _.each(searchArr, function (cond) {
    var c = cond.split('=');

    resultJSON[c[0]] = c[1];
  });

  return resultJSON;
};


/**
 * Convert a date of database format (in seconds)
 * @param dateObj {any}
 * @returns {number}
 */
_.timeObjToSec = function (dateObj) {
  var dateM = moment(dateObj);

  if (!dateM.isValid()) {
    dateM = moment();
  }

  return dateM.unix();
};


/**
 * Convert a timestamp in seconds to a string
 * @param dateInSec {number}
 * @param format {string}
 * @returns {*}
 */
_.timeSecToStr = function (dateInSec, format) {
  var dateM = moment.unix(dateInSec);

  format = format || CDP_CONFIG.lang[CDP_CONFIG.langType].dateYMD;

  return dateM.format(format);
};
