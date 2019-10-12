'use strict';
var imgFilters = document.querySelector('.img-filters');
window.addEventListener('load', function () {
  imgFilters.classList.remove('img-filters--inactive');
});

var imgFilterPopular = imgFilters.querySelector('#filter-popular');
var defaultPhotoList = window.utils.photosList;

imgFilterPopular.addEventListener('click', function () {
  return defaultPhotoList;
});

var imgFilterRandom = imgFilters.querySelector('#filter-random');
imgFilterRandom.addEventListener('click', function () {
  var randomPhotoList = [];
  for (var i = 0; i < 10; i++) {
    var randomPhotoIndex = window.utils.getRandomNum(0, defaultPhotoList.length - 1);
    randomPhotoList.push(defaultPhotoList[randomPhotoIndex]);
  }
  return randomPhotoList;
});
