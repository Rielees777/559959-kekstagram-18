'use strict';
(function () {  

  var pictureElement = document.querySelector('.pictures');

  var templatePictures = document.querySelector('#picture').content.querySelector('.picture');

  var onError = function (message) {
    console.error(message);
  };
  var photos = function (photosArray) {
    for (var i = 0; i < photosArray.length; i++) {
      var newPicture = templatePictures.cloneNode(true);
      newPicture.querySelector('.picture__img').src = photosArray[i].url;
      newPicture.querySelector('.picture__likes').textContent = photosArray[i].likes;
      newPicture.querySelector('.picture__comments').textContent = photosArray[i].comments.length;

      pictureElement.appendChild(newPicture);
    }
  };

  window.load(photos, onError, window.utils.URL);
})();
