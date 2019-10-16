'use strict';
(function () {
/**
 * Создаются функции открытия и редактирования картинок добавляемых
 * 4на страницу
 */
  var uploadImage = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var imageClose = imageEditForm.querySelector('.img-upload__cancel');

  /**
 * Консианты, максимальное и иминимальное значения размера картинки
 * а также шаг изменения размера.
 */
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

  /**
 * Функция выполняет закрытие формы редактирования картинки по нажатию клавиши Esc
 * @param {number} evt переменная принимает значение кнопки Esc
 */
  window.onPictureEscPress = function (evt) {

    evt.preventDefault();

    if (evt.keyCode === window.utils.KEY_CODES.ESCAPE) {

      window.closePicture(imageEditForm);
    }
  };
  /**
 * Создание обработчика открывающего форму редактирования картинки после
 * загрузки изображения
 */
  uploadImage.addEventListener('change', function () {

    window.openPicture(imageEditForm);
  });

  /**
 * Создание обработчика закрывающего форму редактирования
 */
  imageClose.addEventListener('click', function () {

    window.closePicture(imageEditForm);
  });

  var scaleButtonBigger = document.querySelector('.scale__control--bigger');
  var scaleButtonSmaller = document.querySelector('.scale__control--smaller');
  var scalePictureValue = document.querySelector('.scale__control--value');
  var picturePreview = document.querySelector('.img-upload__preview');
  var percentSign = '%';

  /**
 * Создание обработчика увеличивающео значение размера в %,
 * а также увеличивающего размер изображения с шагом 25%
 */
  scaleButtonBigger.addEventListener('click', function () {
    var defaultScaleValue = scalePictureValue.value;
    var defaultPictureSize = parseFloat(defaultScaleValue) / MAX_SCALE_VALUE;
    if (parseFloat(scalePictureValue.value) < MAX_SCALE_VALUE) {
      scalePictureValue.value = parseFloat(defaultScaleValue) + SCALE_STEP + percentSign;
      picturePreview.style.transform = 'scale(' + parseFloat(defaultPictureSize + SCALE_STEP / MAX_SCALE_VALUE) + ')';
    }
  });

  /**
 * Создание обработчика уменьшающего значение размера в %,
 * а также уменьшающего размер изображения с шагом 25%
 */
  scaleButtonSmaller.addEventListener('click', function () {
    var defaultScaleValue = scalePictureValue.value;
    var defaultPictureSize = parseFloat(defaultScaleValue) / MAX_SCALE_VALUE;
    if (parseFloat(scalePictureValue.value) > MIN_SCALE_VALUE) {
      scalePictureValue.value = parseFloat(defaultScaleValue) - SCALE_STEP + percentSign;
      picturePreview.style.transform = 'scale(' + parseFloat(defaultPictureSize - SCALE_STEP / MAX_SCALE_VALUE) + ')';
    }
  });

  var effectsList = document.querySelectorAll('.effects__radio');
  var effectsArray = ['None', 'grayscale(0.9)', 'sepia(0.9)', 'invert(100%)', 'blur(3px)', 'brightness(2)'];

  /**
 * Создание функции обрабатывающей событие реагирующее на выбор effects__radio
 * назначение эффекта текущей картинке.
 */
  for (var j = 0; j < effectsList.length; j++) {
    (function () {
      var k = j;
      effectsList[k].addEventListener('click', function () {
        picturePreview.style.filter = effectsArray[k];
      });
    }());
  }

  var hashTagsInput = document.querySelector('.text__hashtags');

  /**
 * Создание обработчика реагирующего на неправильное заполнение
 * поля с хэштегами
 */
  hashTagsInput.addEventListener('input', function () {
    var hashTagsArray = hashTagsInput.value.split(' ');
    if (hashTagsArray.length > 5) {
      hashTagsInput.setCustomValidity('Количество хэштегов не должно превышать 5');
    } else {
      hashTagsInput.setCustomValidity('');
    }
    for (var i = 0; i < hashTagsArray.length; i++) {
      if (hashTagsArray[i][0] !== '#') {
        hashTagsInput.setCustomValidity('Хэштег должен начинаться с символа #');
      }
    }
  });
})();
