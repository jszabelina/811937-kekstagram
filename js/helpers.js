'use strict';

(function () {
  /**
   * Возвращает случайно число между минимальным и максимальным
   * @param {number} min минимальное число
   * @param {number} max максимальное число
   * @return {number}
   */
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * Возвращает случайный элемент массива
   * @param {Object[]} array массив
   * @return {*}
   */
  var getRandomArrayElement = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  };

  window.helpers = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement
  };
})();
