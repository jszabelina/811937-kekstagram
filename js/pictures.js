'use strict';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var pictures = [];
var randomComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var randomDescriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var PHOTO_COUNT = 25;


function getRandomComments(commentsCount) {

  var comments = randomComments[getRandomNumber(0, 5)];

  if (commentsCount === 2) {
    var secondComment = getRandomComments(1);
    while (comments === secondComment) {
      secondComment = getRandomComments(1);
    }

    comments += ' ' + secondComment;
  }

  return comments;
}

for (var i = 1; i <= PHOTO_COUNT; i++) {


  var commentsCount = getRandomNumber(1, 2);
  var comments = getRandomComments(commentsCount);


  var tempObject = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: comments,
    commentsCount: commentsCount,
    description: randomDescriptions[getRandomNumber(0, 5)]
  };

  pictures.push(tempObject);

}

function makeTemplate(link, likes, pictureComments) {
  var template = document.querySelector('#picture').content.cloneNode(true);
  template.querySelector('.picture__img').src = link;
  template.querySelector('.picture__likes').textContent = likes;
  template.querySelector('.picture__comments').textContent = pictureComments;
  return template;
}


var fragment = document.createDocumentFragment();

for (var j = 0; j < pictures.length; j++) {
  var template = makeTemplate(pictures[j].url, pictures[j].likes, pictures[j].comments);
  fragment.appendChild(template);
}

var picturesSection = document.querySelector('.pictures');
picturesSection.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var bigPicturesImg = document.querySelector('.big-picture__img img');
bigPicturesImg.src = pictures[0].url;
document.querySelector('.likes-count').textContent = pictures[0].likes;
document.querySelector('.comments-count').textContent = pictures[0].commentsCount;

function makeComment(textComment) {
  var imgTag = document.createElement('img');
  imgTag.classList.add('social__picture');
  imgTag.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  imgTag.alt = 'Аватар комментатора фотографии';
  imgTag.width = 35;
  imgTag.height = 35;

  var p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = textComment;

  var li = document.createElement('li');
  li.classList.add('social__comment');

  li.appendChild(imgTag);
  li.appendChild(p);

  return li;
}
var ulSocialComments = document.querySelector('.social__comments');
ulSocialComments.appendChild(makeComment(pictures[0].comments));

document.querySelector('.social__caption').textContent = pictures[0].description;
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

