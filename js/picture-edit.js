'use strict';
(function () {
/**
 * Создаются функции открытия и редактирования картинок добавляемых
 * на страницу
 */
  var uploadImage = document.querySelector('#upload-file');
  var imageEditForm = document.querySelector('.img-upload__overlay');
  var imageClose = imageEditForm.querySelector('.img-upload__cancel');

  var effectsChooser = document.querySelector('.img-upload__effects');
  var hashTagsInput = document.querySelector('.text__hashtags');
  var commentTextInput = document.querySelector('.text__description');
  /**
 * Консианты, максимальное и иминимальное значения размера картинки
 * а также шаг изменения размера.
 */
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

  var PIN_SCALE_MAX_VALUE = 455;
  var PIN_SCALE_MIN_VALUE = 0;
  /**
 * Создание обработчика открывающего форму редактирования картинки после
 * загрузки изображения
 */
  uploadImage.addEventListener('change', function () {
    window.popup.globalElement = imageEditForm;
    window.popup.openPicture();
  });

  /**
 * Создание обработчика закрывающего форму редактирования
 */
  imageClose.addEventListener('click', function () {
    window.popup.closePicture();
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

  /**
 * Создание функции обрабатывающей событие реагирующее на выбор effects__radio
 * назначение эффекта текущей картинке.
 */


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
  var effectsList = {
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  };
  var effectDepthLine = document.querySelector('.effect-level');
  var getEffect = function (effectStyle, effectValue) {
    picturePreview.style.filter = effectStyle + effectValue;
  };
  effectsChooser.addEventListener('input', function (chooseEvt) {
    chooseEvt.preventDefault();

    var effect = chooseEvt.target.value;
    effectDepthLine.classList.remove('hidden');

    pinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX
        };
        startCoords = {
          x: moveEvt.clientX
        };

        pinElement.style.left = (pinElement.offsetLeft - shift.x) + 'px';
        effectDepth.style.width = (pinElement.offsetLeft - shift.x) + 'px';

        if (pinElement.offsetLeft > PIN_SCALE_MAX_VALUE) {
          pinElement.style.left = PIN_SCALE_MAX_VALUE + 'px';
        } else if (pinElement.offsetLeft < PIN_SCALE_MIN_VALUE) {
          pinElement.style.left = PIN_SCALE_MIN_VALUE + 'px';
        }
        pinElement.value = Math.round(pinElement.offsetLeft / PIN_SCALE_MAX_VALUE * 100);
        switch (effect) {
          case 'chrome':
            picturePreview.style.filter = getEffect(effectsList.chrome, '(' + pinElement.value / 100 + ')');
            break;
          case 'sepia':
            picturePreview.style.filter = getEffect(effectsList.sepia, '(' + pinElement.value / 100 + ')');
            break;
          case 'marvin':
            picturePreview.style.filter = getEffect(effectsList.marvin, '(' + pinElement.value + '%)');
            break;
          case 'phobos':
            picturePreview.style.filter = getEffect(effectsList.phobos, '(' + pinElement.value / 100 * 3 + 'px)');
            break;
          case 'heat':
            picturePreview.style.filter = getEffect(effectsList.heat, '(' + pinElement.value / 100 * 2 + ')');
            break;
          default:
            picturePreview.style.filter = 'none';
            effectDepthLine.classList.add('hidden');
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  });

  var pinElement = document.querySelector('.effect-level__pin');
  var effectDepth = document.querySelector('.effect-level__depth');


})();
