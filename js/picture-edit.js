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

  var scaleButtonBigger = document.querySelector('.scale__control--bigger');
  var scaleButtonSmaller = document.querySelector('.scale__control--smaller');
  var scalePictureValue = document.querySelector('.scale__control--value');
  var picturePreview = document.querySelector('.img-upload__preview img');
  var percentSign = '%';

  var uploadForm = document.querySelector('.img-upload__form');
  var successTemaplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorTitleElement = errorTemplate.querySelector('.error__title');
  /**
 * Консианты, максимальное и иминимальное значения размера картинки
 * а также шаг изменения размера.
 */
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

  var PIN_SCALE_MAX_VALUE = 455;
  var PIN_SCALE_MIN_VALUE = 0;
  var PIN_DEFAULT_POSITION = 91;
  var PIN_DEFAULT_VALUE = 20;

  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.constants.keyCode.ESC) {
      closeSuccessMessage();
    }
  };
  var closeSuccessMessage = function () {
    document.querySelector('main').removeChild(successTemaplate);
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
  };

  var showSuccesMessage = function () {
    document.querySelector('main').appendChild(successTemaplate);
    window.popup.closePicture();
  };
  var showErrorMessage = function (message) {
    window.popup.closePicture();
    errorTitleElement.textContent = message;
    document.querySelector('main').appendChild(errorTemplate);
  };
  /**
 * Создание обработчика открывающего форму редактирования картинки после
 * загрузки изображения
 */
  uploadImage.addEventListener('change', function (evt) {
    evt.preventDefault();
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      picturePreview.src = reader.result;
    });

    reader.readAsDataURL(evt.target.files[0]);
    window.popup.globalElement = imageEditForm;
    window.popup.openPicture();
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.api.requestHandler('POST', showSuccesMessage, showErrorMessage, window.api.UPLOAD_URL, new FormData(uploadForm));

    document.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  });

  /**
 * Создание обработчика закрывающего форму редактирования
 */
  imageClose.addEventListener('click', function () {
    window.popup.closePicture();
  });

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

  var pinElement = document.querySelector('.effect-level__pin');
  var effectDepthLine = document.querySelector('.effect-level__depth');
  var effectDepth = document.querySelector('.effect-level');
  var effectDepthValue = effectDepth.querySelector('.effect-level__value');

  var getEffect = function (effectStyle, effectValue) {
    picturePreview.style.filter = effectStyle + effectValue;
  };

  var effect = null;
  effectsChooser.addEventListener('input', function (chooseEvt) {
    chooseEvt.preventDefault();

    effect = chooseEvt.target.value;
    pinElement.style.left = PIN_DEFAULT_POSITION + 'px';
    effectDepthLine.style.width = PIN_DEFAULT_POSITION + 'px';
    pinElement.value = PIN_DEFAULT_VALUE;
    picturePreview.style.filter = 'none';

    if (effect === 'none') {
      picturePreview.style.filter = 'none';
      effectDepth.classList.add('hidden');
      return;
    }

    effectDepth.classList.remove('hidden');
  });

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
      effectDepthLine.style.width = (pinElement.offsetLeft - shift.x) + 'px';

      if (pinElement.offsetLeft > PIN_SCALE_MAX_VALUE) {
        pinElement.style.left = PIN_SCALE_MAX_VALUE + 'px';
      } else if (pinElement.offsetLeft < PIN_SCALE_MIN_VALUE) {
        pinElement.style.left = PIN_SCALE_MIN_VALUE + 'px';
      }

      effectDepthValue.value = Math.round(pinElement.offsetLeft / PIN_SCALE_MAX_VALUE * 100);
      switch (effect) {
        case 'chrome':
          getEffect(effectsList.chrome, '(' + effectDepthValue.value / 100 + ')');
          break;
        case 'sepia':
          getEffect(effectsList.sepia, '(' + effectDepthValue.value / 100 + ')');
          break;
        case 'marvin':
          getEffect(effectsList.marvin, '(' + effectDepthValue.value + '%)');
          break;
        case 'phobos':
          getEffect(effectsList.phobos, '(' + effectDepthValue.value / 100 * 3 + 'px)');
          break;
        case 'heat':
          getEffect(effectsList.heat, '(' + effectDepthValue.value / 100 * 2 + ')');
          break;
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
})();
