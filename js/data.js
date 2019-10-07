'use strict';
window.utils = {};
window.utils.KEY_CODES = {
  'ESCAPE': 27,
  'ENTER': 13
};
window.utils.URL = 'https://js.dump.academy/kekstagram/data';
/**
  * Функция getRandomNum округляет минимальное значение в большую сторону и максимальное  значение в меньшую сторону, возвращает случайное значение в диапазоне от минимального до максимального включительно
  * @param {number} min  минимальное значение диапазаона
  * @param {number} max  максимальное значение диапазаона
  * @return {number} randomNumber значение вычесляемое по формуле нахождения случайного  числа в заданном диапазоне
  */
window.utils.getRandomNum = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};
