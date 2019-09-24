var COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var AUTHOR_NAMES = ['Игорь', 'РыжийКот', 'ДохлыйЕнот', 'ХитрыйСтраус', 'СизыйЛев']

/* Создание функции getRandomNum которая возвращает случайное значение в диапазоне от min до max */
var getRandomNum = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Функция getMokContent создает мок контент из 25 объектов*/
var getMokContent = function() {
  var mokContent = [];
  for (var i = 1; i < 26; i++) {
    var mokElement = {};
    mokElement.url = 'photos/' + i + '.jpg';
    mokElement.description = 'Картинка №' + i;
    mokElement.likes = getRandomNum(15, 200);
    mokElement.comments = [];
    for (var j = 0; j < getRandomNum(0, 4); j++) {
      mokElement.comments.push(
      {
      avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
      message: COMMENTS_LIST[getRandomNum(0, COMMENTS_LIST.length-1)],
      name: AUTHOR_NAMES[getRandomNum(0, AUTHOR_NAMES.length - 1)]
      }
      )
    }

mokContent.push(mokElement);
}
return mokContent
}

var mokArray = getMokContent();
var pictureElement = document.querySelector('.pictures')
var templatePictures = document.querySelector('#picture').content.querySelector('.picture');

for (var i = 0; i < 25; i++) {
  var newElement = templatePictures.cloneNode(true)
  newElement.children[0].src = mokArray[i].url
  newElement.children[1].children[1].textContent = mokArray[i].likes
  newElement.children[1].children[0].textContent = mokArray[i].comments.length
  pictureElement.appendChild(newElement)
}
