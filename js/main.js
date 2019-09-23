COMMENTS_LIST = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomNum = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getMokContent = function() {
  var mokContent = [];
  for (var i = 1; i < 26; i++) {
    var mokElement = {};
    mokElement.url = 'photos/' + i + '.jpg';
    mokElement.description = 'Картинка №' + i;
    mokElement.likes = getRandomNum(15, 200);
    mokElement.comments = {
      avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
      message: COMMENTS_LIST[getRandomNum(0, COMMENTS_LIST.length-1)],
      name: 'Игорь'
    }
    mokContent.push(mokElement);
  }
  return mokContent
}

getMokContent();
