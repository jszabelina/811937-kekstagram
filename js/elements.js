'use strict';

(function () {
  var CODE_ESC = 27;
  var hashtagsInput = document.querySelector('.text__hashtags');
  var descriptionPhoto = document.querySelector('.text__description');
  var main = document.querySelector('main');
  var imageForm = document.querySelector('.img-upload__overlay');
  var previewImage = imageForm.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.img-upload__effect-level');

  window.elements = {
    hashtagsInput: hashtagsInput,
    descriptionPhoto: descriptionPhoto,
    main: main,
    CODE_ESC: CODE_ESC,
    imageForm: imageForm,
    previewImage: previewImage,
    slider: slider
  };
})();
