'use strict';
(function () {
  /**
     * Функция load является обработчиком события загрузки данных
     * с указанного адреса
     * @param {object} onSuccess это функция обрабатывающая данные
     * полученные с сервера
     * @param {object} onError это функция срабатывающая в случае,
     * когда сервер возвращает статус ошибки
     * @param {string} URL адрес сервера, откуда беруться данные.
     */
  window.load = function (onSuccess, onError, URL) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', URL);

    xhr.send();
  };
})();


