'use strict';
(function () {
  var pictureElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var closePreviewButton = bigPicture.querySelector('.big-picture__cancel');
  window.bodyElement = document.querySelector('body');

  var commentsList = document.querySelector('.social__comments');
  var templateComment = commentsList.querySelector('.social__comment');
  var commentsFilterCounter = 4;
  var commentLoader = bigPicture.querySelector('.comments-loader');

  /**
 * Функция обработчик события срабатывающее при нажатии на картинку в галерее
 * @param {HTMLElement} evt DOM элемент на котором сработало событие.
 */
  var openPicturePreviewHandler = function (evt) {
    window.utils.clearNode(commentsList, 0);
    var srcAttribute = evt.target.src;

    createCommentFilter(srcAttribute);
  };

  /**
   * Функция фильтрует комментарии к картинке превью.
   * @param {string} srcAttribute - строка с адресом расположения картики на сервере
   */
  var createCommentFilter = function (srcAttribute) {
    if (!srcAttribute) {
      return;
    }
    renderPicturePreview(srcAttribute);
    var firstCommetns = Array.from(commentsList.querySelectorAll('.social__comment'));
    commentsFilterCounter = 4;
    if (firstCommetns.length > commentsFilterCounter) {
      commentLoader.classList.remove('hidden');
      firstCommetns.forEach(hideComments);
    }
  };
  /**
   * Обработчик отрывающее превью при клике на картинку
   */
  pictureElement.addEventListener('click', openPicturePreviewHandler);
  pictureElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.keyCode.ENTER) {
      window.utils.clearNode(commentsList, 0);
      var srcAttribute = evt.target.children[0].src;

      createCommentFilter(srcAttribute);
    }
  });
  /**
   * Обработчик фильтрующий комментарии к картинке по 5.
   */
  commentLoader.addEventListener('click', function () {
    var secondComments = Array.from(commentsList.querySelectorAll('.social__comment'));
    commentsFilterCounter = commentsFilterCounter + 5;
    secondComments.forEach(showComments);

    if (commentsFilterCounter >= secondComments.length) {
      commentLoader.classList.add('hidden');
    }
  });

  /**
   * Функция скрывает комментарии в соответствии с заданным условием
   * @param {HTMLElement} item элемент которые скрывается
   * @param {number} index индекс эелемента
   */
  var hideComments = function (item, index) {
    if (index > commentsFilterCounter) {
      item.classList.add('hidden');
    }
  };

  /**
   * Функция показывает комментарии в соответствии с заданным условием
   * @param {HTMLElement} item элемент которые скрывается
   * @param {number} index индекс эелемента
   */
  var showComments = function (item, index) {
    if (index < commentsFilterCounter) {
      item.classList.remove('hidden');
    }
  };

  /**
   * Функция выполняет рендеринг картинки в попапе
   * @param {sting} pictureSrc параметр в который записывается текущий src картинки
   */
  var renderPicturePreview = function (pictureSrc) {
    for (var i = 0; i < window.pictures.length; i++) {
      var pictureUrl = pictureSrc.indexOf(window.pictures[i].url) !== -1;

      if (pictureUrl) {
        renderPreviewPictureElement(i);
      }
    }
  };

  var renderPreviewPictureElement = function (pictureCounter) {
    window.popup.globalElement = bigPicture;
    window.popup.openPicture();
    window.bodyElement.classList.add('modal-open');

    bigPicture.querySelector('.big-picture__img img').setAttribute('src', window.pictures[pictureCounter].url);
    bigPicture.querySelector('.likes-count').textContent = window.pictures[pictureCounter].likes;
    bigPicture.querySelector('.comments-count').textContent = window.pictures[pictureCounter].comments.length;
    renderComments(pictureCounter, window.pictures[pictureCounter].comments.length);

    bigPicture.querySelector('.social__caption').textContent = window.pictures[pictureCounter].description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  };
  /**
   * Функция renderComments рендерит комментарии к картинке
   * @param {HTMLElement} currentPhoto фото в которой рендерятся картинки
   * @param {number} counter счетчик комментариев.
   */
  var renderComments = function (currentPhoto, counter) {
    for (var commentCounter = 0; commentCounter < counter; commentCounter++) {
      var newComment = templateComment.cloneNode(true);

      newComment.querySelector('.social__comment img').setAttribute('src', window.pictures[currentPhoto].comments[commentCounter].avatar);
      newComment.querySelector('.social__comment img').setAttribute('alt', window.pictures[currentPhoto].comments[commentCounter].name);
      newComment.querySelector('.social__text').textContent = window.pictures[currentPhoto].comments[commentCounter].message;

      commentsList.appendChild(newComment);
    }
  };

  /**
 * Создание обработчика закрывающего форму редактирования
 */
  closePreviewButton.addEventListener('click', function () {
    window.popup.closePicture();
    window.bodyElement.classList.remove('modal-open');
  });

})();
