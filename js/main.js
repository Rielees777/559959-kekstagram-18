'use strict';

var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AUTHOR_NAMES = ['Игорь', 'РыжийКот', 'ДохлыйЕнот', 'ХитрыйСтраус', 'СизыйЛев'];

var pictureElement = document.querySelector('.pictures');

var templatePictures = document.querySelector('#picture').content.querySelector('.picture');

/**
  * Функция getRandomNum округляет минимальное значение в большую сторону и максимальное  значение в меньшую сторону, возвращает случайное значение в диапазоне от минимального до максимального включительно
  * @param {number} min  минимальное значение диапазаона
  * @param {number} max  максимальное значение диапазаона
  * @return {number} randomNumber значение вычесляемое по формуле нахождения случайного  числа в заданном диапазоне
  */
var getRandomNum = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

/**
  * Функция photosArray создает список из 25 объектов содержащих фото, описание, количество лайков и комментарии.
  * В функции создается пустой массив для для объектов, далее идет цикл в котором объявляется переменная и в нее записывается объект. После этого в созданный объект последовательно добавляются свойства url картинки, ее описание, количество лайков и комментарии. Комментарии генерируются случайним образом через функцию getRandomNuber.
  Таким образом мы управляем количством комментариев, используемой аватаркой автора, именем автора и собственно текстом комментария
  * @return {array} photoList массив из фотографий с определнными параметрами
  */
var getPhotosList = function () {
  var photosList = [];
  for (var i = 1; i < 26; i++) {
    var photo = {};
    photo.url = 'photos/' + i + '.jpg';
    photo.description = 'Картинка №' + i;
    photo.likes = getRandomNum(15, 200);
    photo.comments = [];

    for (var j = 0; j < getRandomNum(0, 4); j++) {
      photo.comments.push(
          {
            avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
            message: COMMENTS_LIST[getRandomNum(0, COMMENTS_LIST.length - 1)],
            name: AUTHOR_NAMES[getRandomNum(0, AUTHOR_NAMES.length - 1)]
          }
      );
    }
    photosList.push(photo);
  }
  return photosList;
};

var photosArray = getPhotosList();

for (var i = 0; i < photosArray.length; i++) {
  var newPicture = templatePictures.cloneNode(true);
  newPicture.querySelector('.picture__img').src = photosArray[i].url;
  newPicture.querySelector('.picture__likes').textContent = photosArray[i].likes;
  newPicture.querySelector('.picture__comments').textContent = photosArray[i].comments.length;

  pictureElement.appendChild(newPicture);
}

var ESC_BUTTON_CODE = 27;
var uploadImage = document.querySelector('#upload-file');
var imageEditForm = document.querySelector('.img-upload__overlay');
var imageClose = imageEditForm.querySelector('.img-upload__cancel');

uploadImage.addEventListener('change', function () {
  imageEditForm.classList.remove('hidden');
});
imageClose.addEventListener('click', function () {
  imageEditForm.classList.add('hidden');
});
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_BUTTON_CODE) {
    imageEditForm.classList.add('hidden');
  }
});

var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var SCALE_STEP = 25;

var scaleButtonBigger = document.querySelector('.scale__control--bigger');
var scaleButtonSmaller = document.querySelector('.scale__control--smaller');
var scalePictureValue = document.querySelector('.scale__control--value');
var picturePreview = document.querySelector('.img-upload__preview');

scaleButtonBigger.addEventListener('click', function () {
  var defaultScaleValue = scalePictureValue.value;
  var defaultPictureSize = parseFloat(defaultScaleValue) / MAX_SCALE_VALUE;
  if (parseFloat(scalePictureValue.value) < MAX_SCALE_VALUE) {
    scalePictureValue.value = parseFloat(defaultScaleValue) + SCALE_STEP + '%';
    picturePreview.style.transform = 'scale(' + parseFloat(defaultPictureSize + SCALE_STEP / MAX_SCALE_VALUE) + ')';
  }
});
scaleButtonSmaller.addEventListener('click', function () {
  var defaultScaleValue = scalePictureValue.value;
  var defaultPictureSize = parseFloat(defaultScaleValue) / MAX_SCALE_VALUE;
  if (parseFloat(scalePictureValue.value) > MIN_SCALE_VALUE) {
    scalePictureValue.value = parseFloat(defaultScaleValue) - SCALE_STEP + '%';
    picturePreview.style.transform = 'scale(' + parseFloat(defaultPictureSize - SCALE_STEP / MAX_SCALE_VALUE) + ')';
  }
});
var effectsList = document.querySelectorAll('.effects__radio');
var effectsArray = ['None', 'grayscale(0.9)', 'sepia(0.9)', 'invert(100%)', 'blur(3px)', 'brightness(2)'];

for (var j = 0; j < effectsList.length; j++) {
  (function () {
    var k = j;
    effectsList[k].addEventListener('click', function () {
      picturePreview.style.filter = effectsArray[k];
    });
  }());
}
var hashTagsInput = document.querySelector('.text__hashtags');

hashTagsInput.addEventListener('input', function () {
  var hashTagsArray = hashTagsInput.value.split(' ');
  if (hashTagsArray.length > 5) {
    hashTagsInput.setCustomValidity('Количество хэштегов не должно превышать 5');
  } else {
    hashTagsInput.setCustomValidity('');
  }
  for (var i = 0; i < hashTagsArray.length; i++) {
    if (hashTagsArray[i][0] !== '#') {
      hashTagsInput.setCustomValidity('хэштег должен начинаться с символа #');
    }
  }
});
