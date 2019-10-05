'use strict';
(function () {
  var COMMENTS_LIST = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var AUTHOR_NAMES = ['Игорь', 'РыжийКот', 'ДохлыйЕнот', 'ХитрыйСтраус', 'СизыйЛев'];

  var pictureElement = document.querySelector('.pictures');

  var templatePictures = document.querySelector('#picture').content.querySelector('.picture');

  /**
  * Функция photosArray создает список из 25 объектов содержащих фото, описание, количество лайков и комментарии.
  * В функции создается пустой массив для для объектов, далее идет цикл в котором объявляется переменная и в нее записывается объект.
  * После этого в созданный объект последовательно добавляются свойства url картинки, ее описание, количество лайков и комментарии.
  * Комментарии генерируются случайним образом через функцию getRandomNuber.
  Таким образом мы управляем количством комментариев, используемой аватаркой автора, именем автора и собственно текстом комментария
  * @return {array} photoList массив из фотографий с определнными параметрами
  */
  var getPhotosList = function () {
    var photosList = [];
    for (var i = 1; i < 26; i++) {
      var photo = {};
      photo.url = 'photos/' + i + '.jpg';
      photo.description = 'Картинка №' + i;
      photo.likes = getRandomNum(15, 200);
      photo.comments = [];

      for (var j = 0; j < getRandomNum(0, 4); j++) {
        photo.comments.push(
            {
              avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
              message: COMMENTS_LIST[getRandomNum(0, COMMENTS_LIST.length - 1)],
              name: AUTHOR_NAMES[getRandomNum(0, AUTHOR_NAMES.length - 1)]
            }
        );
      }
      photosList.push(photo);
    }
    return photosList;
  };

  var photosArray = getPhotosList();

  for (var i = 0; i < photosArray.length; i++) {
    var newPicture = templatePictures.cloneNode(true);
    newPicture.querySelector('.picture__img').src = photosArray[i].url;
    newPicture.querySelector('.picture__likes').textContent = photosArray[i].likes;
    newPicture.querySelector('.picture__comments').textContent = photosArray[i].comments.length;

    pictureElement.appendChild(newPicture);
  }
})();
