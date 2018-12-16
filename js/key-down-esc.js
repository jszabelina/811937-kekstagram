'use strict';

(function () {
  var focusInHashtags = false;
  var focusInDescription = false;

  window.elements.hashtagsInput.addEventListener('focus', function () {
    focusInHashtags = true;
  });

  window.elements.hashtagsInput.addEventListener('blur', function () {
    focusInHashtags = false;
  });

  window.elements.descriptionPhoto.addEventListener('focus', function () {
    focusInDescription = true;
  });


  window.elements.descriptionPhoto.addEventListener('blur', function () {
    focusInDescription = false;
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.elements.CODE_ESC && !focusInHashtags && !focusInDescription) {
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
})();
