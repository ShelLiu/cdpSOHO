/**
 * Memory Management
 * ===================
 * Author: Ash Zhang
 * Created: 2014/07/17
 * ===================
 * Based on CDP.destroyComponent method
 * - get()
 * - clear()
 * - push(itemObj, [itemName])
 * - remove(itemName)
 */


(function (w) {

  // Objects stored here will be released
  var memoryList = {};


  /**
   * Get memoryList
   */
  function get() {
    return memoryList;
  }


  /**
   * Clear All Items in the memoryList
   */
  function clear() {
    var item;

    for (item in memoryList) {

      if (memoryList.hasOwnProperty(item)) {
        remove(item);
        memoryList[item] = null;
        delete memoryList[item];
      }
    }
  }


  /**
   * Push an item to memoryList
   * @param itemObj {object}
   * @param itemName {string}
   */
  function push(itemObj, itemName) {

    // If already exists, remove the old one
    if (memoryList.hasOwnProperty(itemName)) {
      remove(itemName);
    }

    // If no itemName, make one
    itemName = itemName || 'm' + new Date().valueOf();

    memoryList[itemName] = itemObj;
  }


  /**
   * Remove an item from memory
   * @param itemName {string}
   */
  function remove(itemName) {
    CDP.destroyComponent(memoryList[itemName]);
  }


  // Let's Go!
  w.CDP = w.CDP || {};

  w.CDP.Memory = {
    get: get,
    clear: clear,
    push: push,
    remove: remove
  };

}(window));
