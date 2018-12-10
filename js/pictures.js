'use strict';


var PHOTO_COUNT = 25;
var CODE_ESC = 27;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;
var MIN_PIN = 0;
var MAX_PIN = 455;
var Filter = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};


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


for (var i = 0; i < PHOTO_COUNT; i++) {

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

  var pictureNumber = i + 1;

  pictures.push({
    key: i,
    url: 'photos/' + pictureNumber + '.jpg',
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
  template.querySelector('.picture__img').src = picture.url;
  template.querySelector('.picture__img').dataset.key = picture.key;
  template.querySelector('.picture__likes').textContent = picture.likes;
  template.querySelector('.picture__comments').textContent = picture.comments.length;
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


var bigPicture = document.querySelector('.big-picture');


/**
 * функция принимает объект фотографии и показывает её как большую
 * @param {Object} picture
 * @return {void}
 */
var showBigImage = function (picture) {
  bigPicture.classList.remove('hidden');

  var bigPicturesImg = bigPicture.querySelector('.big-picture__img img');
  bigPicturesImg.src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  var ulSocialComments = bigPicture.querySelector('.social__comments');
  ulSocialComments.innerHTML = '';
  for (var currentCommentIndex = 0; currentCommentIndex < picture.comments.length; currentCommentIndex++) {
    ulSocialComments.appendChild(getCommentElement(picture.comments[currentCommentIndex]));
  }

  bigPicture.querySelector('.social__caption').textContent = picture.description;

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};


var uploadFileInput = document.querySelector('#upload-file');


var imageForm = document.querySelector('.img-upload__overlay');


uploadFileInput.addEventListener('change', function () {
  imageForm.classList.remove('hidden');
  slider.classList.add('hidden');
});


var closeButton = document.querySelector('#upload-cancel');


closeButton.addEventListener('click', function () {
  closeUploadForm();
});


var hashtagsInput = document.querySelector('.text__hashtags');
var descriptionPhoto = document.querySelector('.text__description');
var main = document.querySelector('main');
var focusInHashtags = false;
var focusInDescription = false;


hashtagsInput.addEventListener('focus', function () {
  focusInHashtags = true;
});


hashtagsInput.addEventListener('blur', function () {
  focusInHashtags = false;
});


descriptionPhoto.addEventListener('focus', function () {
  focusInDescription = true;
});


descriptionPhoto.addEventListener('blur', function () {
  focusInDescription = false;
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === CODE_ESC && !focusInHashtags && !focusInDescription) {
    if (!imageForm.classList.contains('hidden')) {
      closeUploadForm();
    }
    if (!bigPicture.classList.contains('hidden')) {
      bigPicture.classList.add('hidden');
    }

    if (main.querySelector('.success')) {
      closeSuccess();
    }
  }
});


var effectsField = document.querySelector('.effects');


var previewImage = imageForm.querySelector('.img-upload__preview img');


var slider = document.querySelector('.img-upload__effect-level');


var currentEffect = '';
var sliderHandle = imageForm.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');

effectsField.addEventListener('change', function (evt) {
  var classForEffect = 'effects__preview--' + evt.target.value;
  previewImage.className = '';
  previewImage.classList.add(classForEffect);
  previewImage.removeAttribute('style');
  if (classForEffect === 'effects__preview--none') {
    slider.classList.add('hidden');
  } else {
    currentEffect = evt.target.value;
    effectLevelDepth.style.width = '100%';
    sliderHandle.style.left = MAX_PIN + 'px';
    scaleControl.value = '100%';
    slider.classList.remove('hidden');
  }
});


var closeUploadForm = function () {
  imageForm.classList.add('hidden');
  previewImage.style.transform = 'scale(1)';
  previewImage.className = '';
  previewImage.classList.add('effects__preview--none');
  scaleControl.value = '100%';
};


var closeSuccess = function () {
  main.querySelector('.success').remove();
};

var picturesElements = picturesSection.querySelectorAll('.picture');


for (var picturesIndex = 0; picturesIndex < picturesElements.length; picturesIndex++) {
  picturesElements[picturesIndex].addEventListener('click', function (elem) {
    showBigImage(pictures[elem.target.dataset.key]);
  });
}


var closeBigImage = bigPicture.querySelector('#picture-cancel');


closeBigImage.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});


var scaleControl = document.querySelector('.scale__control--value');
var value = parseInt(scaleControl.value, 10);
var buttonSmaller = document.querySelector('.scale__control--smaller');
var buttonBigger = document.querySelector('.scale__control--bigger');


