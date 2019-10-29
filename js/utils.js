'use strict';
(function () {
  /**
  * Функция getRandomNum округляет минимальное значение в большую сторону и максимальное  значение в меньшую сторону, возвращает случайное значение в диапазоне от минимального до максимального включительно
  * @param {number} min  минимальное значение диапазаона
  * @param {number} max  максимальное значение диапазаона
  * @return {number} randomNumber значение вычесляемое по формуле нахождения случайного  числа в заданном диапазоне
  */
  var getRandomNum = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  /**
   * Функция getRandomElement назначает случайный индекс в переменную randomIndex
   * и через него возвращает случайный объект из массива данных с сервера
   * @param {Array} items массив из которого берется случайный элемент
   * @return {object} items[randomIndex] случайный объект из массива данных с сервера
   */
  var getRandomElement = function (items) {
    var randomIndex = window.utils.getRandomNum(0, items.length - 1);
    return items[randomIndex];
  };

  var clearNode = function (parent, beginElement) {
    var children = Array.from(parent.children);

    children.slice(beginElement, children.length).forEach(function (child) {
      parent.removeChild(child);
    });
  };
  /**
   * Функция debounce выполняет устранение дребезга то есть создается пауза перед выполнением
   * переданной функции
   * @param {object} cb передаваемая функция к которой будет применена задержка
   * @return {function} возвращает функцию, которая создает задержку перед выполнением
   * переданной функции
   */
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constants.timeoutInterval.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomNum: getRandomNum,
    getRandomElement: getRandomElement,
    clearNode: clearNode,
    debounce: debounce,
  };

})();
