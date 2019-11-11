'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  /**
   * Функция requestHandler обрабатывает запросы на сервер
   * @param {string} requestMethod параметр в котором указывается метод запроса.
   * @param {Function} onSuccess функция обрабатывает успешный ответ с сервера.
   * @param {Function} onError функция обрабатывает ошибки с сервера
   * @param {string} URL адрес на который отправляется запрос
   * @param {Function} requestData данные передаваемые на сервер (не обязательный параметр).
   */
  var requestHandler = function (requestMethod, onSuccess, onError, URL, requestData) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    /**
     * Обработчик статусов ответа с сервера
     */
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

    /**
     * Обработчик ошибок соединения с сервером
     */
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    /**
     * Обработчик долгого ответа с сервера
     */
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    xhr.open(requestMethod, URL);
    xhr.send(requestData);
  };

  window.api = {
    requestHandler: requestHandler,
    LOAD_URL: LOAD_URL,
    UPLOAD_URL: UPLOAD_URL
  };
})();


