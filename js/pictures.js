'use strict';


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
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


function getRandomComments(commentsCount) {

  var comment = comments[getRandomNumber(0, 5)];

  if (commentsCount === 2) {
    var secondComment = getRandomComments(1);
    while (comment === secondComment) {
      secondComment = getRandomComments(1);
    }

    comment += ' ' + secondComment;
  }

  return comment;
}


for (var i = 1; i <= PHOTO_COUNT; i++) {


  var commentsForCurrentItem = [];

  var commentsCount = getRandomNumber(0, 5);

  if (commentsCount === 0) {
    commentsCount = 1;
  }

  for (var j = 0; j < commentsCount; j++){
    commentsForCurrentItem.push(
        {
          avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
          message: getRandomComments(getRandomNumber(1, 2)),
          name: names[getRandomNumber(0, 5)]
        }
    );
  }


  pictures.push({
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: commentsForCurrentItem,
    description: descriptions[getRandomNumber(0, 5)]
  });

}


function getPictureElement(link, likes, pictureComments) {
  var template = document.querySelector('#picture').content.cloneNode(true);
  template.querySelector('.picture__img').src = link;
  template.querySelector('.picture__likes').textContent = likes;
  template.querySelector('.picture__comments').textContent = pictureComments;
  return template;
}


var fragment = document.createDocumentFragment();


for (var j = 0; j < pictures.length; j++) {
  var template = getPictureElement(pictures[j].url, pictures[j].likes, pictures[j].comments);
  fragment.appendChild(template);
}


var picturesSection = document.querySelector('.pictures');
picturesSection.appendChild(fragment);


function getCommentElement(commentItem) {
  var templateLi = document.querySelector('#comment').content.cloneNode(true);

  templateLi.querySelector('.social__picture').src = commentItem.avatar;
  templateLi.querySelector('.social__text').textContent = commentItem.message;
  return templateLi;
}


var showBigImage = function (picture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  var bigPicturesImg = document.querySelector('.big-picture__img img');
  bigPicturesImg.src = picture.url;
  document.querySelector('.likes-count').textContent = picture.likes;
  document.querySelector('.comments-count').textContent = picture.comments.length;

  var ulSocialComments = document.querySelector('.social__comments');
  for (var currentCommentIndex = 0; currentCommentIndex < picture.comments.length; currentCommentIndex++){
    ulSocialComments.appendChild(getCommentElement(picture.comments[currentCommentIndex]));
  }


  document.querySelector('.social__caption').textContent = picture.description;

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};


showBigImage(pictures[0]);
