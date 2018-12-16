'use strict';

(function () {
  var PHOTO_COUNT = 25;

  var pictures = [];

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var names = [
    'Кекс',
    'Рудольф',
    'Битрикс',
    'Мурка',
    'Пушок',
    'Барсик'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  /**
   * функция получения случайного 1го или 2х комментариев
   * @param {number} commentsCount количество комментариев
   * @return {string}
   */
  function getRandomComments(commentsCount) {

    var comment = window.helpers.getRandomArrayElement(comments);

    if (commentsCount === 2) {
      var secondComment = window.helpers.getRandomArrayElement(comments);

      while (comment === secondComment) {
        secondComment = window.helpers.getRandomArrayElement(comments);
      }

      comment += ' ' + secondComment;
    }

    return comment;
  }

  for (var i = 0; i < PHOTO_COUNT; i++) {

    var commentsForCurrentItem = [];

    var commentsCount = window.helpers.getRandomNumber(1, 5);

    for (var j = 0; j < commentsCount; j++) {
      commentsForCurrentItem.push(
          {
            avatar: 'img/avatar-' + window.helpers.getRandomNumber(1, 6) + '.svg',
            message: getRandomComments(window.helpers.getRandomNumber(1, 2)),
            name: window.helpers.getRandomArrayElement(names)
          }
      );
    }

    var pictureNumber = i + 1;

    pictures.push({
      key: i,
      url: 'photos/' + pictureNumber + '.jpg',
      likes: window.helpers.getRandomNumber(15, 200),
      comments: commentsForCurrentItem,
      description: window.helpers.getRandomArrayElement(descriptions)
    });
  }

  window.pictures = pictures;
})();
