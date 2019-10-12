'use strict';
(function () {

  var pictureElement = document.querySelector('.pictures');

  var templatePictures = document.querySelector('#picture').content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorTitleElement = errorTemplate.querySelector('.error__title');


  /**
    * Функция getPhotosArray отрисовывает на странице  все элементы полученные из массива
    * @param {array} photosArray переменная через которую происходит взаимодействие с каждым элементом
    * массива
    */
  window.getPhotosArray = function (photosArray) {
    for (var i = 0; i < photosArray.length; i++) {
      var newPicture = templatePictures.cloneNode(true);
      newPicture.querySelector('.picture__img').src = photosArray[i].url;
      newPicture.querySelector('.picture__likes').textContent = photosArray[i].likes;
      newPicture.querySelector('.picture__comments').textContent = photosArray[i].comments.length;

      pictureElement.appendChild(newPicture);
    }
  };
  var photos = [];
  window.updatePhotos = function () {
    window.getPhotosArray(photos);
  };
  /**
   * Функция onError обрабатывает ошибки при загрузке данных с сервера
   * @param {string} message переменная в которую записавается текст сообщения
   * о вызваной ошибке
   */
  var onErrorResponse = function (message) {
    errorTitleElement.textContent = message;
    pictureElement.appendChild(errorTemplate);
  };
  var successHandler = function (data) {
    photos = data;
    window.updatePhotos();
  };

  window.load(successHandler, onErrorResponse, window.utils.URL);
})();
