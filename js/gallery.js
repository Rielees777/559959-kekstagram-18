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
    * @param {HTMLElement} template объект шаблон для вставки картинки
    * @param {HTMLElement} parent объект куда вставляются картинки
    * @param {boolean} clearDOMElements параметр запускающий очистку узла
    */
  var renderPhotos = function (photosArray, template, parent, clearDOMElements) {
    if (clearDOMElements) {
      window.utils.clearNode(parent, 2);
    }

    for (var i = 0; i < photosArray.length; i++) {
      var newPicture = template.cloneNode(true);

      newPicture.querySelector('.picture__img').src = photosArray[i].url;
      newPicture.querySelector('.picture__likes').textContent = photosArray[i].likes;
      newPicture.querySelector('.picture__comments').textContent = photosArray[i].comments.length;

      parent.appendChild(newPicture);
    }
  };

  var photos = [];

  var successHandler = function (data) {
    photos = data;
    window.pictures = photos;

    renderPhotos(photos, templatePictures, pictureElement, true);
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

  window.api.load(successHandler, onErrorResponse);

  /**
   * Функция обработчик события срабатывающего на форме imageFilterForm
   * выполняет переключение активного состояние кнопок фильтров и запускает
   * функции фильтрующие данные с сервера
   * @param {object} evt объект текущего события
   */
  imageFilterForm.addEventListener('click', function (evt) {
    evt.preventDefault();

    filtersButton.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });

    var target = evt.target;
    var id = target.id;
    target.classList.add('img-filters__button--active');

    switch (id) {
      case 'filter-popular':
        getPopularPhotos();
        break;

      case 'filter-random':
        getRandomPhotos();
        break;

      case 'filter-discussed':
        getCommentPhotos();
        break;
    }
  });
  /**
   * Функция getPopularPhotos делает копию загруженного массива с фото
   * после чего рендерит их через функцию renderPhotos
   */
  var getPopularPhotos = window.utils.debounce(function () {
    var popularPhotos = photos.slice();

    renderPhotos(popularPhotos, templatePictures, pictureElement, true);
  });

  /**
   * Функция getRandomPhotos выводит 10 случайных фото из данных с сервера
   * создаем пустой массив randomPhotos, затем с помощью итератора перебираем
   * массив объектов с сервера затем берем случайный элемент и проверяем есть этот элемент в
   * массиве, а также колличество добавленых элементов, после добавляем элемент
   * в массив randomPhotos и далее рендерит его через renderPhotos
   */
  var getRandomPhotos = window.utils.debounce(function () {
    var randomPhotos = [];

    for (var j = 0; j < photos.length; j++) {
      var randomPic = window.utils.getRandomElement(photos);

      if (!randomPhotos.includes(randomPic) && randomPhotos.length < 10) {
        randomPhotos.push(randomPic);

      } else if (randomPhotos.length >= 10) {
        break;
      }
    }

    renderPhotos(randomPhotos, templatePictures, pictureElement, true);
  });

  /**
   * Функция getCommentPhotos сортирует массив данных ссервера по
   * количеству комментариев начиная с наибольшего и рендерит их
   * через функцию renderPhotos
   */
  var getCommentPhotos = window.utils.debounce(function () {
    var commentedPhotos = photos.slice();

    commentedPhotos.sort(function (current, next) {
      return next.comments.length - current.comments.length;

    });

    renderPhotos(commentedPhotos, templatePictures, pictureElement, true);
  });

})();
