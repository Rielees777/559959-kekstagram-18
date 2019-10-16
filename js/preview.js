'use strict';
(function () {

  var bigPicture = document.querySelector('.big-picture');

  var closePreviewButton = bigPicture.querySelector('.big-picture__cancel');

  var commentsList = document.querySelector('.social__comments');

  var templateComment = commentsList.querySelector('.social__comment');

  document.addEventListener('click', function (evt) {

    window.clearChildrens(commentsList, 0);

    var target = evt.target.src;

    for (var i = 0; i < window.pictures.length; i++) {
      if (target === undefined) {
        continue;
      } else if (target.indexOf(window.pictures[i].url) !== -1) {

        window.openPicture(bigPicture);

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
  });

  /**
 * Функция выполняет закрытие формы редактирования картинки по нажатию клавиши Esc
 * @param {number} evt переменная принимает значение кнопки Esc
 */

  window.onPictureEscPress = function (evt) {

    evt.preventDefault();

    if (evt.keyCode === window.utils.KEY_CODES.ESCAPE) {

      window.closePicture(bigPicture);
    }
  };

  /**
 * Создание обработчика закрывающего форму редактирования
 */
  closePreviewButton.addEventListener('click', function () {

    window.closePicture(bigPicture);
  });
})();
