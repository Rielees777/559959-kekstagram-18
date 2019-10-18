'use strict';
(function () {
  window.utils = {};
  window.utils.KEY_CODES = {
    'ESCAPE': 27,
    'ENTER': 13
  };
  window.utils.TIMEOUT_INTERVALS = {
    DEBOUNCE_INTERVAL: 500
  };

  window.utils.URL = 'https://js.dump.academy/kekstagram/data';
  /**
  * Функция getRandomNum округляет минимальное значение в большую сторону и максимальное  значение в меньшую сторону, возвращает случайное значение в диапазоне от минимального до максимального включительно
  * @param {number} min  минимальное значение диапазаона
  * @param {number} max  максимальное значение диапазаона
  * @return {number} randomNumber значение вычесляемое по формуле нахождения случайного  числа в заданном диапазоне
  */
  window.utils.getRandomNum = function (min, max) {
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
  window.getRandomElement = function (items) {
    var randomIndex = window.utils.getRandomNum(0, items.length - 1);
    return items[randomIndex];
  };

  window.clearChildrens = function (parent, beginElement) {
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
  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.utils.TIMEOUT_INTERVALS.DEBOUNCE_INTERVAL);
    };
  };

  /**
 * Функция выполняет закрытие формы редактирования картинки по нажатию клавиши Esc
 * @param {number} evt переменная принимает значение кнопки Esc
 * @param {object} item элемент к оторому применяется внутренняя функция
 */
  window.onPictureEscPress = function (evt, item) {

    if (evt.keyCode === window.utils.KEY_CODES.ESCAPE) {

      window.closePicture(item);
    }
  };

  /**
 * Функция открывает редактор картинки и добавляет обработчик события
 * на нажатие клавиши Esc.
 * @param {object} item - DOM элемент у которого убирается класс hidden
 */
  window.openPicture = function (item) {

    item.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {

      window.onPictureEscPress(evt, item);
    });
  };
  /**
* Фукция закрывает форму редактирования картинки и удаляет обработчик события
* нажатие на клавишу Esc.
* @param {object} item DOM элемент которому добавляется класс hidden
*/
  window.closePicture = function (item) {

    item.classList.add('hidden');

    document.removeEventListener('keydown', function (evt) {

      window.onPictureEscPress(evt, item);
    });
  };

})();
