'use strict';

(function () {
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

  for (var pictureIndex = 0; pictureIndex < window.pictures.length; pictureIndex++) {
    var template = getPictureElement(window.pictures[pictureIndex]);
    fragment.appendChild(template);
  }

  var picturesSection = document.querySelector('.pictures');
  picturesSection.appendChild(fragment);

  window.picturesSection = picturesSection;
})();
