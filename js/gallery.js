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
    * @param {object} template объект шаблон для вставки картинки
    * @param {object} parent объект куда вставляются картинки
    * @param {boolean} clearNode параметр запускающий очистку узла
    */
  var renderPhotos = function (photosArray, template, parent, clearNode) {
    if (clearNode) {
      var children = Array.from(pictureElement.children);
      children.slice(2, children.length).forEach(function (child) {
        pictureElement.removeChild(child);
      });
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

  var succesHandler = function (data) {
    photos = data;
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

  window.load(succesHandler, onErrorResponse, window.utils.URL);

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
    target.classList.add('img-filters__button--active');
    var id = target.id;
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
  var getPopularPhotos = function () {
    var popularPhotos = photos.slice();
    renderPhotos(popularPhotos, templatePictures, pictureElement, true);
  };

  /**
   * Функция getRandomPic назначает случайный индекс в переменную randomIndex
   * и через него возвращает случайный объект из массива данных с сервера
   * @return {object} photos[randomIndex] случайный объект из массива данных с сервера
   */
  var getRandomPic = function () {
    var randomIndex = window.utils.getRandomNum(0, photos.length - 1);
    return photos[randomIndex];
  };

  /**
   * Функция getRandomPhotos выводит 10 случайных фото из данных с сервера
   * создаем пустой массив randomPhotos, затем с помощью итератора перебираем
   * массив объектов с сервера затем берем случайный элемент и проверяем есть этот элемент в
   * массиве, а также колличество добавленых элементов, после добавляем элемент
   * в массив randomPhotos и далее рендерит его через renderPhotos
   */
  var getRandomPhotos = function () {
    var randomPhotos = [];
    photos.forEach(function (randImg) {
      randImg = getRandomPic();
      if (!randomPhotos.includes(randImg) && randomPhotos.length < 10) {
        randomPhotos.push(randImg);
      }
    });
    renderPhotos(randomPhotos, templatePictures, pictureElement, true);
  };

  /**
   * Функция getCommentPhotos сортирует массив данных ссервера по
   * количеству комментариев начиная с наибольшего и рендерит их
   * через функцию renderPhotos
   */
  var getCommentPhotos = function () {
    var commentedPhotos = photos.slice();
    commentedPhotos.sort(function (current, next) {
      return next.comments.length - current.comments.length;
    });
    renderPhotos(commentedPhotos, templatePictures, pictureElement, true);
  };
})();
