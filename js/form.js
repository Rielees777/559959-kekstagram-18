'use strict';

var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function () {
  console.log(xhr.status);

  console.log(JSON.parse(xhr.responseText));
});

xhr.open('GET', 'https://js.dump.academy/kekstagram/data');

xhr.send();

console.log(xhr.status);
