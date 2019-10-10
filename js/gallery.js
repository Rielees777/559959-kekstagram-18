'use strict';
(function () {

  var pictureElement = document.querySelector('.pictures');

  var templatePictures = document.querySelector('#picture').content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorTitleElement = errorTemplate.querySelector('.error__title');

  /**
   * Функция onError обрабатывает ошибки при загрузке данных с сервера
   * @param {string} message переменная в которую записавается текст сообщения
   * о вызваной ошибке
   */
  var onErrorResponse = function (message) {
    errorTitleElement.textContent = message;
    pictureElement.appendChild(errorTemplate);
  };

  /**
    * Функция getPhotosArray отрисовывает на странице  все элементы полученные из массива
    * @param {array} photosArray переменная через которую происходит взаимодействие с каждым элементом
    * массива
    */
  var getPhotosArray = function (photosArray) {
    for (var i = 0; i < photosArray.length; i++) {
      var newPicture = templatePictures.cloneNode(true);
      newPicture.querySelector('.picture__img').src = photosArray[i].url;
      newPicture.querySelector('.picture__likes').textContent = photosArray[i].likes;
      newPicture.querySelector('.picture__comments').textContent = photosArray[i].comments.length;

      pictureElement.appendChild(newPicture);
    }
  };

  window.load(getPhotosArray, onErrorResponse, window.utils.URL);
})();
