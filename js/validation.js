'use strict';

(function () {
  var HASHTAG_MAX_LENGTH = 20;

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

    window.elements.main.appendChild(successTemplate);

    evt.preventDefault();
  });

  window.elements.hashtagsInput.addEventListener('input', function () {

    var hashtags = window.elements.hashtagsInput.value.toLowerCase().split(' ');

    var resultHashtags = validateHashtags(hashtags);

    window.elements.hashtagsInput.setCustomValidity(resultHashtags);

    window.elements.hashtagsInput.style.outline = (resultHashtags !== '') ? '1px solid red' : 'none';
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

})();
