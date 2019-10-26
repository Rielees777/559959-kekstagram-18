'use strict';
(function () {
/**
 * Создаются функции открытия и редактирования картинок добавляемых
 * на страницу
 */
  var uploadImage = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var imageClose = imageEditForm.querySelector('.img-upload__cancel');

  var effectsList = document.querySelectorAll('.effects__radio');
  var hashTagsInput = document.querySelector('.text__hashtags');
  var commentTextInput = document.querySelector('.text__description');
  /**
 * Консианты, максимальное и иминимальное значения размера картинки
 * а также шаг изменения размера.
 */
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

  /**
 * Создание обработчика открывающего форму редактирования картинки после
 * загрузки изображения
 */
  uploadImage.addEventListener('change', function () {

    window.utils.openPicture(imageEditForm);
  });

  /**
 * Создание обработчика закрывающего форму редактирования
 */
  imageClose.addEventListener('click', function () {

    window.utils.closePicture(imageEditForm);
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
  commentTextInput.addEventListener('input', function () {
    if (commentTextInput.value.length > 140) {
      commentTextInput.setCustomValidity('Длина комментария превышает максимально допустимую в 140 символов');
    } else {
      commentTextInput.setCustomValidity('');
    }
  });
})();
