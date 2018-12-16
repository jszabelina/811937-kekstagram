'use strict';
(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;

  var uploadFileInput = document.querySelector('#upload-file');

  uploadFileInput.addEventListener('change', function () {
    window.elements.imageForm.classList.remove('hidden');
    window.elements.slider.classList.add('hidden');
  });
  var closeButton = document.querySelector('#upload-cancel');


  closeButton.addEventListener('click', function () {
    closeUploadForm();
  });

  var scaleControl = document.querySelector('.scale__control--value');
  var value = parseInt(scaleControl.value, 10);
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');

  var applyScale = function (valueScale) {
    scaleControl.value = valueScale + '%';
    var insertValue = valueScale / 100;
    window.elements.previewImage.style.transform = 'scale(' + insertValue + ')';
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

  var closeUploadForm = function () {
    window.elements.imageForm.classList.add('hidden');
    window.elements.previewImage.style.transform = 'scale(1)';
    window.elements.previewImage.className = '';
    window.elements.previewImage.classList.add('effects__preview--none');
    scaleControl.value = '100%';
    window.elements.hashtagsInput.value = '';
    window.elements.descriptionPhoto.value = '';
  };

  var closeSuccess = function () {
    var successWindow = window.elements.main.querySelector('.success');
    if (successWindow) {
      successWindow.remove();
    }
  };

  window.form = {
    closeUploadForm: closeUploadForm,
    closeSuccess: closeSuccess,
    scaleControl: scaleControl
  };
})();

