'use strict';
(function () {

  var pictureElement = document.querySelector('.pictures');

  var templatePictures = document.querySelector('#picture').content.querySelector('.picture');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorTitleElement = errorTemplate.querySelector('.error__title');

  var imgFilters = document.querySelector('.img-filters');
  window.addEventListener('load', function () {
    imgFilters.classList.remove('img-filters--inactive');
  });
  var imageFilterForm = imgFilters.querySelector('.img-filters__form');
  var filtersButton = imageFilterForm.querySelectorAll('.img-filters__button');

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

  imageFilterForm.addEventListener('click', function (evt) {
    evt.preventDefault();
    filtersButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    var target = evt.target;
    target.classList.add('img-filters__button--active');
    var id = target.id;
    switch (id) {
      case 'filter-popular':
        getDefaultPhotos();
        break;
      case 'filter-random':
        getRandomPhotos();
        break;
      case 'filter-discussed':
        getCommentPhotos();
        break;
    }
  });

  var clearPhotos = function () {
    var children = Array.from(pictureElement.children);
    children.slice(2, children.length).forEach(function (child) {
      pictureElement.removeChild(child);
    });
  };

  var getDefaultPhotos = function () {
    photos.slice();
    clearPhotos();
    window.updatePhotos();
  };

  var getRandomPhoto = function () {
    var randomIndex = window.utils.getRandomNum(0, photos.length);
    return photos[randomIndex];
  };

  var getRandomPhotos = function () {
    photos.filter(function (photo) {
      var photosList = [];
      for (var i = 0; i < 10; i++) {
        photo = getRandomPhoto();
        if (!photosList.includes(photo)) {
          photosList.push(photo);
        }
      }
    });
    clearPhotos();
    window.updatePhotos();
  };

  var getCommentPhotos = function () {
    photos.sort(function (current, next) {
      return current.commentCount - next.commentCount;
    });
    clearPhotos();
    window.updatePhotos();
  };
})();