var applyScale = function (valueScale) {
  scaleControl.value = valueScale + '%';
  var insertValue = valueScale / 100;
  previewImage.style.transform = 'scale(' + insertValue + ')';
};


buttonSmaller.addEventListener('click', function () {
  if (value !== MIN_SCALE) {
    value -= STEP_SCALE;
    applyScale(value);
  }
});


buttonBigger.addEventListener('click', function () {
  if (value !== MAX_SCALE) {
    value += STEP_SCALE;
    applyScale(value);
  }
});


//  кнопка изменения глубины эффекта
var effectLevelValueInput = document.querySelector('.effect-level__value');


/**
 * Создаем фильтр влияющий на глубину эффекта
 * @param {string} name название эффекта
 * @param {number} percentEffect положение пина
 * @return {string}
 */
var getFilterEffect = function (name, percentEffect) {
  switch (name) {
    case Filter.CHROME:
      return 'grayscale(' + percentEffect / 100 + ')';
    case Filter.SEPIA:
      return 'sepia(' + percentEffect / 100 + ')';
    case Filter.MARVIN:
      return 'invert(' + percentEffect + '%)';
    case Filter.PHOBOS:
      var blurPx = 3 * percentEffect / 100;
      return 'blur(' + blurPx + 'px)';
    case Filter.HEAT:
      var brightnesVal = 3 * percentEffect / 100;
      if (brightnesVal < 1) {
        brightnesVal = 1;
      }
      return 'brightness(' + brightnesVal + ')';
  }
  return '';
};

sliderHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();


  var startX = evt.clientX;


  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startX - moveEvt.clientX;

    startX = moveEvt.clientX;

    var styleHandlerLeft = sliderHandle.offsetLeft - shift;


    if (styleHandlerLeft >= MIN_PIN && styleHandlerLeft <= MAX_PIN) {
      var percent = Math.round(styleHandlerLeft / MAX_PIN * 100);
      effectLevelValueInput.value = percent;
      sliderHandle.style.left = styleHandlerLeft + 'px';
      effectLevelDepth.style.width = percent + '%';

      previewImage.style.filter = getFilterEffect(currentEffect, percent);
    }
  };


  var onMouseUp = function (upEvent) {
    upEvent.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };


  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


// валидация формы отправки изображения
var uploadImageForm = document.querySelector('.img-upload__form');

uploadImageForm.addEventListener('submit', function (evt) {


  closeUploadForm();

  var successTemplate = document.querySelector('#success').content.cloneNode(true);
  var successButton = successTemplate.querySelector('button');

  successButton.addEventListener('click', function () {
    closeSuccess();
  });

  var onDocumentClick = function () {
    closeSuccess();
    document.removeEventListener('click', onDocumentClick);
  };

  document.addEventListener('click', onDocumentClick);


  main.appendChild(successTemplate);

  evt.preventDefault();
});

hashtagsInput.addEventListener('input', function () {

  var hashtags = hashtagsInput.value.split(' ');

  var resultHashtags = validateHashtags(hashtags);

  if (resultHashtags !== true) {
    hashtagsInput.setCustomValidity(resultHashtags);
    hashtagsInput.style.border = '1px solid red';

  } else {
    hashtagsInput.removeAttribute('style');
    hashtagsInput.setCustomValidity('');
  }

});

/**
 * валидация хэштегов
 * @param {array} hashtags массив хэштегов
 * @return {string}
 */
var validateHashtags = function (hashtags) {
  if (hashtags.length === 1 && hashtags[0] === '') {
    return true;
  }

  if (hashtags.length > 5) {
    return 'нельзя указать больше пяти хэш-тегов';
  }

  var hashtagsObject = {};

  for (var hashtagIndex = 0; hashtagIndex < hashtags.length; hashtagIndex++) {
    hashtags[hashtagIndex] = hashtags[hashtagIndex].toLowerCase();

    if (hashtags[hashtagIndex][0] !== '#') {
      return 'хэш-тег начинается с символа # (решётка)';
    }

    if (hashtags[hashtagIndex] === '#') {
      return 'хеш-тег не может состоять только из одной решётки';
    }

    if (hashtagsObject.hasOwnProperty(hashtags[hashtagIndex])) {
      return 'один и тот же хэш-тег не может быть использован дважды';
    }

    if (hashtags[hashtagIndex].length > 20) {
      return 'максимальная длина одного хэш-тега 20 символов, включая решётку';
    }

    hashtagsObject[hashtags[hashtagIndex]] = 1;
  }

  return true;
};

