'use strict';


/**
 * Возвращает случайно число между минимальным и максимальным
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @return {number}
 */
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


/**
 * Возвращает случайный элемент массива
 * @param {Object[]} array массив
 * @return {*}
 */
function getRandomArrayElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}


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


var PHOTO_COUNT = 25;

/**
 * функция получения случайного 1го или 2х комментариев
 * @param {number} commentsCount количество комментариев
 * @return {string}
 */
function getRandomComments(commentsCount) {

  var comment = getRandomArrayElement(comments);

  if (commentsCount === 2) {
    var secondComment = getRandomArrayElement(comments);

    while (comment === secondComment) {
      secondComment = getRandomArrayElement(comments);
    }

    comment += ' ' + secondComment;
  }

  return comment;
}


for (var i = 1; i <= PHOTO_COUNT; i++) {

  var commentsForCurrentItem = [];

  var commentsCount = getRandomNumber(1, 5);

  for (var j = 0; j < commentsCount; j++) {
    commentsForCurrentItem.push(
        {
          avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
          message: getRandomComments(getRandomNumber(1, 2)),
          name: getRandomArrayElement(names)
        }
    );
  }

  pictures.push({
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: commentsForCurrentItem,
    description: getRandomArrayElement(descriptions)
  });
}

/**
 * Возвращает DOM - элемент для фотографии
 * с проставленными ссылками, количеством лайков и комментарием
 * @param {Object} picture
 * @return {Node}
 */
function getPictureElement(picture) {
  var template = document.querySelector('#picture').content.cloneNode(true);
  template.querySelector('.picture__img').src = picture.link;
  template.querySelector('.picture__likes').textContent = picture.likes;
  template.querySelector('.picture__comments').textContent = picture.comments;
  return template;
}


var fragment = document.createDocumentFragment();


for (var pictureIndex = 0; pictureIndex < pictures.length; pictureIndex++) {
  var template = getPictureElement(pictures[pictureIndex]);
  fragment.appendChild(template);
}


var picturesSection = document.querySelector('.pictures');
picturesSection.appendChild(fragment);


/**
 * Создает DOM-элемент <li> комментария и наполняет его аватаром и сообщением
 * @param {Object} commentItem
 * @return {Node}
 */
function getCommentElement(commentItem) {
  var templateLi = document.querySelector('#comment').content.cloneNode(true);

  templateLi.querySelector('.social__picture').src = commentItem.avatar;
  templateLi.querySelector('.social__text').textContent = commentItem.message;
  return templateLi;
}


/**
 * функция принимает объект фотографии и показывает её как большую
 * @param {Object} picture
 * @return {void}
 */
var showBigImage = function (picture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  // вызываю querySelector у big-picture, а не у document
  var bigPicturesImg = bigPicture.querySelector('.big-picture__img img');
  bigPicturesImg.src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  var ulSocialComments = bigPicture.querySelector('.social__comments');
  for (var currentCommentIndex = 0; currentCommentIndex < picture.comments.length; currentCommentIndex++) {
    ulSocialComments.appendChild(getCommentElement(picture.comments[currentCommentIndex]));
  }


  bigPicture.querySelector('.social__caption').textContent = picture.description;

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};


showBigImage(pictures[0]);
