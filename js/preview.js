'use strict';
(function () {
  var pictureElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var closePreviewButton = bigPicture.querySelector('.big-picture__cancel');

  var commentsList = document.querySelector('.social__comments');
  var templateComment = commentsList.querySelector('.social__comment');
  var commentsFilterCounter = 4;
  var commentLoader = bigPicture.querySelector('.comments-loader');

  pictureElement.addEventListener('click', function (evt) {
    window.utils.clearNode(commentsList, 0);

    var srcAttribute = evt.target.src;

    if (!srcAttribute) {
      return;
    }
    renderPicturePreview(srcAttribute);
    var firstCommetns = Array.from(commentsList.querySelectorAll('.social__comment'));
    commentsFilterCounter = 4;
    if (firstCommetns.length > commentsFilterCounter) {
      commentLoader.classList.remove('hidden');
      firstCommetns.map(hiddinComments);
    }
  });
  commentLoader.addEventListener('click', function () {
    var secondComments = Array.from(commentsList.querySelectorAll('.social__comment'));
    commentsFilterCounter = commentsFilterCounter + 5;
    secondComments.map(showComments);

    if (commentsFilterCounter >= secondComments.length) {
      commentLoader.classList.add('hidden');
    }
  });
  var hiddinComments = function (item, index) {
    if (index > commentsFilterCounter) {
      item.classList.add('hidden');
    }
  };
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
        window.popup.globalElement = bigPicture;
        window.popup.openPicture();

        bigPicture.querySelector('.big-picture__img img').setAttribute('src', window.pictures[i].url);
        bigPicture.querySelector('.likes-count').textContent = window.pictures[i].likes;
        bigPicture.querySelector('.comments-count').textContent = window.pictures[i].comments.length;
        renderCounter(i, window.pictures[i].comments.length);

        bigPicture.querySelector('.social__caption').textContent = window.pictures[i].description;
        bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      }
    }
  };

  var renderCounter = function (photoCounter, counter) {
    for (var commentCounter = 0; commentCounter < counter; commentCounter++) {
      var newComment = templateComment.cloneNode(true);

      newComment.querySelector('.social__comment img').setAttribute('src', window.pictures[photoCounter].comments[commentCounter].avatar);
      newComment.querySelector('.social__comment img').setAttribute('alt', window.pictures[photoCounter].comments[commentCounter].name);
      newComment.querySelector('.social__text').textContent = window.pictures[photoCounter].comments[commentCounter].message;

      commentsList.appendChild(newComment);
    }
  };

  /**
 * Создание обработчика закрывающего форму редактирования
 */
  closePreviewButton.addEventListener('click', function () {
    window.popup.closePicture();
  });

})();
