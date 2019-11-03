'use strict';
(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var requestHandler = function (request, onSuccess, onError) {
    request.responseType = 'json';

    request.addEventListener('load', function () {
      switch (request.status) {
        case 200:
          onSuccess(request.response);
          break;

        default:
          var error = 'Cтатус ответа: : ' + request.status + ' ' + request.statusText;
      }

      if (error) {
        onError(error);
      }
    });
    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    request.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });
    request.timeout = 10000;
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    requestHandler(xhr, onSuccess, onError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
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
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    requestHandler(xhr, onSuccess, onError);

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };
  window.api = {
    load: load,
    upload: upload
  };
})();


