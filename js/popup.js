'use strict';
(function () {

  /**
 * Функция выполняет закрытие формы редактирования картинки по нажатию клавиши Esc
 * @param {number} evt переменная принимает значение кнопки Esc
 * @param {object} item элемент к оторому применяется внутренняя функция
 */
  var onPictureEscPress = function (evt, item) {
    if (evt.keyCode === window.constants.keyCode.ESC) {
      closePicture(item);
    }
  };

  /**
 * Функция открывает редактор картинки и добавляет обработчик события
 * на нажатие клавиши Esc.
 * @param {object} item - DOM элемент у которого убирается класс hidden
 */
  var openPicture = function (item) {
    item.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      onPictureEscPress(evt, item);
    });
  };
  /**
* Фукция закрывает форму редактирования картинки и удаляет обработчик события
* нажатие на клавишу Esc.
* @param {object} item DOM элемент которому добавляется класс hidden
*/
  var closePicture = function (item) {
    item.classList.add('hidden');

    document.removeEventListener('keydown', onPictureEscPress);
  };
  window.popup = {
    onPictureEscPress: onPictureEscPress,
    openPicture: openPicture,
    closePicture: closePicture
  };
})();
