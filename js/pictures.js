function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

var pictures = [];
var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptionArray = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

for (var i = 1; i <= 25; i++) {

  var comments = [];

  var commentsCount = getRandomNumber(1, 2);
  if (commentsCount === 1) {
    var comment = commentsArray[getRandomNumber(0, 5)];
    comments.push(comment);
  } else {
    var comment1 = commentsArray[getRandomNumber(0, 2)];
    var comment2 = commentsArray[getRandomNumber(3, 5)];
    comments.push(comment1, comment2)
  }

  var tempObject = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: comments,
    description: descriptionArray[getRandomNumber(0, 5)]
  }

  pictures.push(tempObject);

}


function makeTemplate(link, likes, comments){

  span1 = document.createElement('span')
  span1.classList.add('picture__likes')
  span1.textContent = likes;

  span2 = document.createElement('span');
  span2.classList.add('picture__comments');
  span2.textContent = comments.length;

  p = document.createElement('p')
  p.classList.add('picture__info')

  p.appendChild(span1);
  p.appendChild(span2);

  imgTag = document.createElement('img');
  imgTag.classList.add('picture__img');
  imgTag.src = link;
  imgTag.alt = 'случайная фотография';
  imgTag.width = 182;
  imgTag.height = 182;

  var a = document.createElement('a');
  a.classList.add('picture');
  a.href = '#';

  a.appendChild(imgTag);
  a.appendChild(p);

  return a;
}


var fragment = document.createDocumentFragment()

for (var i = 0; i < pictures.length; i++){
  var template = makeTemplate(pictures[i].url, pictures[i].likes, pictures[i].comments);
  fragment.appendChild(template);
}

var picturesSection = document.querySelector('.pictures');
picturesSection.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
console.log(bigPicture);

var bigPicturesImg = document.querySelector('.big-picture__img img')
bigPicturesImg.src = pictures[0].url;
document.querySelector('.likes-count').textContent = pictures[0].likes;
document.querySelector('.comments-count').textContent = pictures[0].comments.length;

function makeComment(textComment) {
  imgTag = document.createElement('img');
  imgTag.classList.add('social__picture');
  imgTag.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  imgTag.alt = 'Аватар комментатора фотографии';
  imgTag.width = 35;
  imgTag.height = 35;

  p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = textComment

  li = document.createElement('li');
  li.classList.add('social__comment');

  li.appendChild(imgTag);
  li.appendChild(p);

  return li;
}
var ulSocialComments = document.querySelector('.social__comments');
for (var i = 0; i < pictures[0].comments.length; i++ ) {
  ulSocialComments.appendChild(makeComment(pictures[0].comments[i]));
}
document.querySelector('.social__caption').textContent = pictures[0].description;
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

