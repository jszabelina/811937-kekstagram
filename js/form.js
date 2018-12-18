'use strict';
(function () {
  var CODE_ESC = 27;
  var HASHTAG_MAX_LENGTH = 20;

  var uploadFileInput = document.querySelector('#upload-file');

  var main = document.querySelector('main');
  var imageForm = document.querySelector('.img-upload__overlay');
  var slider = document.querySelector('.img-upload__effect-level');

  uploadFileInput.addEventListener('change', function () {
    imageForm.classList.remove('hidden');
    slider.classList.add('hidden');
  });
  var closeButton = document.querySelector('#upload-cancel');


  closeButton.addEventListener('click', function () {
    closeUploadForm();
  });

  var hashtagsInput = document.querySelector('.text__hashtags');
  var focusInHashtags = false;
  var focusInDescription = false;
  var descriptionPhoto = document.querySelector('.text__description');

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
      if (!window.elements.imageForm.classList.contains('hidden')) {
        window.form.closeUploadForm();
      }
      if (!window.bigPicture.classList.contains('hidden')) {
        window.bigPicture.classList.add('hidden');
      }

      if (window.elements.main.querySelector('.success')) {
        window.form.closeSuccess();
      }
    }
  });
  var previewImage = imageForm.querySelector('.img-upload__preview img');

  var closeUploadForm = function () {
    imageForm.classList.add('hidden');
    previewImage.style.transform = 'scale(1)';
    previewImage.className = '';
    previewImage.classList.add('effects__preview--none');
    window.scaleControl.value = '100%';
    hashtagsInput.value = '';
    descriptionPhoto.value = '';
  };

  var closeSuccess = function () {
    var successWindow = main.querySelector('.success');
    if (successWindow) {
      successWindow.remove();
    }
  };

  var uploadImageForm = document.querySelector('.img-upload__form');

  uploadImageForm.addEventListener('submit', function (evt) {

    window.closeUploadForm();

    var successTemplate = document.querySelector('#success').content.cloneNode(true);
    var successButton = successTemplate.querySelector('button');

    successButton.addEventListener('click', function () {
      window.closeSuccess();
    });

    var onDocumentClick = function () {
      window.closeSuccess();
      document.removeEventListener('click', onDocumentClick);
    };

    document.addEventListener('click', onDocumentClick);

    main.appendChild(successTemplate);

    evt.preventDefault();
  });

  hashtagsInput.addEventListener('input', function () {

    var hashtags = hashtagsInput.value.toLowerCase().split(' ');

    var resultHashtags = validateHashtags(hashtags);

    hashtagsInput.setCustomValidity(resultHashtags);

    hashtagsInput.style.outline = (resultHashtags !== '') ? '1px solid red' : 'none';
  });

  /**
   * валидация хэштегов
   * @param {array} hashtags массив хэштегов
   * @return {string}
   */
  var validateHashtags = function (hashtags) {

    if (hashtags.length === 1 && hashtags[0] === '') {
      return '';
    }

    if (hashtags.length > 5) {
      return 'нельзя указать больше пяти хэш-тегов';
    }

    for (var hashtagIndex = 0; hashtagIndex < hashtags.length; hashtagIndex++) {
      var currentHashtag = hashtags[hashtagIndex];

      if (currentHashtag[0] !== '#') {
        return 'хэш-тег начинается с символа # (решётка)';
      }

      if (currentHashtag.indexOf('#', 1) > -1) {
        return 'хэштеги должны быть разделены пробелами';
      }

      if (currentHashtag === '#') {
        return 'хеш-тег не может состоять только из одной решётки';
      }

      if (hashtags.indexOf(currentHashtag, hashtagIndex + 1) > -1) {
        return 'один и тот же хэш-тег не может быть использован дважды';
      }

      if (currentHashtag.length > HASHTAG_MAX_LENGTH) {
        return 'максимальная длина одного хэш-тега 20 символов, включая решётку';
      }
    }

    return '';
  };

  window.form = {
    closeUploadForm: closeUploadForm,
    closeSuccess: closeSuccess,
    previewImage: previewImage,
    slider: slider,
    imageForm: imageForm
  };
})();

