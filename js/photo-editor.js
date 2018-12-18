'use strict';

(function () {
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
  var scaleControl = document.querySelector('.scale__control--value');
  var value = parseInt(scaleControl.value, 10);
  var buttonSmaller = document.querySelector('.scale__control--smaller');
  var buttonBigger = document.querySelector('.scale__control--bigger');

  var applyScale = function (valueScale) {
    scaleControl.value = valueScale + '%';
    var insertValue = valueScale / 100;
    window.form.previewImage.style.transform = 'scale(' + insertValue + ')';
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
  var effectsField = document.querySelector('.effects');

  var currentEffect = '';
  var sliderHandle = window.form.imageForm.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  effectsField.addEventListener('change', function (evt) {
    var classForEffect = 'effects__preview--' + evt.target.value;
    window.form.previewImage.className = '';
    window.form.previewImage.classList.add(classForEffect);
    window.form.previewImage.removeAttribute('style');
    if (classForEffect === 'effects__preview--none') {
      window.form.slider.classList.add('hidden');
    } else {
      currentEffect = evt.target.value;
      effectLevelDepth.style.width = '100%';
      sliderHandle.style.left = MAX_PIN + 'px';
      window.form.scaleControl.value = '100%';
      window.form.slider.classList.remove('hidden');
    }
  });

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

        window.form.previewImage.style.filter = getFilterEffect(currentEffect, percent);
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

  window.scaleControl = scaleControl;
})();
