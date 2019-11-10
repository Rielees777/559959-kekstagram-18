'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var requestHandler = function (requestMethod, onSuccess, onError, URL, requestData) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        default:
          var error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
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

    xhr.open(requestMethod, URL);
    xhr.send(requestData);
  };

  /**
     * Функция load является обработчиком события загрузки данных
     * с указанного адреса
     * @param {object} onSuccess это функция обрабатывающая данные
     * полученные с сервера
     * @param {object} onError это функция срабатывающая в случае,
     * когда сервер возвращает статус ошибки
     * @param {string} URL адрес сервера, откуда беруться данные.
     */

  window.api = {
    requestHandler: requestHandler,
    LOAD_URL: LOAD_URL,
    UPLOAD_URL: UPLOAD_URL
  };
})();


