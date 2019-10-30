'use strict';
(function () {
  var pictureElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var closePreviewButton = bigPicture.querySelector('.big-picture__cancel');

  var commentsList = document.querySelector('.social__comments');
  var templateComment = commentsList.querySelector('.social__comment');

  pictureElement.addEventListener('click', function (evt) {
    window.utils.clearNode(commentsList, 0);

    var srcAttribute = evt.target.src;

    if (!srcAttribute) {
      return;
    }
    renderPicturePreview(srcAttribute);
  });

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

        for (var k = 0; k < window.pictures[i].comments.length; k++) {
          var newComment = templateComment.cloneNode(true);

          newComment.querySelector('.social__comment img').setAttribute('src', window.pictures[i].comments[k].avatar);
          newComment.querySelector('.social__comment img').setAttribute('alt', window.pictures[i].comments[k].name);
          newComment.querySelector('.social__text').textContent = window.pictures[i].comments[k].message;

          commentsList.appendChild(newComment);
        }
        bigPicture.querySelector('.social__caption').textContent = window.pictures[i].description;
        bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
        bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
      }
    }
  };
  /**
 * Создание обработчика закрывающего форму редактирования
 */
  closePreviewButton.addEventListener('click', function () {
    window.popup.closePicture();
  });

})();
