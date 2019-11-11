'use strict';
(function () {

  /**
 * Функция выполняет закрытие формы редактирования картинки по нажатию клавиши Esc
 * @param {number} evt переменная принимает значение кнопки Esc
 */
  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.constants.keyCode.ESC) {
      closePicture();
    }
  };

  /**
 * Функция открывает редактор картинки и добавляет обработчик события
 * на нажатие клавиши Esc.
 */
  var openPicture = function () {
    window.popup.globalElement.classList.remove('hidden');

    document.addEventListener('keydown', onPictureEscPress);
  };

  /**
* Фукция закрывает форму редактирования картинки и удаляет обработчик события
* нажатие на клавишу Esc.
*/
  var closePicture = function () {
    window.popup.globalElement.classList.add('hidden');

    document.removeEventListener('keydown', onPictureEscPress);
  };

  window.popup = {
    onPictureEscPress: onPictureEscPress,
    openPicture: openPicture,
    closePicture: closePicture,
    globalElement: null
  };
})();
